import { useTheme } from "next-themes";
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return theme === "dark" ? (
    <button className="p-2 self-center " onClick={() => setTheme("light")}>
      <MdDarkMode className="hover:fill-blue-500" fill="blue" size={25} />
    </button>
  ) : (
    <button className="p-2 self-center " onClick={() => setTheme("dark")}>
      <MdLightMode className="hover:fill-blue-500" fill="blue" size={25} />
    </button>
  );
};

export default ThemeSwitch;
