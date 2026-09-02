export type PortfolioProject = {
  index: string;
  title: string;
  description: string;
  eyebrow: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  accent: string;
  secondaryAccent: string;
  previewLabel: string;
};

// Replace these entries with your own work. Links are optional; when omitted,
// the card shows a friendly "Preview coming soon" status instead.
export const projects: PortfolioProject[] = [
  {
    index: '01',
    title: 'Mission Control Dashboard',
    eyebrow: 'Featured build',
    description:
      'A responsive operations workspace that turns complex activity into a clear, focused view for fast decision-making.',
    technologies: ['React', 'TypeScript', 'Responsive UI'],
    liveUrl: '#',
    sourceUrl: '#',
    accent: '#f1884b',
    secondaryAccent: '#6e78ff',
    previewLabel: 'Operations dashboard interface',
  },
  {
    index: '02',
    title: 'Team Readiness Portal',
    eyebrow: 'Product concept',
    description:
      'An accessible training and readiness portal designed around quick scanning, simple workflows, and meaningful progress cues.',
    technologies: ['Next.js', 'Accessibility', 'UX Design'],
    liveUrl: '#',
    accent: '#d8b66a',
    secondaryAccent: '#55b8ae',
    previewLabel: 'Readiness portal interface',
  },
  {
    index: '03',
    title: 'Your Next Project',
    eyebrow: 'Reserved for your work',
    description:
      'Swap this placeholder for a project story, the problem you solved, and the impact your finished work made.',
    technologies: ['Add stack', 'Add skill', 'Add outcome'],
    accent: '#a877e8',
    secondaryAccent: '#ea6d82',
    previewLabel: 'Future project preview',
  },
];
