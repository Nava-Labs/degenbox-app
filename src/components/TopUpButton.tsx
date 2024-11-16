"use client";

import { FundButton, getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { useAccount } from "wagmi";

export default function TopUpButton() {
  const projectId = "16a735ec-e40f-491e-9d1d-c295b2a03138";
  const { address } = useAccount();

  const onrampBuyUrl = getOnrampBuyUrl({
    projectId,
    addresses: { [address as string]: ["base"] },
    assets: ["USDC"],
    presetFiatAmount: 20,
    fiatCurrency: "USD",
  });
  return (
    <FundButton
      fundingUrl={onrampBuyUrl}
      className="flex py-1 px-2.5 items-center justify-center rounded-full text-md shadow border border-primary-500 font-medium bg-primary-400 text-center text-white focus hover:bg-primary-400 hover:translate-y-0 active:border-b active:translate-y-1 transition-all duration-75 ease-in-out"
    />
  );
}
