export type PortfolioProject = {
  index: string;
  title: string;
  description: string;
  eyebrow: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  previewImage?: string;
  accent: string;
  secondaryAccent: string;
  previewLabel: string;
};

// Replace these entries with your own work. Links are optional; when omitted,
// the card shows a friendly "Preview coming soon" status instead.
export const projects: PortfolioProject[] = [
  {
    index: '01',
    title: 'The Beans Place',
    eyebrow: 'Featured build',
    description:
      'A warm, editorial coffee storefront for browsing premium beans and discovering a better daily brew.',
    technologies: ['Next.js', 'E-commerce', 'Responsive UI'],
    liveUrl: 'https://the-beans-place-nu.vercel.app/',
    previewImage: 'https://image.thum.io/get/width/1200/crop/800/https://the-beans-place-nu.vercel.app/',
    accent: '#c98f62',
    secondaryAccent: '#f2dfc7',
    previewLabel: 'The Beans Place storefront',
  },
  {
    index: '02',
    title: 'The Barber Shop',
    eyebrow: 'Featured build',
    description:
      'A polished barbershop experience designed to make exploring services and booking a fresh cut feel effortless.',
    technologies: ['Next.js', 'Booking UI', 'Responsive UI'],
    liveUrl: 'https://barbershop-07-git-nameofbranch-student-335f.vercel.app/',
    previewImage: 'https://image.thum.io/get/width/1200/crop/800/https://barbershop-07-git-nameofbranch-student-335f.vercel.app/',
    accent: '#c99a63',
    secondaryAccent: '#38261c',
    previewLabel: 'The Barber Shop experience',
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
