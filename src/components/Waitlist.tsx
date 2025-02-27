import { Button } from "@/components/ui/button";
// import WalletWrapper from "./WalletWrapper";
// import {
//   ConnectWallet,
//   ConnectWalletText,
//   Wallet,
// } from "@coinbase/onchainkit/wallet";
// "use client";

import { cn } from "../lib/utiles";

import {
  Abstraxion,
  useAbstraxionAccount,
  useModal
} from "@burnt-labs/abstraxion";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
// import {HeaderPhysics} from "./HeaderPhysics";
import HeaderPhysics from "./HeaderPhysics";

export default function Waitlist() {

  const [, setShowModal]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useModal();
  const { data: { bech32Address }, isConnected, isConnecting } = useAbstraxionAccount();
  // console.log("bechh ", bech32Address)

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

      console.log("Error ", error, count)
      setWaitlistCount(count || 5500);
      // setWaitlistCount(55000);
    };

    fetchCount();
  }, []);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleWhitelist = async () => {
    if (!isValidEmail(email)) {
      setMessage("Incorrect email format");
      return;
    }


    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { email },
      ]).select()

    if (error) {
      if (error.message.includes("waitlist_email_key")) {
        setMessage("This email is already on the waitlist");
      } else {
        setMessage("Error adding email: " + error.message);
      }
    } else {
      setMessage("Email added to waitlist!");
      setEmail("");
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#EFF6FF]">
      <div className="flex justify-center items-center overflow-hidden bg-[#EFF6FF]">
        {/* <img
          src="/cover-waitlist2.png"
          alt="Waitlist DegenBox Illustration"
          className="h-full object-cover"
        /> */}
        <HeaderPhysics />
      </div>

      <div className="flex flex-col space-y-2 px-4 pt-5 pb-8">
        <div className="relative">
          <h1 className="font-black text-left text-5xl heading-shadow">
            Buy memecoins from multiple chains easily
          </h1>
          <h1 className="font-black text-left text-5xl text-primary-600 absolute top-0 -z-10 -translate-x-0.5 translate-y-0.5">
            Buy memecoins from multiple chains easily
          </h1>
        </div>
        <h2 className="text-left text-foreground text-lg font-medium">
          Onramp to your XION Account, buy memecoins from any chain without knowing you're in blockchain.
        </h2>

        <div className="flex flex-col items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          />
          <Button
            onClick={handleWhitelist}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xl font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "bg-primary-400 text-primary-foreground border border-[#3770B6] border-b-[8px]",
              "hover:translate-y-0 active:border-b active:translate-y-1 transition-all duration-75 ease-in-out",
              "w-full h-16 px-4 py-2 rounded-2xl",
            )}
          // onClick={() => setShowModal(true)}
          // structure="base"
          >
            Join Waitlist
          </Button>
          {message && (
            <p className={`${message === "Email added to waitlist!" ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
          <a
            href="https://drive.google.com/file/d/1NeHuNgBS_auY-ntNVwenhgnorskP7Qx1/view"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center group"
          >
            <span>Watch Demo</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">&nbsp;→</span>
          </a>

          {/* waitlist */}
          <div className="w-full mt-8 space-y-3">
            <div className="flex items-center text-primary-600">
              <span className="font-medium">
                <span className="text-l font-bold">{waitlistCount}</span>
                <span className="text-sm"> users have joined waitlist</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-primary-100 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-primary-400 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((waitlistCount / 10000) * 100, 100)}%`,
                  transition: 'width 1s ease-in-out'
                }}
              />
              {/* Cute logo at progress bar tip */}
              <div
                className="absolute top-0 h-full transition-all duration-500 z-10"
                style={{
                  left: `calc(${Math.min((waitlistCount / 10000) * 100, 100)}% - 16px)`,
                }}
              >
                <img
                  src="/icons/cute-degen.png"
                  alt="Progress Indicator"
                  className="h-full w-auto"
                />
              </div>
            </div>

            {/* Milestones */}
            <div className="relative w-full">
              {/* Milestone markers */}
              <div className="flex justify-between mt-1">
                {[0, 2500, 5000, 7500, 10000].map((milestone, index) => (
                  <div key={milestone} className="flex flex-col items-center">
                    <span className={`text-xs font-medium ${waitlistCount >= milestone ? 'text-primary-600' : 'text-gray-400'}`}>
                      {milestone === 0 ? '0' : `${milestone / 1000}K`}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rewards */}
              <div className="flex justify-between mt-1">
                {[10, 10, 10, 20, 30].map((reward, index, arr) => {
                  const milestones = [0, 2500, 5000, 7500, 10000];
                  const currentMilestone = milestones[index];
                  const nextMilestone = milestones[index + 1] || Infinity;
                  const isActive = waitlistCount >= currentMilestone;
                  const isNext = waitlistCount < nextMilestone && waitlistCount >= currentMilestone;

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`flex items-center gap-1 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                        <img
                          src="/icons/box.svg"
                          alt="Box Reward"
                          className={`w-4 h-4 ${isNext ? 'animate-pulse' : ''}`}
                        />
                        <span className={`text-xs font-bold ${isActive ? 'text-primary-600' : 'text-gray-400'}`}>
                          x{reward}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-screen px-4 items-center justify-end fixed bottom-4">

        {/* <Button
            fullWidth
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xl font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "bg-primary-300 text-primary-foreground border border-[#3770B6] border-b-[8px]",
              "hover:bg-primary-400 hover:translate-y-0 active:border-b active:translate-y-1 transition-all duration-75 ease-in-out",
              "w-full h-16 px-4 py-2 rounded-2xl",
            )}
            onClick={() => setShowModal(true)}
            structure="base"
        >
          <WalletWrapper */}
        {/*     text="Sign in" */}
        {/*     className="w-full bg-transparent hover:translate-y-0 active:translate-y-1 shadow-sm hover:shadow-lg active:shadow-inner transition-all duration-75 ease-in-out" */}
        {/*   /> */}
        {/* </Button> */}
        {/* <span className="mt-1 text-md font-thin">Continue as guest</span> */}
      </div>
    </div>
  );
}
