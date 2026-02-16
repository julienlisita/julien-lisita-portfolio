// src/components/portfolio/PortfolioContent.tsx

import type { Project } from '@/types/project';

import Section from '../layout/Section';
import SectionWrapper from '../layout/SectionWrapper';
import HeaderBlock from '../patterns/HeaderBlock';

import './PortfolioContent.css';

function pickPrimaryExternalLink(project: Project) {
  const links = project.links ?? [];
  const demo = links.find((l) => l.external && /démo|demo|site|voir/i.test(l.label));
  return demo ?? links.find((l) => l.external) ?? null;
}

export default function PortfolioContent({ project }: { project: Project }) {
  const primaryLink = pickPrimaryExternalLink(project);
  const externalLinks = (project.links ?? []).filter((l) => l.external);

  return (
    <>
      {/* En bref */}
      <Section bgColor="var(--section-projects-bg)">
        <SectionWrapper>
          <HeaderBlock
            eyebrow={project.kind ?? 'Projet'}
            title="En bref"
            subtitle="Une vue d’ensemble rapide avant d’entrer dans le détail."
            align="left"
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {project.context && (
                <div className="project-panel p-6">
                  <p className="project-panel__eyebrow">Contexte</p>
                  <p className="project-panel__text mt-2">{project.context}</p>
                </div>
              )}

              {project.problem && (
                <div className="project-panel p-6">
                  <p className="project-panel__eyebrow">Besoin / Problème</p>
                  <p className="project-panel__text mt-2">{project.problem}</p>
                </div>
              )}

              {project.solution && (
                <div className="project-panel p-6">
                  <p className="project-panel__eyebrow">Solution</p>
                  <p className="project-panel__text mt-2">{project.solution}</p>
                </div>
              )}
            </div>

            <aside className="project-panel p-6 h-fit">
              <p className="project-panel__eyebrow">Informations</p>

              <ul className="project-info mt-3 space-y-2 text-sm">
                {project.year && (
                  <li>
                    <span className="project-info__label">Année :</span> {project.year}
                  </li>
                )}
                {project.kind && (
                  <li>
                    <span className="project-info__label">Type :</span> {project.kind}
                  </li>
                )}
                {primaryLink && (
                  <li>
                    <span className="project-info__label">Lien :</span>{' '}
                    <a
                      className="project-link"
                      href={primaryLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {primaryLink.label}
                    </a>
                  </li>
                )}
              </ul>
            </aside>
          </div>
        </SectionWrapper>
      </Section>

      {/* Fonctionnalités */}
      {project.features?.length && (
        <Section>
          <SectionWrapper>
            <HeaderBlock
              eyebrow="Ce que fait le projet"
              title="Fonctionnalités clés"
              subtitle="Les points qui comptent pour l’utilisateur."
              align="left"
            />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {project.features.map((f) => (
                <div key={f} className="project-cardline p-6">
                  <p className="project-cardline__title">{f}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </Section>
      )}

      {/* Résultats */}
      {project.outcomes?.length && (
        <Section bgColor="var(--section-projects-bg)">
          <SectionWrapper>
            <HeaderBlock
              eyebrow="Impact"
              title="Résultats et bénéfices"
              subtitle="Pourquoi ce projet est utile — de façon concrète."
              align="left"
            />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {project.outcomes.map((o) => (
                <div key={o} className="project-cardline p-6">
                  <p className="project-cardline__text">{o}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </Section>
      )}

      {/* Ressources */}
      <Section>
        <SectionWrapper>
          <HeaderBlock
            eyebrow="Ressources"
            title="Aller plus loin"
            subtitle="Démo, code source et informations complémentaires."
            align="left"
          />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="project-panel p-6">
              <p className="project-panel__eyebrow">Liens</p>

              <ul className="mt-3 space-y-2 text-sm">
                {externalLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      className="project-link"
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {project.techStack?.length && (
              <div className="project-panel p-6">
                <p className="project-panel__eyebrow">Technologie (optionnel)</p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <li key={t} className="project-chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionWrapper>
      </Section>
    </>
  );
}
