import React, { useState } from "react";
import Friends from "./Friends";
import Search from "./Search";
import { CurrentUser } from "./CurrentUserBar";
import ThemeSwitch from "../ThemeSwitch";

const SmallerSideBar = () => {
  return (
    <div className="flex flex-col w-full lg:hidden z-10 h-screen p-2 bg-white dark:bg-gray-900 overflow-y-auto">
      <ThemeSwitch />
      <CurrentUser />
      <Search />
      <Friends />
    </div>
  );
};

export default SmallerSideBar;
