'use client';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import headshot from '@/assets/nate_headshot.png';
import GalaxyBackground from './GalaxyBackground';
import ProjectsSection from './ProjectsSection';
import { ContactSection } from '@/components/ui/contact';
import styles from './portfolio.module.css';

const capabilities = ['React development', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Responsive interfaces', 'Operations management', 'Team leadership', 'Problem solving', 'Process improvement'];
const experience = [
  { index:'01', title:'Front-End Software Developer', meta:'Current focus · React & JavaScript', copy:'Build responsive, component-based web experiences with React, JavaScript, HTML5, and CSS3. Translate requirements into accessible interfaces, reusable UI components, and maintainable front-end code.' },
  { index:'02', title:'Web Development Certifications', meta:'CoITB · 2026–2029', copy:'Earned professional certifications in React + JSX, JavaScript development, and HTML/CSS web design while expanding practical skills through modern portfolio and application projects.' },
  { index:'03', title:'Observer Coach / Trainer & Leadership Advisor', meta:'U.S. Army veteran · Training & readiness', copy:'Evaluated units and leaders during large-scale training events, delivered performance coaching, led after-action reviews, and advised leaders on planning, training, and risk management.' },
  { index:'04', title:'Operations Supervisor / Section Sergeant', meta:'U.S. Army veteran · Team leadership', copy:'Led and trained teams of up to 15 personnel while directing equipment readiness, maintenance, training schedules, personnel development, and daily mission-support operations.' },
  { index:'05', title:'Company Armorer / Unit Movement Officer', meta:'$14M+ assets · Six NATO countries', copy:'Managed the accountability and transportation of more than $14 million in equipment across six NATO countries with zero losses, overseeing inventory, physical security, inspections, and compliance.' },
  { index:'06', title:'Instructor & Equal Opportunity Advisor', meta:'U.S. Army veteran · People development', copy:'Delivered classroom and field instruction, developed training materials, and advised leaders on workplace dignity, fairness, employee relations, and organizational climate.' },
];

export default function ResumePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const page = pageRef.current;
    if (!page) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => gsap.from(el, { autoAlpha:0, y:42, duration:.85, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 88%', once:true } }));
        gsap.utils.toArray<HTMLElement>('[data-card]').forEach((el) => gsap.from(el, { autoAlpha:0, y:54, scale:.97, duration:.8, ease:'power3.out', scrollTrigger:{ trigger:el, start:'top 90%', once:true } }));
      });
    }, page);
    return () => { media.revert(); context.revert(); };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <main ref={pageRef} className={styles.page} onKeyDown={(e) => { if (e.key === 'Escape') closeMenu(); }}>
    <GalaxyBackground />
    <header className={styles.nav}>
      <a href='#top' className={styles.mark} aria-label='Nate Tillman, back to top'>N<span>.</span></a>
      <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls='portfolio-navigation' aria-label='Toggle navigation'><span/><span/></button>
      <nav id='portfolio-navigation' aria-label='Portfolio navigation' className={menuOpen ? styles.menuOpen : ''}>
        <a href='#about' onClick={closeMenu}>About</a><a href='#experience' onClick={closeMenu}>Experience</a><a href='#projects' onClick={closeMenu}>Projects</a><a href='#contact-form' onClick={closeMenu}>Contact</a>
      </nav><span className={styles.availability}><i aria-hidden='true'/> Available for opportunities</span>
    </header>
    <section className={styles.hero} id='top'>
      <div className={styles.heroCopy} data-reveal><p className={styles.eyebrow}>Front-end developer · Army veteran</p><h1>Mission-tested.<br/>People-first.<br/><em>Future-focused.</em></h1><p className={styles.intro}>I’m Nate Tillman — a front-end software developer and U.S. Army veteran combining React and JavaScript skills with 15 years of leadership, logistics, training, and mission-focused execution.</p><div className={styles.heroActions}><a href='#projects' className={styles.primary}>Explore my work <span aria-hidden='true'>↗</span></a><a href='#contact' className={styles.textLink}>Start a conversation</a></div></div>
      <div className={styles.portraitWrap} data-card><span className={styles.portraitLabel}>A face to the work</span><div className={styles.portrait}><Image src={headshot} alt='Portrait of Nate Tillman' fill priority sizes='(max-width: 768px) 75vw, 38vw'/></div><p>Hinesville, Georgia</p></div><div className={styles.scrollCue}><span/> Scroll to explore</div>
    </section>
    <section className={styles.statement} id='about'><p className={styles.sectionNumber} data-reveal>01 / About</p><div data-reveal><h2>Leadership built<br/>through <em>service.</em></h2><div className={styles.aboutGrid}><p>For 15 years, I led personnel, protected critical assets, and supported deployment operations where preparation, accountability, and clear communication are non-negotiable. My experience spans operations supervision, logistics, safety, Equal Opportunity programs, and workforce development.</p><p>Today, I pair that military leadership foundation with front-end development skills in HTML5, CSS3, JavaScript, and React. I bring the same disciplined approach to technology: understand the mission, build with purpose, test the details, and deliver something people can rely on.</p></div><div className={styles.capabilities}>{capabilities.map((item,i)=><span key={item} data-card><b>0{i+1}</b>{item}</span>)}</div></div></section>
    <section className={styles.work} id='experience'><div className={styles.workHeader} data-reveal><p className={styles.sectionNumber}>02 / Experience</p><h2>A record of<br/><em>moving things forward.</em></h2></div><div className={styles.timeline}>{experience.map((item)=><article key={item.index} data-card><span>{item.index}</span><div><p>{item.meta}</p><h3>{item.title}</h3></div><p>{item.copy}</p><i aria-hidden='true'>↗</i></article>)}</div><div className={styles.resumeNote}>Technical credentials: Certified React + JSX Professional Developer · Certified JavaScript Professional Developer · Certified HTML/CSS Web Designer · CoITB, 2026–2029. Education: Gage Park High School Diploma and Joint Services Transcript coursework.</div></section>
    <ProjectsSection/>
    <div id='contact-form' className={styles.contactForm} data-reveal><ContactSection/></div>
    <section className={styles.contact} id='contact'><p className={styles.sectionNumber} data-reveal>04 / Contact</p><div data-reveal><p className={styles.eyebrow}>Have something in mind?</p><h2>Let’s make<br/>it <em>matter.</em></h2><a href='mailto:tillmanlafa26@gmail.com'>tillmanlafa26@gmail.com <span aria-hidden='true'>↗</span></a><a href='tel:+19106275473'>910 627 5473 <span aria-hidden='true'>↗</span></a></div><footer><span>© {new Date().getFullYear()} Nate Tillman</span><span>Hinesville, GA</span><a href='#top'>Back to top ↑</a></footer></section>
  </main>;
}
