"use client";

import {
  ChevronRightIcon,
  PanelLeftIcon,
  SendIcon,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <motion.div
        className={cn(
          "max-w-72 flex flex-col border-r border-r-zinc-900 h-full justify-between",
          collapsed ? "w-fit" : "w-72",
        )}
        animate={{ width: collapsed ? 64 : 288 }} // 64px when collapsed, 288px (72 * 4) when expanded
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="border-b-zinc-900 border-b-2 border-dotted flex items-center justify-between px-4 py-3.5">
          <span
            className={cn(
              "flex items-center justify-center gap-2",
              collapsed && "cursor-pointer",
            )}
            onClick={() => {
              collapsed && setCollapsed(false);
            }}
          >
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
            <AnimatePresence>
              {!collapsed && (
                <motion.h1
                  className="text-sm font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  Monstr
                </motion.h1>
              )}
            </AnimatePresence>
          </span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="border border-zinc-900 p-1.5 rounded-full cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <PanelLeftIcon size={16} strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div
          className={cn(
            "flex flex-grow flex-col gap-2",
            collapsed ? "px-3.5 py-2" : "p-2",
          )}
        >
          <span
            className={cn(
              "flex gap-2 bg-slate-50 rounded-md px-2 text-sm text-black items-center cursor-pointer",
              !collapsed
                ? "py-1.5"
                : "py-2 flex items-center justify-center aspect-square max-w-9 max-h-9",
            )}
          >
            <SendIcon size={collapsed ? 20 : 16} strokeWidth={1.5} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  Messages
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <span
            className={cn(
              "flex gap-2 bg-slate-50 rounded-md px-2 text-sm text-black items-center cursor-pointer",
              !collapsed
                ? "py-1.5"
                : "py-2 flex items-center justify-center aspect-square max-w-9 max-h-9",
            )}
          >
            <VideoIcon size={collapsed ? 20 : 16} strokeWidth={1.5} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  Video
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>
        <div
          className="border-t-zinc-900 border-t-2 border-dotted flex items-center justify-between px-4 py-3.5 cursor-pointer"
          onClick={() => {
            const userButton = document.querySelector(".cl-userButtonTrigger");
            if (userButton) {
              (userButton as HTMLButtonElement).click();
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
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-semibold">{user?.username}</p>
                  <p className="text-xs font-normal text-zinc-500">
                    {user?.emailAddresses[0].emailAddress}
                  </p>
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="p-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRightIcon size={16} strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {children}
    </div>
  );
}
