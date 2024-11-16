export default function Onboarding() {
  return (
    <div className="h-screen w-full flex flex-col items-center content-between justify-between ">
      <div className="flex justify-center items-center">
        <img
          src="/onboarding-illustration.png"
          alt="Onboarding DegenBox Illustration"
          className="h-full w-full"
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
          Onramp to your Base Smart Wallet, buy memecoins from Ethereum and
          Solana simultaneously.
        </h2>
      </div>

      <div className="flex flex-col w-screen px-4 items-center justify-center">
        <button className="w-full h-14 inline-flex items-center justify-center h-13 px-5 border border-[#3770B6] rounded-sm text-base text-[#ffffff] fill-[#ffffff] font-bold transition-colors bg-[#A8CFFF] hover:bg-[#AE7AFF]/90">
          Sign-in
        </button>
        <span>Continue as guest</span>
      </div>
    </div>
  );
}
