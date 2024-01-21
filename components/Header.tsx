"use client";
import { Clapperboard, Home, Search, Tv } from "lucide-react";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  icon: React.ReactNode;
  image?: boolean;
  href: string;
}[];

function Header({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const data: Props = [
    {
      icon: (
        <Image
          src={"/Disney-Hotstar.svg"}
          alt="Disney Hotstar Logo"
          width={180}
          height={37}
          priority
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert  cursor-pointer "
        />
      ),
      image: true,
      href: "/",
    },

    {
      icon: (
        <Search
          size={22}
          className={pathname === "/search" ? `text-white` : "text-gray-400"}
        />
      ),
      href: "/search",
    },
    {
      icon: (
        <Home
          size={22}
          className={pathname === "/" ? `text-white` : "text-gray-400"}
        />
      ),
      href: "/",
    },
    {
      icon: (
        <Tv
          size={22}
          className={pathname === "/tv" ? `text-white` : "text-gray-400"}
        />
      ),
      href: "/tv",
    },
    {
      href: "/movies",
      icon: (
        <Clapperboard
          size={22}
          className={pathname === "/movies" ? `text-white` : "text-gray-400"}
          fill="currentColor"
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row scrollbar-hide ">
      <div
        className="fixed bottom-1 w-[95%] lg:left-0 lg:bg-transparent dark:text-white lg:h-screen lg:w-16 flex items-center lg:justify-center lg:flex-col z-[100]  
         bg-gradient-to-r from-gray-900/70 to-transparent dark:from-gray-900/0 dark:to-transparent bg-[#020817]/90 rounded-[20px] h-[60px] justify-evenly m-[10px] lg:m-0 lg:px-0  self-center lg:self-start"
      >
        {data.map((item, index) => {
          return (
            <Link
              href={item.href}
              key={index}
              className={`${
                item.image ? "hidden lg:flex" : "flex"
              } items-center lg:mb-7 mb-2 p-2 cursor-pointer `}
            >
              {item.icon}
            </Link>
          );
        })}
      </div>
      <div className="w-full h-screen">{children}</div>
    </div>
  );
}

export default Header;
