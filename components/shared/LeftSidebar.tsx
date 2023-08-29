"use client";

import { sidebarLinks } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { SignOutButton, SignedIn, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LeftSidebar({ currUserId }: { currUserId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetchUser(currUserId);
      setUser(userInfo);
    };
    getUser();
  }, []);

  return (
    <section
      className="custom-scrollbar 
        leftsidebar"
    >
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          let isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.label === "Profile")
            isActive = pathname.split("/")[2] === currUserId;

          return (
            <Link
              href={
                link.label === "Profile" ? `/profile/${user?.id}` : link.route
              }
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="signout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
