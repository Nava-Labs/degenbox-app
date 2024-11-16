import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Nunito } from 'next/font/google';
import dynamic from 'next/dynamic';

//👇 Configure our font object
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-opensans',
});

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  {
    ssr: false,
  },
);

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'DegenBox',
  description: 'Built on ETHBangkok 2024',
  openGraph: {
    title: 'DegenBox',
    description: 'DegenBox built on ETHBangkok 2024',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="max-w-md mx-auto">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
