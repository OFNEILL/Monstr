import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ConvexClientProvider } from "@/app/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Sidebar } from "@/components/sidebar";
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
        <body className={`${inter.className} h-screen w-screen`}>
          <ConvexClientProvider>
            <Sidebar>{children}</Sidebar>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
