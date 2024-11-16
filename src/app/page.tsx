"use client";

import { StickyBottomNavbar } from "@/components/sticky-bottom-navbar";
import { useAccount } from "wagmi";
import Onboarding from "../components/Onboarding";

export default function Page() {
  const { address } = useAccount();

  return (
    <div className="min-h-screen w-full">
      {!address ? (
        <Onboarding />
      ) : (
        <>
          <div className="w-full relative">
            <img
              src="/rainbow-header.svg"
              className="w-full"
              alt="Rainbow header"
            />

            <div className="absolute top-0 left-0 right-0 flex flex-col items-center w-full pt-10">
              <div className="flex px-3 py-0.5 items-center justify-center rounded-full text-xs font-black bg-[#C2E6F5] border border-b-4 border-l-2 border-r-2 border-primary-900 text-center text-primary-900 shadow-sm">
                Welcome, navalabs.base.eth 👋🏼
              </div>

              <div className="flex px-3 py-0.5 font-bold items-center justify-center rounded-full text-[10px] bg-[#C2E6F5] border-2 border-primary-900 text-center text-primary-900">
                <span>{address}</span>
              </div>

              <div className="flex flex-col space-y-1 items-center justify-center px-4 mt-2 leading-none w-28">
                <h1 className="font-black text-center text-3xl h4-shadow text-primary-200 leading-none">
                  Discover
                </h1>
                <h1 className="font-black text-center text-3xl h4-shadow text-primary-200 leading-none">
                  Boxes
                </h1>
              </div>
            </div>

            <div className="absolute -bottom-[22px] w-full items-center justify-center">
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

          <StickyBottomNavbar />
        </>
      )}
    </div>
  );
}
