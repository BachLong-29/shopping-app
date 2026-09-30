"use client";

import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";

const Logo = () => {
  return (
    <Link className="cursor-pointer show-hide" href="/">
      <Image
        width={40}
        height={40}
        alt="logo"
        src={logo}
        priority
        className="w-[auto] h-[45px] drop-shadow-[0_4px_6px_rgba(255,255,255,0.5)]"
      />
    </Link>
  );
};

export default Logo;
