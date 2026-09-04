import '@/styles/animate.css';
import '@/styles/prism-vsc-dark-plus.css';
import '@/styles/star.css';
import '@/styles/tailwind.css';

import ScrollToTop from '@/components/ScrollToTop';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

export const metadata: Metadata = {
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={plusJakarta.className}>
      <body>
        <div className='isolate'>{children}</div>

        <ScrollToTop />
      </body>
    </html>
  );
}
