"use client";

import { StickyBottomNavbar } from "@/components/sticky-bottom-navbar";
import { TradingCard } from "@/components/trading-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useAccount } from "wagmi";

export default function Portfolio() {
  const { address } = useAccount();

  return (
    <div className="h-screen w-svw px-6 pt-12">
      <Label className="text-primary-800 text-2xl font-black">Profile</Label>

      <div className="flex flex-col w-full mt-3 gap-2">
        <div className="flex w-full flex-col p-3 items-center bg-primary-100 border border-primary-400 rounded-lg">
          <div className="flex w-full gap-2 items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary-800 truncate max-w-32">
                {address}
              </span>
            </div>
          </div>

          <div className="flex w-full justify-end items-center gap-3 mt-5">
            <div className="flex gap-1">
              <img src="/icons/copy.svg" className="h-4 w-4" />
              <span className="text-xs font-bold text-primary-900">
                Copy Address
              </span>
            </div>
            <div className="flex gap-1">
              <img src="/icons/external-link.svg" className="h-4 w-4" />
              <span className="text-xs font-bold text-primary-900">
                Open Explorer
              </span>
            </div>
          </div>
        </div>

        <Button
          variant={"outline"}
          className="flex gap-1 text-primary-500 !rounded-full h-7 w-full border border-b-2 border-primary-300"
        >
          <span className="font-black text-xs">Fund Wallet</span>
          <Plus className="h-2 w-2" />
        </Button>
      </div>

      <TradingCard />

      <StickyBottomNavbar />
    </div>
  );
}
