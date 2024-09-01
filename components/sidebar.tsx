"use client";

import { ChevronRightIcon, PanelLeftIcon, SendIcon } from "lucide-react";
import Image from "next/image";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export function Sidebar({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUser();
  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="w-72 max-w-72 flex flex-col border-r border-r-zinc-900 h-full justify-between">
        <div className="border-b-zinc-900 border-b-2 border-dotted flex items-center justify-between px-4 py-3.5">
          <span className="flex items-center justify-center gap-2">
            <span className="w-8 h-8 rounded-md overflow-hidden aspect-square">
              <Image
                src="/monstr.jpg"
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="object-cover w-full h-full"
              />
            </span>
            <h1 className="text-sm font-semibold">Monstr</h1>
          </span>
          <span className="border border-zinc-900 p-1.5 rounded-full">
            <PanelLeftIcon size={16} strokeWidth={1.5} />
          </span>
        </div>
        <div className="flex flex-grow flex-col gap-2 p-2">
          <span className="flex gap-2 bg-slate-50 rounded-md px-2 py-1.5 text-sm text-black items-center cursor-pointer">
            <SendIcon size={16} strokeWidth={1.5} />
            Messages
          </span>
        </div>
        <div
          className="border-t-zinc-900 border-t-2 border-dotted flex items-center justify-between px-4 py-3.5 cursor-pointer"
          onClick={() => {
            const userButton = document.querySelector(".cl-userButtonTrigger"); // Ensure this selector targets the UserButton component correctly
            if (userButton) {
              (userButton as HTMLButtonElement).click(); // Simulates a click on the UserButton to open the Clerk popup
            }
          }}
        >
          <span
            className="flex gap-2 justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>
            <span>
              <p className="text-sm font-semibold">{user?.username}</p>
              <p className="text-xs font-normal text-zinc-500">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </span>
          </span>
          <span className="p-2">
            <ChevronRightIcon size={16} strokeWidth={1.5} />
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
