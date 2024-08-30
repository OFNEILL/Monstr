"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// const convex = new ConvexReactClient(process.env.CONVEX_URL!);
const convex = new ConvexReactClient(
  "https://festive-sturgeon-235.convex.cloud",
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
