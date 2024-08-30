"use client";

import { openConversation } from "@/convex/conversation";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <button
        className="bg-white border border-white px-4 py-4"
        onClick={() => {
          openConversation();
        }}
      />
    </div>
  );
}
