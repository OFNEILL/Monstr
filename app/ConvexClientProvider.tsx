"use client";

import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

// const convex = new ConvexReactClient(process.env.CONVEX_URL!);
const convex = new ConvexReactClient(
  "https://festive-sturgeon-235.convex.cloud",
);

export function ConvexClientProvider({
  children,
  authRequired,
}: {
  children: ReactNode;
  authRequired?: boolean;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {!authRequired ? (
        <>{children}</>
      ) : (
        <>
          <Authenticated>{children}</Authenticated>
          <Unauthenticated>
            <RedirectToSignIn />
          </Unauthenticated>
        </>
      )}
    </ConvexProviderWithClerk>
  );
}
