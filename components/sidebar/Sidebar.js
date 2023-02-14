import React, { useEffect, useState } from "react";
import Friends from "./Friends";
import Search from "./Search";
import { CurrentUser } from "./CurrentUserBar";
import ThemeSwitch from "../ThemeSwitch";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-full lg:w-1/4 xl:w-1/5 z-10 h-screen p-2 bg-gray-100 dark:bg-gray-900 overflow-y-auto shadow-xl">
      <ThemeSwitch />
      <CurrentUser />
      <Search />
      <Friends />
    </div>
  );
};

export default Sidebar;
