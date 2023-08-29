import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";

import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "Thread clone",
  description: "Thread clone",
};

const inter: NextFont = Inter({ subsets: ["latin"] });

export default async function Layout({ children }: { children: React.ReactNode }) {
  const currUser = await currentUser();
  return (
    <ClerkProvider>
      <html lang="en" className="bg-dark-1">
        <body className={`${inter.className} bg-dark-1`}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar/>
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar/>
        </body>
      </html>
    </ClerkProvider>
  );
}
