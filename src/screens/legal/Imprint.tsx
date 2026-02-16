// src/pages/legal/Imprint.tsx

import Section from '@/components/layout/Section';
import SectionWrapper from '@/components/layout/SectionWrapper';
import PageHero from '@/components/patterns/PageHero';
import { Scale } from 'lucide-react';

const SITE_NAME = 'Nom du site';
const COMPANY_NAME = 'Nom de l’entreprise';
const COMPANY_ACTIVITY = 'Description de l’activité';
const COMPANY_ADDRESS = 'Adresse complète';
const COMPANY_PHONE = 'Numéro de téléphone';
const COMPANY_EMAIL = 'contact@exemple.com';
const LEGAL_REPRESENTATIVE = 'Représentant légal';
const COMPANY_LEGAL_FORM = 'Forme juridique';
const COMPANY_SIRET = 'Numéro SIRET';
const SITE_DOMAIN = 'www.exemple.com';

export default function Imprint() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <PageHero
        icon={<Scale size={40} />}
        title="Mentions légales"
        subtitle={`Informations légales concernant l’édition et l’hébergement du site ${SITE_NAME}.`}
        align="center"
      />

      <Section>
        <SectionWrapper className="text-text space-y-10 sm:space-y-12">
          <h2 className="text-xl font-semibold">Éditeur du site</h2>
          <p>
            <strong>{COMPANY_NAME}</strong>
            <br />
            {COMPANY_ACTIVITY}
            <br />
            Siège social : <span className="opacity-80">{COMPANY_ADDRESS}</span>
            <br />
            Téléphone : <span className="opacity-80">{COMPANY_PHONE}</span>
            <br />
            Email : <span className="opacity-80">{COMPANY_EMAIL}</span>
            <br />
            Représentant légal : <span className="opacity-80">{LEGAL_REPRESENTATIVE}</span>
            <br />
            Forme juridique : <span className="opacity-80">{COMPANY_LEGAL_FORM}</span>
            <br />
            SIRET : <span className="opacity-80">{COMPANY_SIRET}</span>
          </p>

          <h2 className="text-xl font-semibold">Hébergement</h2>
          <p>
            Le site <strong>{SITE_DOMAIN}</strong> est hébergé par :<br />
            <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Avenue, Suite 4133
            <br />
            Covina, CA 91723, États-Unis
            <br />
            Site web :{' '}
            <a href="https://vercel.com" className="text-link hover:underline" target="_blank">
              https://vercel.com
            </a>
          </p>

          <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
          <p>
            L’ensemble des éléments du site <strong>{SITE_NAME}</strong> est la propriété exclusive
            de <strong>{COMPANY_NAME}</strong> sauf mention contraire. Toute reproduction ou
            distribution est interdite sans accord écrit.
          </p>

          <h2 className="text-xl font-semibold">Responsabilité</h2>
          <p>
            <strong>{COMPANY_NAME}</strong> s’efforce de fournir des informations exactes, mais ne
            saurait être tenue responsable en cas d’erreurs.
          </p>

          <h2 className="text-xl font-semibold">Données personnelles</h2>
          <p>
            Les données collectées via les formulaires sont utilisées uniquement pour répondre à vos
            demandes. Plus d’informations dans notre{' '}
            <a href="/legal/privacy" className="text-link hover:underline">
              Politique de confidentialité
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold">Crédits</h2>
          <p>
            Design & développement : <strong>Julien Lisita</strong>
            <br />
            Iconographie : Lucide, Unsplash, Freepik
            <br />
            Dernière mise à jour : {currentYear}
          </p>
        </SectionWrapper>
      </Section>
    </div>
  );
}
