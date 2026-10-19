import type { Metadata } from 'next';
import { Inter_Tight, Inter, Unbounded, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CursorBlob from '@/components/layout/CursorBlob';
import './globals.css';

// Inter Tight is the closest open match to Apple's SF Pro Display
const display = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-display',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
});

// Chunky display face for the funky bits: tapes, stickers, big numbers
const fun = Unbounded({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  display: 'swap',
  variable: '--font-fun',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arihantjain.dev'),
  title: 'Arihant Jain | Full Stack Developer',
  description:
    'Frontend-heavy Full Stack Developer with 5+ years of experience building high-impact web and mobile apps using React, React Native, Next.js, and Node.js across fintech, e-commerce, and EV tech.',
  keywords: [
    'software engineer',
    'frontend developer',
    'React Native developer',
    'React developer',
    'Next.js developer',
    'mobile app developer',
    'full stack developer',
    'Node.js developer',
    'Arihant Jain',
    'Gurugram',
  ],
  openGraph: {
    title: 'Arihant Jain | Full Stack Developer',
    description:
      'Frontend-heavy Full Stack Developer with 5+ years building web & mobile apps across fintech, e-commerce, and EV tech.',
    url: 'https://arihantjain.dev',
    siteName: 'Arihant Jain — Full Stack Developer',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arihant Jain | Full Stack Developer',
    description:
      'Frontend-heavy Full Stack Developer with 5+ years building web & mobile apps across fintech, e-commerce, and EV tech.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${fun.variable} ${mono.variable}`}>
      <body>
        <ScrollProgress />
        <CursorBlob />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
