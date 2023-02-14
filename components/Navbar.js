import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <div className="absolute right-7 p-5 flex items-center gap-5">
      <ThemeSwitch />
      <div className="flex gap-5">
        <Link
          className="text-md  border border-gray-300 hover:border-gray-700 transition-all duration-500 rounded-xl px-2"
          href="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
