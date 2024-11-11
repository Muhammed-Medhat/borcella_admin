"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { navLinks } from "@/lib/constants";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const TopSideBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div className=" static top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src="/logo.png" alt="borcelle-logo" width={150} height={70} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks?.map((link) => (
          <Link
            className={`flex gap-4 text-body-medium ${
              pathname == link.url && "text-blue-1"
            }`}
            href={link.url}
            key={link.label}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="relative flex gap-4 items-center">
        <Menu
          className=" cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div
            className=" absolute top-10 right-6 flex flex-col gap-8 
          p-5 bg-white shadow-xl rounded-lg"
          >
            {navLinks?.map((link) => (
              <Link
                className={`flex gap-4 text-body-medium ${
                  pathname == link.url && "text-blue-1"
                }`}
                href={link.url}
                key={link.label}
              >
                <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopSideBar;
