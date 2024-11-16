import { Button } from "@/components/ui/button";

export default function Onboarding() {
  return (
    <div className="h-screen w-full flex flex-col items-center content-between">
      <div className="flex justify-center items-center h-[50vh] overflow-hidden mt-10">
        <img
          src="/onboarding-illustration.png"
          alt="Onboarding DegenBox Illustration"
          className="h-[90%] w-full object-cover"
        />
      </div>

      <div className="flex flex-col space-y-2 w-screen px-4 items-center justify-center">
        <div className="relative">
          <h1 className="font-black text-left text-5xl heading-shadow">
            Buy memecoins from multiple chains easily
          </h1>
          <h1 className="font-black text-left text-5xl text-primary-600 absolute top-0 -z-10 -translate-x-0.5 translate-y-0.5">
            Buy memecoins from multiple chains easily
          </h1>
        </div>
        <h2 className="text-left text-foreground">
          Onramp to your Base Smart Wallet, buy memecoins from any chain.
        </h2>
      </div>

      <div className="flex flex-col w-screen px-4 items-center justify-end fixed bottom-8">
        <Button className="hover:translate-y-0 active:translate-y-1 shadow-sm hover:shadow-lg active:shadow-inner transition-all duration-75 ease-in-out">
          Sign-in
        </Button>
        <span className="mt-1">Continue as guest</span>
      </div>
    </div>
  );
}
