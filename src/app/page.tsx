"use client";

import { StickyBottomNavbar } from "@/components/sticky-bottom-navbar";
import { useAccount } from "wagmi";
import Onboarding from "../components/Onboarding";
import BoxIcon from "@/public/icons/box.svg";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { address } = useAccount();

  return (
    <div>
      {!address ? (
        <Onboarding />
      ) : (
        <>
          <Heading />
          <div className="px-6 w-full min-h-full py-4 mt-8">
            <div className="flex space-x-2.5 mb-4">
              <div className="w-full rounded-full h-2 bg-primary-300" />
              <div className="w-full rounded-full h-2 bg-primary-300 opacity-25" />
              <div className="w-full rounded-full h-2 bg-primary-300 opacity-25" />
            </div>
            <BoxList />
          </div>
          <StickyBottomNavbar />
        </>
      )}
    </div>
  );
}

function Heading() {
  const { address } = useAccount();
  return (
    <div className="w-full relative">
      <img src="/rainbow-header.svg" className="w-full" alt="Rainbow header" />

      <div className="absolute top-0 left-0 right-0 flex flex-col items-center w-full pt-8">
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

            <div className="flex py-1 px-2.5 items-center justify-center rounded-full text-md font-medium bg-primary-400 text-center text-white">
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm">Top Up</span>

                  <img
                    src="/icons/plus.svg"
                    className="w-4 h-4"
                    alt="Plus icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const data = [
  {
    name: "POPCAT",
    id: "0xbF8A...C637",
    percentage: 50,
    amount: "4.51M",
    domain_id: 5,
    icon_url: "https://s2.coinmarketcap.com/static/img/coins/64x64/28782.png", // Siamese cat icon with purple badge
  },
  {
    name: "MOG",
    id: "0xbF8A...C637",
    percentage: 12.5,
    amount: "4.52M",
    domain_id: 0,
    icon_url: "https://s2.coinmarketcap.com/static/img/coins/64x64/27659.png", // Blue and yellow cat icon
  },
  {
    name: "SPX",
    id: "0xbF8A...C637",
    percentage: 11.5,
    amount: "4.52M",
    domain_id: 0,
    icon_url: "https://s2.coinmarketcap.com/static/img/coins/64x64/28081.png", // Yellow circular logo
  },
  {
    name: "BITCOIN",
    id: "0xbF8A...C637",
    percentage: 11.5,
    amount: "4.52M",
    domain_id: 0,
    icon_url: "https://s2.coinmarketcap.com/static/img/coins/64x64/25220.png", // Retro-style pixel art icon
  },
  {
    name: "BRETT",
    id: "0xbF8A...C637",
    percentage: 14.5,
    amount: "4.52M",
    domain_id: 6,
    icon_url: "https://s2.coinmarketcap.com/static/img/coins/64x64/29743.png", // Blue pepe-style icon
  },
];

function BoxList() {
  const cctpDomainMap = {
    0: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    5: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
    6: "https://s2.coinmarketcap.com/static/img/coins/64x64/27716.png",
  };

  return (
    <div className="relative w-full !h-[58vh] border border-primary-100 rounded-lg px-3 py-2.5">
      {/* Card Header */}
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col items-start">
          <div className="bg-primary-200 size-12 flex items-center justify-center rounded-lg overflow-hidden">
            <BoxIcon
              src="/icons/box.svg"
              className="w-8 h-8 stroke-primary-600"
              alt="Box icon"
            />
          </div>
          <h1 className="text-primary-800 text-lg font-bold mt-2">Boxes</h1>
          <p className="text-primary-300 text-sm font-bold">
            1000+ Purchased Boxes
          </p>
        </div>
        <div className="text-right">
          <h1 className="text-primary-800 text-lg font-bold leading-none">
            $130
          </h1>
          <h1 className="text-primary-300 text-lg font-bold leading-none mt-1">
            per box
          </h1>
        </div>
      </div>

      {/* Card Body */}
      <ul className="mt-5 space-y-4">
        {data.map((item) => (
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative overflow-hidden">
                {/* Meme Logo */}
                <img src={item.icon_url} className="rounded-full" />
                {/* Network */}
                <img
                  src={(cctpDomainMap as any)[item.domain_id]}
                  className="w-3 h-3 rounded-full absolute right-0 bottom-0 outline outline-2 outline-white"
                />
              </div>
              <div>
                <p className="text-primary-700 font-bold text-lg leading-none">
                  {item.name}
                </p>
                <p className="text-primary-400 font-bold text-xs mt-1 leading-none">
                  {item.id}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-primary-700 font-bold text-lg leading-none">
                {item.percentage}%
              </p>
              <p className="text-primary-400 font-bold text-xs mt-1 leading-none">
                {item.amount} {item.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-2.5 inset-x-0 flex justify-center space-x-2 px-3">
        <Button className="mt-8 font-black h-11 w-11 bg-white border-b-4">
          <span className="text-primary-700 text-xl">-</span>
        </Button>
        <Button className="mt-8 w-full font-black border-b-4" size={"lg"}>
          Buy 1 Box <span className="text-primary-100">$1.2</span>
        </Button>
        <Button className="mt-8 font-black h-11 w-11 bg-white border-b-4">
          <span className="text-primary-700 text-xl">+</span>
        </Button>
      </div>
    </div>
  );
}
