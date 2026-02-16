// prisma/seed.ts

import { Prisma, PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { newsItems } from '../src/data/news';
import { jobOffers } from '../src/data/jobOffers';
import { testimonials } from '../src/data/testimonials';
import { fromZonedTime } from 'date-fns-tz';

import type { NewsItem } from '../src/types/news';
import type { JobOffer } from '../src/types/job';
import type { Testimonial } from '../src/types/testimonial';

const prisma = new PrismaClient();
const TZ = 'Europe/Paris';

// helpers
function pad2(n: number) {
  return String(n).padStart(2, '0');
}

// retourne "YYYY-MM-DD" basé sur le jour Paris (pas celui de la machine)
function parisDateKey(d: Date) {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d);

  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function stripId<T extends { id?: unknown }>(item: T): Omit<T, 'id'> {
  const { id, ...rest } = item as any;
  return rest as Omit<T, 'id'>;
}
function toDate<T extends { publishedAt?: string }>(item: T) {
  return {
    ...item,
    publishedAt: item.publishedAt ? new Date(item.publishedAt) : new Date(),
  };
}

export async function main() {
  // Admins

  const admins = [
    { email: 'admin1@example.com', name: 'Admin One', password: 'ChangeMe123!' },
    { email: 'admin2@example.com', name: 'Admin Two', password: 'ChangeMe123!' },
    { email: 'admin3@example.com', name: 'Admin Three', password: 'ChangeMe123!' },
  ];

  for (const admin of admins) {
    const passwordHash = await bcrypt.hash(admin.password, 10);

    await prisma.user.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        email: admin.email,
        password: passwordHash,
        name: admin.name,
        role: Role.ADMIN,
      },
    });
  }

  // Testimonials

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: testimonials.map((t: Testimonial) => stripId(t)),
  });

  // News

  await prisma.newsItem.deleteMany();
  await prisma.newsItem.createMany({
    data: (newsItems as NewsItem[]).map((item) =>
      toDate({
        ...stripId(item),
        // éviter undefined pour les champs NULLables
        coverImage: (item as any).coverImage ?? null,
      })
    ) as Prisma.NewsItemCreateManyInput[],
  });

  // Job offers

  await prisma.jobOffer.deleteMany();

  const jobOffersData = (jobOffers as JobOffer[]).map((offer) => {
    const base = toDate(stripId(offer));

    return {
      ...base,
      // obligatoires (sécurité)
      slug: offer.slug,
      title: offer.title,
      location: offer.location,
      contractType: offer.contractType,
      description: offer.description ?? '',

      // structures
      equipments: offer.equipments ?? [], // si Prisma = String[]
      sections: offer.sections ?? null, // si Prisma = Json?
    };
  });

  await prisma.jobOffer.createMany({
    data: jobOffersData as Prisma.JobOfferCreateManyInput[],
  });

  // Reservation slots (exemple)
  await prisma.reservation.deleteMany();
  await prisma.reservationSlot.deleteMany();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  const todayParisKey = parisDateKey(new Date());
  const [y, m, d] = todayParisKey.split('-').map(Number);
  const tomorrowParis = new Date(Date.UTC(y, m - 1, d + 1)); // base UTC, juste pour manipuler le jour

  const tomorrowKey = parisDateKey(tomorrowParis); // YYYY-MM-DD stable en Paris

  const slotsData = Array.from({ length: 5 }).map((_, i) => {
    const startStr = `${tomorrowKey}T${pad2(9 + i)}:00`; // "YYYY-MM-DDTHH:mm" (Paris)
    const endStr = `${tomorrowKey}T${pad2(10 + i)}:00`;

    return {
      startAt: fromZonedTime(startStr, TZ), // => Date UTC correcte
      endAt: fromZonedTime(endStr, TZ),
      status: 'AVAILABLE' as const,
    };
  });

  await prisma.reservationSlot.createMany({ data: slotsData });
}

if (require.main === module) {
  main()
    .then(async () => {
      console.log('Seed des admins terminé');
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error('Échec du seed', e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
