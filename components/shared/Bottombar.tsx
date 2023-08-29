"use client";

import { sidebarLinks } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Bottombar({ currUserId }: { currUserId: string }) {
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
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          var isActive =
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
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
