import { Button } from "@/components/ui/button";
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDefault,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import SignupButton from "./SignupButton";
import WalletWrapper from "./WalletWrapper";

export default function Onboarding() {
  return (
    <div className="h-screen w-full flex flex-col items-center content-between">
      <div className="flex justify-center items-center h-[50vh] overflow-hidden pt-10 bg-[#EFF6FF]">
        <img
          src="/onboarding-illustration.png"
          alt="Onboarding DegenBox Illustration"
          className="h-[100%] w-full object-cover"
        />
      </div>

      <div className="flex flex-col space-y-2 w-screen px-4 items-center justify-center pt-5">
        <div className="relative">
          <h1 className="font-black text-left text-5xl heading-shadow">
            Buy memecoins from multiple chains easily
          </h1>
          <h1 className="font-black text-left text-5xl text-primary-600 absolute top-0 -z-10 -translate-x-0.5 translate-y-0.5">
            Buy memecoins from multiple chains easily
          </h1>
        </div>
        <h2 className="text-left text-foreground text-lg font-medium">
          Onramp to your Base Smart Wallet, buy memecoins from any chain.
        </h2>
      </div>

      <div className="flex flex-col w-screen px-4 items-center justify-end fixed bottom-8">
        <Button className="w-full hover:translate-y-0 active:translate-y-1 transition-all duration-75 ease-in-out">
          <WalletWrapper
            text="Sign in"
            className="w-full bg-transparent hover:translate-y-0 active:translate-y-1 shadow-sm hover:shadow-lg active:shadow-inner transition-all duration-75 ease-in-out"
          />
        </Button>
        <span className="mt-1 text-md font-thin">Continue as guest</span>
      </div>
    </div>
  );
}
