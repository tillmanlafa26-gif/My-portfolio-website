'use client';
import Image from 'next/image';
import { useEffect, useState, type CSSProperties } from 'react';
import bleedingHeart from '@/assets/bleeding_heart.jpg';
import headshot from '@/assets/nate_headshot.png';
import styles from './portfolio.module.css';
const capabilities = [
  'React development',
  'JavaScript (ES6+)',
  'HTML5 & CSS3',
  'Responsive interfaces',
  'Operations management',
  'Team leadership',
  'Problem solving',
  'Process improvement',
];
const experience = [
  {
    index: '01',
    title: 'Front-End Software Developer',
    meta: 'Current focus · React & JavaScript',
    copy: 'Build responsive, component-based web experiences with React, JavaScript, HTML5, and CSS3. Translate requirements into accessible interfaces, reusable UI components, and maintainable front-end code.',
  },
  {
    index: '02',
    title: 'Web Development Certifications',
    meta: 'CoITB · 2026–2029',
    copy: 'Earned professional certifications in React + JSX, JavaScript development, and HTML/CSS web design while expanding practical skills through modern portfolio and application projects.',
  },
  {
    index: '03',
    title: 'Observer Coach / Trainer & Leadership Advisor',
    meta: 'U.S. Army veteran · Training & readiness',
    copy: 'Evaluated units and leaders during large-scale training events, delivered performance coaching, led after-action reviews, and advised leaders on planning, training, and risk management.',
  },
  {
    index: '04',
    title: 'Operations Supervisor / Section Sergeant',
    meta: 'U.S. Army veteran · Team leadership',
    copy: 'Led and trained teams of up to 15 personnel while directing equipment readiness, maintenance, training schedules, personnel development, and daily mission-support operations.',
  },
  {
    index: '05',
    title: 'Company Armorer / Unit Movement Officer',
    meta: '$14M+ assets · Six NATO countries',
    copy: 'Managed the accountability and transportation of more than $14 million in equipment across six NATO countries with zero losses, overseeing inventory, physical security, inspections, and compliance.',
  },
  {
    index: '06',
    title: 'Instructor & Equal Opportunity Advisor',
    meta: 'U.S. Army veteran · People development',
    copy: 'Delivered classroom and field instruction, developed training materials, and advised leaders on workplace dignity, fairness, employee relations, and organizational climate.',
  },
];
function RootSystem({ progress }: { progress: number }) {
  return (
    <svg
      className={styles.roots}
      viewBox='0 0 1440 2200'
      preserveAspectRatio='xMidYMid slice'
      aria-hidden='true'
    >
      <g style={{ '--growth': progress } as CSSProperties}>
        <path d='M720 410 C705 570 560 600 515 755 S420 1020 235 1125 S90 1440 40 1570' />
        <path d='M690 475 C620 620 640 765 510 875 S310 920 170 830 S45 705 -35 735' />
        <path d='M735 430 C790 600 915 620 940 795 S1035 1035 1215 1115 S1360 1320 1480 1400' />
        <path d='M760 510 C885 650 805 820 970 930 S1195 900 1300 795 S1420 720 1490 750' />
        <path d='M715 590 C690 770 755 910 690 1080 S510 1260 520 1470 S680 1780 590 2230' />
        <path d='M730 580 C755 775 690 940 780 1110 S955 1300 925 1515 S760 1820 850 2240' />
      </g>
    </svg>
  );
}
export default function ResumePortfolio() {
  const [progress, setProgress] = useState(0.12);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min(1, 0.12 + (max ? window.scrollY / max : 0) * 0.88));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <main className={styles.page}>
      <div className={styles.fixedArt} aria-hidden='true'>
        <Image src={bleedingHeart} alt='' fill priority sizes='100vw' />
        <div className={styles.artVeil} />
      </div>
      <RootSystem progress={progress} />
      <header className={styles.nav}>
        <a href='#top' className={styles.mark}>
          N<span>.</span>
        </a>
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label='Toggle navigation'
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? styles.menuOpen : ''}>
          <a href='#about'>About</a>
          <a href='#experience'>Experience</a>
          <a href='#contact'>Contact</a>
        </nav>
        <span className={styles.availability}>
          <i /> Available for opportunities
        </span>
      </header>
      <section className={styles.hero} id='top'>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Front-end developer · Army veteran</p>
          <h1>
            Mission-tested.
            <br />
            People-first.
            <br />
            <em>Future-focused.</em>
          </h1>
          <p className={styles.intro}>
            I’m Nate Tillman — a front-end software developer and U.S. Army
            veteran combining React and JavaScript skills with 15 years of
            leadership, logistics, training, and mission-focused execution.
          </p>
          <div className={styles.heroActions}>
            <a href='#experience' className={styles.primary}>
              Explore my work <span>↘</span>
            </a>
            <a href='#contact' className={styles.textLink}>
              Start a conversation
            </a>
          </div>
        </div>
        <div className={styles.portraitWrap}>
          <span className={styles.portraitLabel}>A face to the work</span>
          <div className={styles.portrait}>
            <Image
              src={headshot}
              alt='Portrait of Nate Tillman'
              fill
              priority
              sizes='(max-width: 768px) 75vw, 38vw'
            />
          </div>
          <p>Hinesville, Georgia</p>
        </div>
        <div className={styles.scrollCue}>
          <span /> Scroll to grow
        </div>
      </section>
      <section className={styles.statement} id='about'>
        <p className={styles.sectionNumber}>01 / About</p>
        <div>
          <h2>
            Leadership built
            <br />
            through <em>service.</em>
          </h2>
          <div className={styles.aboutGrid}>
            <p>
              For 15 years, I led personnel, protected critical
              assets, and supported deployment operations where preparation,
              accountability, and clear communication are non-negotiable. My
              experience spans operations supervision, logistics, safety, Equal
              Opportunity programs, and workforce development.
            </p>
            <p>
              Today, I pair that military leadership foundation with front-end
              development skills in HTML5, CSS3, JavaScript, and React. I bring
              the same disciplined approach to technology: understand the
              mission, build with purpose, test the details, and deliver
              something people can rely on.
            </p>
          </div>
          <div className={styles.capabilities}>
            {capabilities.map((item, i) => (
              <span key={item}>
                <b>0{i + 1}</b>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.work} id='experience'>
        <div className={styles.workHeader}>
          <p className={styles.sectionNumber}>02 / Experience</p>
          <h2>
            A record of
            <br />
            <em>moving things forward.</em>
          </h2>
        </div>
        <div className={styles.timeline}>
          {experience.map((item) => (
            <article key={item.index}>
              <span>{item.index}</span>
              <div>
                <p>{item.meta}</p>
                <h3>{item.title}</h3>
              </div>
              <p>{item.copy}</p>
              <i>↗</i>
            </article>
          ))}
        </div>
        <div className={styles.resumeNote}>
          Technical credentials: Certified React + JSX Professional Developer ·
          Certified JavaScript Professional Developer · Certified HTML/CSS Web
          Designer · CoITB, 2026–2029. Education: Gage Park High School Diploma
          and Joint Services Transcript coursework.
        </div>
      </section>
      <section className={styles.contact} id='contact'>
        <p className={styles.sectionNumber}>03 / Contact</p>
        <div>
          <p className={styles.eyebrow}>Have something in mind?</p>
          <h2>
            Let’s make
            <br />
            it <em>matter.</em>
          </h2>
          <a href='mailto:tillmanlafa26@gmail.com'>
            tillmanlafa26@gmail.com <span>↗</span>
          </a>
          <a href='tel:+19106275473'>
            910 627 5473 <span>↗</span>
          </a>
        </div>
        <footer>
          <span>© {new Date().getFullYear()} Nate Tillman</span>
          <span>Hinesville, GA</span>
          <a href='#top'>Back to top ↑</a>
        </footer>
      </section>
    </main>
  );
}
