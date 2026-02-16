// src/pages/legal/Terms.tsx

import Section from '@/components/layout/Section';
import SectionWrapper from '@/components/layout/SectionWrapper';
import PageHero from '@/components/patterns/PageHero';
import { FileText } from 'lucide-react';

const SITE_NAME = 'Nom du site';
const COMPANY_NAME = 'Nom de l’entreprise';
const CONTACT_EMAIL = 'contact@exemple.com';

export default function Terms() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <PageHero
        icon={<FileText size={40} />}
        title="Conditions d’utilisation"
        subtitle={`Conditions générales d’utilisation du site ${SITE_NAME}.`}
        align="center"
      />

      <Section>
        <SectionWrapper className="text-text space-y-10 sm:space-y-12">
          {/* 1. Objet */}
          <h2 className="text-xl font-semibold">1. Objet des conditions d’utilisation</h2>
          <p>
            Les présentes Conditions Générales d’Utilisation (ci-après « CGU ») encadrent l’accès et
            l’utilisation du site <strong>{SITE_NAME}</strong>. En naviguant sur ce site, vous
            acceptez pleinement et sans réserve les présentes CGU.
          </p>

          {/* 2. Accès au site */}
          <h2 className="text-xl font-semibold">2. Accès au site</h2>
          <p>
            Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet.
            Tous les frais nécessaires à l’accès au service (matériel, connexion…) sont à la charge
            de l’utilisateur.
          </p>

          {/* 3. Propriété intellectuelle */}
          <h2 className="text-xl font-semibold">3. Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus présents sur <strong>{SITE_NAME}</strong> (textes, images,
            illustrations, logos, vidéos, structure du site…) est protégé par le droit d’auteur et
            reste la propriété exclusive de <strong>{COMPANY_NAME}</strong>, sauf mention contraire.
            Toute reproduction, distribution ou exploitation des contenus sans autorisation écrite
            est interdite.
          </p>

          {/* 4. Utilisation du site */}
          <h2 className="text-xl font-semibold">4. Utilisation du site</h2>
          <p>
            L’utilisateur s’engage à utiliser le site de manière conforme aux lois en vigueur et à
            ne pas perturber son bon fonctionnement. Toute tentative de fraude, intrusion non
            autorisée ou altération du site entraînera des poursuites.
          </p>

          {/* 5. Responsabilité */}
          <h2 className="text-xl font-semibold">5. Responsabilité</h2>
          <p>
            <strong>{COMPANY_NAME}</strong> s’efforce d’assurer l’exactitude des informations
            publiées mais ne peut garantir l’absence d’erreur. Le site peut contenir des liens vers
            d’autres sites ; <strong>{COMPANY_NAME}</strong> décline toute responsabilité quant à
            leur contenu.
          </p>
          <p>
            L’accès au site peut être interrompu pour maintenance, mise à jour ou raison technique.
          </p>

          {/* 6. Données personnelles */}
          <h2 className="text-xl font-semibold">6. Données personnelles</h2>
          <p>
            L’utilisation du site implique parfois la transmission de données personnelles. La
            collecte et l’utilisation de ces données sont détaillées dans notre{' '}
            <a href="/legal/privacy" className="text-link hover:underline">
              Politique de confidentialité
            </a>
            .
          </p>

          {/* 7. Cookies */}
          <h2 className="text-xl font-semibold">7. Cookies</h2>
          <p>
            Le site peut utiliser des cookies pour améliorer l’expérience utilisateur. Vous pouvez
            configurer votre navigateur pour refuser ou supprimer ces cookies.
          </p>

          {/* 8. Modification des CGU */}
          <h2 className="text-xl font-semibold">8. Modification des conditions</h2>
          <p>
            <strong>{COMPANY_NAME}</strong> se réserve le droit de modifier les présentes conditions
            à tout moment. La version en vigueur est celle consultable sur le site à la date de
            votre visite.
          </p>

          {/* 9. Contact */}
          <h2 className="text-xl font-semibold">9. Contact</h2>
          <p>
            Pour toute question concernant ces conditions, vous pouvez nous contacter à l’adresse
            suivante :{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-link underline hover:no-underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          <p className="opacity-80 pt-8">Dernière mise à jour : {currentYear}</p>
        </SectionWrapper>
      </Section>
    </div>
  );
}
