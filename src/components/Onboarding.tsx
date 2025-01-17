import { Button } from "@/components/ui/button";

import { cn } from "../lib/utiles";

import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";

export default function Onboarding() {
  const [, setShowModal]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useModal();
  const {
    data: { bech32Address },
  } = useAbstraxionAccount();

  return (
    <div className="w-full flex flex-col items-center content-between">
      <div className="flex justify-center items-center overflow-hidden bg-[#EFF6FF]">
        <img
          src="/onboarding-illustration.png"
          alt="Onboarding DegenBox Illustration"
          className="h-full object-cover"
        />
      </div>

      <div className="flex flex-col space-y-2 min-h-screen px-4 pt-5 bg-white">
        <div className="relative">
          <h1 className="font-black text-left text-5xl heading-shadow">
            Buy memecoins from multiple chains easily
          </h1>
          <h1 className="font-black text-left text-5xl text-primary-600 absolute top-0 -z-10 -translate-x-0.5 translate-y-0.5">
            Buy memecoins from multiple chains easily
          </h1>
        </div>
        <h2 className="text-left text-foreground text-lg font-medium">
          Onramp to your XION Account, buy memecoins from any chain without
          knowing you're in blockchain.
        </h2>
      </div>

      <div className="flex flex-col w-screen px-4 items-center justify-end fixed bottom-4">
        <Button
          className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xl font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            "bg-primary-300 text-primary-foreground border border-[#3770B6] border-b-[8px]",
            "hover:bg-primary-400 hover:translate-y-0 active:border-b active:translate-y-1 transition-all duration-75 ease-in-out",
            "w-full h-16 px-4 py-2 rounded-2xl",
          )}
          onClick={() => setShowModal(true)}
        >
          {bech32Address ? (
            <div className="flex items-center justify-center">VIEW ACCOUNT</div>
          ) : (
            "Sign in"
          )}
        </Button>
        {bech32Address && (
          <div className="border-2 border-primary rounded-md p-4 flex flex-row gap-4">
            <div className="flex flex-row gap-6">
              <div>address</div>
              <div>{bech32Address}</div>
            </div>
          </div>
        )}
        <Abstraxion onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}
