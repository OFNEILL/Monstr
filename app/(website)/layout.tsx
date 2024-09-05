import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monstr",
  description:
    "Monstr is a social media platform for monsters and humans alike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <body className={inter.className}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
