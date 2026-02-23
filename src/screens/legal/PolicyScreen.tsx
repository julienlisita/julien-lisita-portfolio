// src/pages/legal/PolicyScreen.tsx

import Section from '@/components/layout/Section';
import SectionWrapper from '@/components/layout/SectionWrapper';
import PageHero from '@/components/patterns/PageHero';
import { Shield } from 'lucide-react';

const SITE_NAME = 'Nom du site';
const COMPANY_NAME = 'Nom de l’entreprise';
const CONTACT_EMAIL = 'contact@exemple.com';

export default function PrivacyScreen() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <PageHero
        icon={<Shield size={40} />}
        title="Politique de confidentialité"
        subtitle={`Découvrez comment ${SITE_NAME} collecte, utilise et protège vos données personnelles conformément au RGPD.`}
        align="center"
      />

      <Section>
        <SectionWrapper className="text-text space-y-10 sm:space-y-12">
          {/* 1. Données collectées */}
          <h2 className="text-xl font-semibold">1. Données collectées</h2>
          <p>
            Nous recueillons uniquement les informations nécessaires au traitement de vos demandes
            via les formulaires présents sur le site (contact, demande d’information, candidature,
            etc.) :
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse e-mail et/ou téléphone</li>
            <li>Objet et contenu de votre message</li>
            <li>CV et lettre de motivation (le cas échéant pour les candidatures)</li>
          </ul>

          {/* 2. Finalités du traitement */}
          <h2 className="text-xl font-semibold">2. Finalités du traitement</h2>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Répondre à vos demandes d’information ou de contact</li>
            <li>Étudier votre candidature le cas échéant</li>
          </ul>
          <p className="mt-1">
            Aucune donnée n’est vendue ni utilisée à des fins commerciales sans votre consentement
            explicite.
          </p>

          {/* 3. Base légale & durée de conservation */}
          <h2 className="text-xl font-semibold">3. Base légale & durée de conservation</h2>
          <p>
            Le traitement de vos données repose sur votre consentement et/ou sur notre intérêt
            légitime à répondre à vos sollicitations. Les données sont conservées uniquement pendant
            le temps nécessaire au traitement de votre demande, puis supprimées ou archivées
            conformément aux obligations légales applicables.
          </p>

          {/* 4. Sécurité */}
          <h2 className="text-xl font-semibold">4. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées afin de
            protéger vos données contre tout accès non autorisé, perte, altération ou divulgation.
            Toutefois, aucun système n’étant totalement infaillible, nous ne pouvons garantir une
            sécurité absolue.
          </p>

          {/* 5. Vos droits */}
          <h2 className="text-xl font-semibold">5. Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
            réglementation en vigueur, vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Droit d’accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit de suppression (droit à l’oubli)</li>
            <li>Droit de limitation du traitement</li>
            <li>Droit d’opposition</li>
            <li>Droit à la portabilité des données (dans certains cas)</li>
          </ul>
          <p className="mt-2">
            Pour exercer vos droits, vous pouvez nous contacter à l’adresse suivante :{' '}
            <span className="text-link font-medium">
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:no-underline">
                {CONTACT_EMAIL}
              </a>
            </span>
            .
          </p>

          {/* 6. Responsable du traitement */}
          <h2 className="text-xl font-semibold">6. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données personnelles est{' '}
            <strong>{COMPANY_NAME}</strong>. Les informations complètes concernant l’éditeur,
            l’adresse et les informations légales de l’entreprise sont disponibles dans nos{' '}
            <a href="/legal/imprint" className="text-link hover:underline">
              Mentions légales
            </a>
            .
          </p>

          {/* 7. Mise à jour */}
          <h2 className="text-xl font-semibold">7. Mise à jour</h2>
          <p>
            La présente politique de confidentialité peut être mise à jour afin de refléter les
            évolutions légales, réglementaires ou techniques. Nous vous invitons à la consulter
            régulièrement. Dernière mise à jour : {currentYear}.
          </p>
        </SectionWrapper>
      </Section>
    </div>
  );
}
