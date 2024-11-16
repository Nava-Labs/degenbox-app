'use client';

import { StickyBottomNavbar } from '@/components/sticky-bottom-navbar';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import Onboarding from '../components/Onboarding';
import BoxIcon from '@/public/icons/box.svg';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import TopUpButton from '../components/TopUpButton';
import { formatEther } from 'ethers';
import { truncateAddress } from '../lib/utiles';
import Loading from '@/public/loading.svg';
import RainbowHeader from '@/public/rainbow-header.svg';

// Type definition for Box
type Box = {
  id: number;
  name: string;
  token_list: Token[] | [];
  address: string;
  boxPrice: string;
  formattedBoxPrice: string;
};

type Token = {
  name: string;
  amount: string;
  address: string;
  feed_id: string;
  logo_url: string;
  domain_id: string;
  pricePerToken: string;
  totalUSDValue: string;
  formattedUSDValue: string;
  formattedPricePerToken: string;
};

// Type for CCTP Domain Map
type CctpDomainMap = {
  [key: number]: string;
};

export default function Page() {
  const { address } = useAccount();

  const {
    data: boxes,
    isLoading,
    error,
  } = useQuery<Box[]>({
    queryKey: ['boxes'],
    queryFn: async () => {
      const response = await axios.get('/api/boxes/');
      return response.data.boxes;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-primary-50">
        <Loading className="w-24 h-24 text-primary-200" />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching boxes</div>;
  }

  return (
    <div>
      {address ? (
        <>
          <Heading />
          <div className="px-6 w-full min-h-full pt-8 pb-20 bg-white">
            <div className="flex space-x-2.5 mb-2">
              <div className="w-full rounded-full h-1.5 bg-primary-300" />
              <div className="w-full rounded-full h-1.5 bg-primary-300 opacity-25" />
              <div className="w-full rounded-full h-1.5 bg-primary-300 opacity-25" />
            </div>
            {!boxes && <li>No Boxes Found</li>}
            {!!boxes && <BoxList box={boxes[0]} tokens={boxes[0].token_list} />}
          </div>
          <StickyBottomNavbar />
        </>
      ) : (
        <Onboarding />
      )}
    </div>
  );
}

function Heading() {
  const { address } = useAccount();
  return (
    <div className="w-full relative">
      <RainbowHeader className="w-full" />

      <div className="absolute top-[10%] left-0 right-0 flex flex-col items-center w-full">
        <div className="flex px-3 py-0.5 items-center justify-center rounded-full text-xs font-black bg-[#C2E6F5] border border-b-4 border-l-2 border-r-2 border-primary-900 text-center text-primary-900 shadow-sm">
          Welcome, navalabs.base.eth 👋🏼
        </div>

        <div className="flex px-3 py-0.5 font-bold items-center justify-center rounded-full text-[10px] bg-[#C2E6F5] border-2 border-primary-900 text-center text-primary-900">
          <span>{address}</span>
        </div>

        <div className="flex flex-col space-y-1 items-center justify-center px-4 mt-2 leading-none w-28">
          <h1 className="font-black text-center text-4xl h4-shadow text-primary-200 leading-none">
            Discover
          </h1>
          <h1 className="font-black text-center text-4xl h4-shadow text-primary-200 leading-none">
            Boxes
          </h1>
        </div>
      </div>

      <div className="absolute -bottom-[18px] w-full items-center justify-center">
        <div className="flex w-fit mx-auto pl-1 rounded-full text-md font-medium bg-primary-100 border-4 border-white text-center text-primary-900">
          <div className="flex justify-center gap-1">
            <div className="flex items-center gap-0.5">
              <img
                src="/icons/dollar.svg"
                className="w-5 h-5"
                alt="Dollar icon"
              />
              <span className="text-primary-700 font-bold text-sm">
                199 USDC
              </span>
            </div>

            <TopUpButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function BoxList({ box, tokens }: { box: Box; tokens: Token[] }) {
  const cctpDomainMap: CctpDomainMap = {
    0: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    5: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    6: 'https://s2.coinmarketcap.com/static/img/coins/64x64/27716.png',
  };

  return (
    <div className="relative w-full border border-primary-100 rounded-lg px-3 py-2.5">
      {/* Card Header */}
      <div className="w-full flex justify-between items-start">
        <div className="flex w-full flex-col items-start gap-2">
          <div className="flex w-full justify-between items-center">
            <div className="bg-primary-200 size-12 flex items-center justify-center rounded-lg overflow-hidden">
              <BoxIcon
                src="/icons/box.svg"
                className="w-8 h-8 stroke-primary-600"
                alt="Box icon"
              />
            </div>
            <div className="text-right">
              <h1 className="text-primary-800 text-lg font-bold leading-none">
                ${box.formattedBoxPrice}
              </h1>
              <h1 className="text-primary-300 text-lg font-bold leading-none mt-1">
                per box
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-primary-800 text-lg font-bold">{box.name}</h1>
            <p className="text-primary-300 text-sm font-bold">
              {tokens?.length || 0} Purchased Boxes
            </p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <ul className="mt-5 space-y-4">
        {tokens.map((item) => (
          <li key={item.address} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative overflow-hidden">
                {/* Meme Logo */}
                <img
                  aria-label={`${item.name} Logo`}
                  src={item.logo_url}
                  className="rounded-full"
                />
                {/* Network */}
                <img
                  // biome-ignore lint/suspicious/noExplicitAny: Can't provide types for now
                  src={(cctpDomainMap as any)[item.domain_id]}
                  alt="Network"
                  className="w-3 h-3 rounded-full absolute right-0 bottom-0 outline outline-2 outline-white"
                />
              </div>
              <div>
                <p className="text-primary-700 font-bold leading-none">
                  {item.name}
                </p>
                <p className="text-primary-400 font-bold text-xs mt-1 leading-none">
                  {truncateAddress(item.address, 5)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-primary-700 font-bold leading-none">
                ${item.formattedUSDValue}
              </p>
              <p className="text-primary-400 font-bold text-xs mt-1 leading-none">
                {formatEther(item.amount)} {item.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex space-x-2 border-box">
        <Button className="mt-8 px-4 !w-11" variant={'outline'} size={'lg'}>
          <span className="text-primary-700 text-xl">-</span>
        </Button>
        <Button className="mt-8 w-fit border-b-4 h-11 w-full" size={'lg'}>
          Buy 1 Box <span className="text-primary-100">$1.2</span>
        </Button>
        <Button className="mt-8 px-4 w-11" variant={'outline'} size={'lg'}>
          <span className="text-primary-700 text-xl">+</span>
        </Button>
      </div>
    </div>
  );
}
