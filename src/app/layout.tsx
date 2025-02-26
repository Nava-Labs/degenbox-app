'use client'
// import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Nunito } from 'next/font/google';
import dynamic from 'next/dynamic';

import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "@burnt-labs/abstraxion/dist/index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWagmiConfig } from '../wagmi';
import { WagmiProvider } from 'wagmi';

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

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1.0,
// };

// Example XION seat contract
const seatContractAddress =
  "xion1z70cvc08qv5764zeg3dykcyymj5z6nu4sqr7x8vl4zjef2gyp69s9mmdka";

const legacyConfig = {
  contracts: [
    // Usually, you would have a list of different contracts here
    seatContractAddress,
    {
      address: seatContractAddress,
      amounts: [{ denom: "uxion", amount: "1000000" }],
    },
  ],
  stake: true,
  bank: [
    {
      denom: "uxion",
      amount: "1000000",
    },
  ],
  // Optional params to activate mainnet config
  // rpcUrl: "https://rpc.xion-mainnet-1.burnt.com:443",
  // restUrl: "https://api.xion-mainnet-1.burnt.com:443",
};

const treasuryConfig = {
  treasury: "xion1nn55ch09p4a4z30am967n5n8r75m2ag3s3sujutxfmchhsxqtg3qghdg7h", // Example XION treasury instance for executing seat contract
  gasPrice: "0.001uxion", // If you feel the need to change the gasPrice when connecting to signer, set this value. Please stick to the string format seen in example
  // Optional params to activate mainnet config
  // rpcUrl: "https://rpc.xion-mainnet-1.burnt.com:443",
  // restUrl: "https://api.xion-mainnet-1.burnt.com:443",
};
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const wagmiConfig = useWagmiConfig();

  return (
    <html lang="en" className={nunito.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="max-w-md mx-auto">
        {/* <OnchainProviders>{children}</OnchainProviders> */}
        <WagmiProvider config={wagmiConfig}>

          <QueryClientProvider client={queryClient}>
            <AbstraxionProvider config={treasuryConfig}>
              {children}
            </AbstraxionProvider>
          </QueryClientProvider>
        </WagmiProvider>

      </body>
    </html>
  );
}
