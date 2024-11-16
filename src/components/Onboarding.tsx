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
        <h1 className="font-bold text-left text-5xl text-[#A8CFFF] drop-shadow-[0_4px_4px_rgba(55, 112, 182, 0.6)]">
          Buy memecoins from multiple chains easily
        </h1>
        <h2 className="text-left text-primary">
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
