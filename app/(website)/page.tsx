"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SparklesIcon } from "lucide-react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const movingSpanRef = useRef<HTMLSpanElement>(null);
  const [activeLiRef, setActiveLiRef] = useState(null);

  const handleClick = (e, liRef) => {
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
    setActiveLiRef(document.getElementById("home"));
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
        <div className="flex justify-center items-center w-full sticky top-2">
          <div className="p-1.5 bg-zinc-900 rounded-3xl border border-zinc-800 w-fit flex gap-14 select-none">
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
            <div className="bg-white rounded-2xl text-black px-3.5 flex justify-center items-center text-sm">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <Link
                  href="/app"
                  className="w-full h-full flex justify-center items-center"
                >
                  Go to App
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-10 items-center z-10">
          <span className="flex items-center justify-center bg-zinc-900 rounded-3xl border border-zinc-800 w-fit px-2 text-sm">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Under construction
          </span>
          <div className="flex w-full justify-between">
            <div className="text-8xl">
              Place for <br /> monsers and <br /> humans alike.
            </div>
            <div className="flex-grow">
              <div className="w-full aspect-auto">
                <Image
                  src="/555f87795345903927ab2b2603a20fa0.png"
                  alt="Monstr logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-96 h-72 rounded-full bg-[#d3f806] absolute blur-[150px] opacity-95 top-15/100 -left-50/100" />
      </div>
    </div>
  );
}
