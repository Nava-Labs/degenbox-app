'use client';

import { StickyBottomNavbar } from '@/components/sticky-bottom-navbar';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import Onboarding from '../components/Onboarding';
import BoxIcon from '@/public/icons/box.svg';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import TopUpButton from '../components/TopUpButton';
import { formatEther } from 'ethers';
import { cn, formatCurrency, truncateAddress } from '../lib/utiles';
import Loading from '@/public/loading.svg';
import RainbowHeader from '@/public/rainbow-header.svg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { useMemo, useState } from 'react';
import { TransactionModal } from '../components/TransactionModal';
import { USDC_ABI } from '../lib/abi/usdc.abi';
import { formatUnits } from 'viem';
import { DegenBoxABI } from '../lib/abi/degen-box.abi';
import React from 'react';
import { useBalance } from 'wagmi';
// import { Identity, Name } from '@coinbase/onchainkit/identity';

import {
  Abstraxion,
  useAbstraxionAccount,
  useModal
} from "@burnt-labs/abstraxion";
import Waitlist from '../components/Waitlist';

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

// import { Button } from "@burnt-labs/ui";


export default function Page() {
  // const { address } = useAccount();
  // const address = "0x2d7e2DF65C1B06fa60FAf2a7D4C260738BB553D9"
  const { data:  { bech32Address } , isConnected, isConnecting } = useAbstraxionAccount();
  console.log("addresssss ", bech32Address)

  const [api, setApi] = React.useState<CarouselApi>();

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

  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-primary-50">
        <Loading className="w-24 h-24 text-primary-200" />
      </div>
    );
  }

  if (error) {
    console.log("what is error ", error)
    return <div>Error fetching boxes</div>;
  }

  return (
    <div>
      {bech32Address ? (
        <>
          <Heading />
          <div className="px-6 w-full min-h-full pt-8 pb-20 bg-white">
            {!boxes && <li>No Boxes Found</li>}
            {!!boxes && (
              <>
                <div className="flex space-x-2.5 mb-2">
                  {Array(count)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={_}
                        className={cn(
                          'w-full rounded-full h-1.5 bg-primary-500 transition-opacity duration-300',
                          index === current - 1 ? 'opacity-100' : 'opacity-25',
                        )}
                      />
                    ))}
                </div>
                <Carousel setApi={setApi} opts={{ loop: true }}>
                  <CarouselContent>
                    {boxes.map((box) => (
                      <CarouselItem
                        key={box.id}
                        // onSelect={(index) => {
                        //   console.log(index);
                        //   setCurrentIndex(index);
                        // }}
                      >
                        <BoxList box={box} tokens={box.token_list} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </>
            )}
          </div>
          <StickyBottomNavbar />
        </>
      ) 
      
      : (
        // <Onboarding />
        <Waitlist/>
      )}
    </div>
  );
}

function Heading() {
  // const { address } = useAccount();
  const { data: { bech32Address }} = useAbstraxionAccount();

  let { data: usdcBalance } = useBalance({
    address: "0x2d7e2DF65C1B06fa60FAf2a7D4C260738BB553D9",
    token: USDC_ADDRESS,
  });
  // usdcBalance = 0;
  return (
    <div className="w-full relative">
      <RainbowHeader className="w-full" />

      <div className="absolute top-[10%] left-0 right-0 flex flex-col items-center w-full">
        <div className="flex z-10 px-3 py-0.5 items-center justify-center rounded-full text-xs font-black bg-[#C2E6F5] border border-b-4 border-l-2 border-r-2 border-primary-900 text-center text-primary-900 shadow-sm">
          Welcome 👋🏼
        </div>

        <div className="flex px-0 -mt-1.5 font-bold items-center justify-center rounded-full text-[10px] bg-[#C2E6F5] border-2 border-primary-900 text-center text-primary-900">
          {/* <Identity address={address} className="bg-transparent">
            <Name className="text-xs" />
          </Identity> */}
          {bech32Address}
        </div>

        <div className="flex flex-col space-y-1 items-center justify-center px-4 mt-2 leading-none w-28">
          <h1 className="font-black text-center text-4xl h4-shadow leading-none">
            Discover
          </h1>
          <h1 className="font-black text-center text-4xl h4-shadow leading-none">
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
                0 USDC
              </span>
            </div>

            <TopUpButton />
          </div>
        </div>
      </div>
    </div>
  );
}

const USDC_ADDRESS = '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913';
function BoxList({ box, tokens }: { box: Box; tokens: Token[] }) {
  const [amount, setAmount] = useState<number>(1);
  const { address } = useAccount();

  const [showModal, setShowModal] = useModal();
  console.log("showModal:", showModal, "setShowModal:", setShowModal, useModal);
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
  console.log("bechh ", bech32Address)

  // const { data: allowance } = useReadContract({
  //   address: USDC_ADDRESS as `0x${string}`,
  //   abi: USDC_ABI,
  //   functionName: 'allowance',
  //   // biome-ignore lint/style/noNonNullAssertion: this is the simplest way
  //   args: [address!, box.address as `0x${string}`],
  // });

  const { data: hash, isPending, writeContract } = useWriteContract();

  // const isApproved = useMemo(() => {
  //   const formattedAllowance = formatUnits(allowance ?? BigInt(0), 6);
  //   return +formattedAllowance >= +amount;
  // }, [amount, allowance]);

  const tokenPrices = useMemo(
    () =>
      tokens
        .filter((token) => +token.domain_id !== 5) // do not include solana token
        .map((token) => BigInt(token.pricePerToken)),
    [tokens],
  );

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
                {formatEther(BigInt(item.amount))} {item.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex space-x-2 border-box">

        <Button
          className="mt-8 px-4 !w-11"
          variant={'outline'}
          size={'lg'}
          onClick={() => setAmount(amount - 1)}
          disabled={amount === 1}
        >
          <span className="text-primary-700 text-xl">-</span>
        </Button>
        {/* {!isApproved && (
          <Button
            size={'lg'}
            className="flex justify-center items-center mt-8 w-fit border-b-4 h-11 w-full text-lg"
            onClick={() => {
              writeContract({
                address: USDC_ADDRESS as `0x${string}`,
                abi: USDC_ABI,
                functionName: 'approve',
                args: [
                  box.address as `0x${string}`,
                  BigInt(
                    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                  ),
                ],
              });
            }}
          >
            {isPending ? <span>Approving...</span> : <span>Buy Box</span>}
          </Button>
        )}
        {!!isApproved && ( */}
          <Button
            size={'lg'}
            className="flex justify-center items-center mt-8 w-fit border-b-4 h-11 w-full text-lg"
            onClick={() => {
              console.log({ boxPrice: box.boxPrice, prices: tokenPrices });
              writeContract({
                address: box.address as `0x${string}`,
                abi: DegenBoxABI,
                functionName: 'buyBox',
                args: [BigInt(amount), BigInt(box.boxPrice), tokenPrices],
              });
            }}
          >
            <span>Buy {amount} Box </span>
            <span className="text-primary-100 text-sm">
              ${formatCurrency(Number(box.formattedBoxPrice) * amount)}
            </span>
          </Button>
        {/* )} */}
        <Button
          className="mt-8 px-4 w-11"
          variant={'outline'}
          size={'lg'}
          onClick={() => setAmount(amount + 1)}
        >
          <span className="text-primary-700 text-xl">+</span>
        </Button>
      </div>

      {/* {!!txHash && ( */}
      <TransactionModal txHash={hash} />
      {/* )} */}
    </div>
  );
}
