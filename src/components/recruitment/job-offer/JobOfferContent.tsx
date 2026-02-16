// src/components/recruitment/job-offer/JobOfferContent.tsx

import type { JobOffer } from '@/types/job';

import Section from '@/components/layout/Section';
import SectionWrapper from '@/components/layout/SectionWrapper';
import Button from '@/components/ui/Button';

import './JobOfferContent.css';

type Props = { offer: JobOffer };

export default function JobOfferContent({ offer }: Props) {
  return (
    <div className="job-offer-content">
      <Section>
        <SectionWrapper>
          {offer.missionStatement && (
            <div className="job-offer-block">
              <h2 className="job-offer-h2">Objectif du poste</h2>
              <p className="job-offer-text">{offer.missionStatement}</p>
            </div>
          )}

          <div className="job-offer-meta-grid">
            {offer.service && (
              <div className="job-offer-meta-item">
                <div className="job-offer-meta-label">Service</div>
                <div className="job-offer-meta-value">{offer.service}</div>
              </div>
            )}

            {offer.reportingLine && (
              <div className="job-offer-meta-item">
                <div className="job-offer-meta-label">Rattachement</div>
                <div className="job-offer-meta-value">{offer.reportingLine}</div>
              </div>
            )}

            {offer.workMode && (
              <div className="job-offer-meta-item">
                <div className="job-offer-meta-label">Mode de travail</div>
                <div className="job-offer-meta-value">{offer.workMode}</div>
              </div>
            )}

            {offer.scheduleNote && (
              <div className="job-offer-meta-item">
                <div className="job-offer-meta-label">Horaires</div>
                <div className="job-offer-meta-value">{offer.scheduleNote}</div>
              </div>
            )}

            {offer.remunerationNote && (
              <div className="job-offer-meta-item job-offer-meta-span-2">
                <div className="job-offer-meta-label">Rémunération</div>
                <div className="job-offer-meta-value">{offer.remunerationNote}</div>
              </div>
            )}

            {!!offer.equipments?.length && (
              <div className="job-offer-meta-item job-offer-meta-span-2">
                <div className="job-offer-meta-label">Matériel fourni</div>
                <ul className="job-offer-list">
                  {offer.equipments.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionWrapper>
      </Section>

      {offer.sections?.map((sec) => (
        <Section key={sec.key}>
          <SectionWrapper>
            <h2 className="job-offer-h2">{sec.title}</h2>

            {!!sec.items?.length && (
              <ul className="job-offer-list">
                {sec.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            )}

            {!!sec.groups?.length &&
              sec.groups.map((g, i) => (
                <div key={i} className="job-offer-group">
                  <h3 className="job-offer-h3">{g.title}</h3>
                  <ul className="job-offer-list">
                    {g.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </SectionWrapper>
        </Section>
      ))}

      <Section>
        <SectionWrapper>
          <div className="job-offer-cta-wrap">
            <div className="job-offer-cta">
              <h2 className="job-offer-cta-title">Ce poste vous correspond ?</h2>
              <p className="job-offer-cta-text">
                Envoyez votre candidature en quelques minutes. Nous reviendrons vers vous dès que
                possible.
              </p>
              <Button
                href={`/recruitment?apply=${encodeURIComponent(offer.title)}`}
                variant="primary"
                aria-label={`Postuler à l'offre ${offer.title}`}
              >
                Postuler à cette offre
                <span className="ml-2" aria-hidden="true">
                  &rsaquo;
                </span>
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </Section>
    </div>
  );
}
