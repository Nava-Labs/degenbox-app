'use client';

import { StickyBottomNavbar } from '@/components/sticky-bottom-navbar';
import { TradingCard } from '@/components/trading-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAbstraxionAccount } from '@burnt-labs/abstraxion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Portfolio() {
  // const { address } = useAccount();
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();

  return (
    <div className="px-6 pt-12 mb-20">
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
                {bech32Address}
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
            <div className="flex gap-1 items-center">
              <img src="/icons/external-link.svg" className="h-4 w-4" />
              <Link
                href={`https://explorer.burnt.com/xion-testnet-1/account/${bech32Address}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-xs font-bold text-primary-900">
                  Open Explorer
                </span>
              </Link>
            </div>
          </div>
        </div>

        <Button
          variant={'outline'}
          className="flex gap-1 text-primary-500 !rounded-full h-9 w-full border border-b-2 border-primary-300"
        >
          <span className="font-bold text-md">Fund Wallet</span>
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <TradingCard />

      <StickyBottomNavbar />
    </div>
  );
}
