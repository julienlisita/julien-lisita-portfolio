// src/components/home/NewsTeaser.tsx

import type { NewsItem } from '@/types/news';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Subtitle from '../ui/Subtitle';
import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import NewsGrid from './NewsGrid';

type Props = { items: ReadonlyArray<NewsItem> };

export default function NewsTeaser({ items }: Props) {
  return (
    <Section>
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Colonne gauche */}
          <div className="flex flex-col items-center justify-start text-center lg:text-left lg:items-start space-y-4">
            <span className="block text-sm font-semibold uppercase tracking-wide text-gray-600">
              À la une
            </span>
            <SectionTitle>Actualités récentes</SectionTitle>
            <Subtitle>Les dernières infos utiles pour vous.</Subtitle>
            <div className="mt-6">
              <Button href="/news" variant="primary">
                Voir toutes les actualités
              </Button>
            </div>
          </div>

          {/* Colonne droite */}
          <NewsGrid items={items} />
        </div>
      </SectionWrapper>
    </Section>
  );
}
