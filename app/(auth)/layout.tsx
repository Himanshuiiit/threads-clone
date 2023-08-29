import { ClerkProvider } from "@clerk/nextjs";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";

import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thread clone",
  description: "Thread clone",
};

const inter: NextFont = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
