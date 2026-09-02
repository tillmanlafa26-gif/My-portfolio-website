'use client';

import { useLayoutEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './portfolio.module.css';
import { projects, type PortfolioProject } from './projects';

type ProjectCardProps = {
  project: PortfolioProject;
};

type ProjectCardStyle = CSSProperties & {
  '--project-accent': string;
  '--project-accent-secondary': string;
};

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const animateCard = (event: PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(card, {
      rotateY: x * 7,
      rotateX: y * -7,
      y: -8,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 900,
      transformOrigin: 'center',
      overwrite: 'auto',
    });
    gsap.to(card.querySelector(`.${styles.projectGlow}`), {
      xPercent: x * 30,
      yPercent: y * 30,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const resetCard = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const style: ProjectCardStyle = {
    '--project-accent': project.accent,
    '--project-accent-secondary': project.secondaryAccent,
  };

  const hasPreview = project.liveUrl && project.liveUrl !== '#';

  return (
    <article
      ref={cardRef}
      className={styles.projectCard}
      style={style}
      onPointerMove={animateCard}
      onPointerLeave={resetCard}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resetCard();
      }}
    >
      <div className={styles.projectPreview} aria-hidden='true'>
        <div className={styles.projectGlow} />
        <div className={styles.projectBrowser}>
          <span />
          <span />
          <span />
          <div className={styles.projectPreviewNav} />
          <div className={styles.projectPreviewHero} />
          <div className={styles.projectPreviewGrid}>
            <i />
            <i />
            <i />
          </div>
        </div>
        <span className={styles.projectPreviewLabel}>{project.previewLabel}</span>
      </div>

      <div className={styles.projectContent}>
        <div className={styles.projectMeta}>
          <span>{project.index}</span>
          <p>{project.eyebrow}</p>
        </div>
        <h3>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <ul className={styles.projectTags} aria-label='Technologies used'>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className={styles.projectActions}>
          {hasPreview ? (
            <a href={project.liveUrl} target='_blank' rel='noreferrer'>
              Live preview <span aria-hidden='true'>↗</span>
            </a>
          ) : (
            <span className={styles.projectSoon}>Preview coming soon</span>
          )}
          {project.sourceUrl && project.sourceUrl !== '#' && (
            <a href={project.sourceUrl} target='_blank' rel='noreferrer'>
              View source <span aria-hidden='true'>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(`.${styles.projectsHeading} > *`, {
          opacity: 0,
          y: 48,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        });
        gsap.from(`.${styles.projectCard}`, {
          opacity: 0,
          y: 72,
          rotateX: 7,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.projectsGrid}`, start: 'top 82%', once: true },
        });
      });
    }, section);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.projects} id='projects' aria-labelledby='projects-title'>
      <div className={styles.projectsHeading}>
        <p className={styles.sectionNumber}>03 / Selected projects</p>
        <div>
          <p className={styles.eyebrow}>Built with purpose</p>
          <h2 id='projects-title'>
            Ideas turned into <em>useful experiences.</em>
          </h2>
        </div>
        <p className={styles.projectsIntro}>
          A growing collection of interfaces shaped by clarity, accessibility, and mission-focused execution.
        </p>
      </div>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.index} project={project} />
        ))}
      </div>
    </section>
  );
}
