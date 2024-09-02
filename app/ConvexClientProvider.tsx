"use client";

import { RedirectToSignUp, useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  ConvexProvider,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

// const convex = new ConvexReactClient(process.env.CONVEX_URL!);
const convex = new ConvexReactClient(
  "https://festive-sturgeon-235.convex.cloud",
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <RedirectToSignUp />
      </Unauthenticated>
    </ConvexProviderWithClerk>
  );
}
