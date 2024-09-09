"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SparklesIcon } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const movingSpanRef = useRef<HTMLSpanElement>(null);
  const [activeLiRef, setActiveLiRef] = useState(null);

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    liRef: any,
  ) => {
    setActiveLiRef(liRef);
  };

  useEffect(() => {
    if (activeLiRef && movingSpanRef.current) {
      const liRect = (activeLiRef as HTMLLIElement).getBoundingClientRect();
      const ulRect = (
        activeLiRef as HTMLLIElement
      )?.parentElement?.getBoundingClientRect();

      movingSpanRef.current.style.left = `${liRect.left - ulRect!.left - 10}px`;
      movingSpanRef.current.style.display = "flex";
      movingSpanRef.current.style.width = `${liRect.width + 20}px`;
    }
  }, [activeLiRef]);

  useEffect(() => {
    setActiveLiRef(document.getElementById("home") as any);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden grid">
      <div className="absolute inset-0 z-0 opacity-45 [filter:url('#grainy')]" />
      <svg className="hidden">
        <filter id="grainy">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.42"
            stitchTiles="stitch"
          />
        </filter>
      </svg>

      <div className="h-full w-full max-w-screen-xl flex flex-col justify-self-center gap-14">
        <div className="flex justify-center items-center w-full sticky top-2 z-20">
          <div className="p-1.5 bg-zinc-900 rounded-3xl border border-zinc-800 bg-opacity-65 w-fit flex gap-14 select-none">
            <div className="flex gap-2 justify-center items-center">
              <span className="overflow-hidden w-8 aspect-square rounded-full">
                <Image
                  src="/monstr.jpg"
                  alt="Monstr logo"
                  width={0}
                  height={0}
                  className="w-full h-full object-cover"
                  sizes="100vw"
                />
              </span>
              <span>Monstr</span>
            </div>
            <ul className="flex gap-5 justify-center items-center text-sm relative">
              <li
                className="cursor-pointer z-10"
                id="home"
                onClick={(e) => handleClick(e, e.currentTarget)}
                ref={activeLiRef === "Home" ? activeLiRef : null}
              >
                Home
              </li>
              <li
                className="cursor-pointer z-10"
                id="features"
                onClick={(e) => handleClick(e, e.currentTarget)}
                ref={activeLiRef === "Features" ? activeLiRef : null}
              >
                Features
              </li>
              <li
                className="cursor-pointer z-10"
                id="about"
                onClick={(e) => handleClick(e, e.currentTarget)}
                ref={activeLiRef === "About" ? activeLiRef : null}
              >
                About
              </li>
              <li
                className="cursor-pointer z-10"
                id="support"
                onClick={(e) => handleClick(e, e.currentTarget)}
                ref={activeLiRef === "Support" ? activeLiRef : null}
              >
                Support
              </li>
              <span
                ref={movingSpanRef}
                className={cn(
                  "bg-zinc-950/60 border border-zinc-950/60 rounded-2xl h-full absolute transition-all duration-300 top-0 left-0 hidden",
                )}
              />
            </ul>
            <SignedOut>
              <div className="bg-white rounded-2xl text-black px-3.5 flex justify-center items-center text-sm">
                <SignInButton />
              </div>
            </SignedOut>
            <SignedIn>
              <Link
                href="/app"
                className="bg-white rounded-2xl text-black px-3.5 flex justify-center items-center text-sm"
              >
                Go to App
              </Link>
            </SignedIn>
          </div>
        </div>

        <div className="flex flex-col w-full gap-10 items-center z-10 max-h-[calc(100dvh-102px)]">
          <span className="flex items-center justify-center bg-zinc-900 rounded-3xl border border-zinc-800 w-fit text-xs font-semibold px-2.5 py-0.5">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Under construction
          </span>
          <div className="flex w-full justify-between flex-col gap-36">
            <span className="flex justify-center items-center flex-col gap-10">
              <div className="text-6xl text-center">
                A place for Monsters <br /> and Humans alike.
              </div>
              <p className="text-center text-zinc-400 opacity-85">
                Monstr is a web-based chat application that allows users to{" "}
                <br /> create and join disposable chat rooms.
              </p>
            </span>
            <div className="flex-grow flex justify-center flex-row-reverse gap-24">
              <span className="-mt-10">
                <div className="w-full aspect-auto max-w-56 rotate-12">
                  <Image
                    src="/monstr-chat.png"
                    alt="Monstr logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </span>
              <div className="w-full aspect-auto max-w-56 -rotate-12">
                <Image
                  src="/monstr-home.png"
                  alt="Monstr logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-96 h-72 rounded-full bg-[#d3f806] absolute blur-[150px] opacity-95 top-15/100 -left-50/100" />
        <div className="w-96 h-72 rounded-full bg-[#022fe8] absolute blur-[150px] opacity-95 top-28 left-52" />
      </div>
    </div>
  );
}
