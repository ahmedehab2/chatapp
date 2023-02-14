import { useAuthContext } from "context/AuthContext";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

export const CurrentUser = () => {
  const { currentUser, signout } = useAuthContext();
  return (
    <div className="flex justify-between mt-4 mx-2 bg-gray-200 dark:bg-gray-800 rounded-3xl p-2 shadow-xl">
      <div className="flex items-center ">
        <img
          className="object-cover mx-2 rounded-full h-9 w-9"
          src={currentUser?.photoURL}
          alt="avatar"
          referrerPolicy="no-referrer"
        />
        <span className="mx-2 font-medium text-gray-600 dark:text-gray-300">
          {currentUser?.displayName}
        </span>
      </div>
      <button
        onClick={signout}
        className="px-2 rounded-full flex justify-center items-center "
      >
        <FaSignOutAlt fill="blue" className="hover:fill-blue-500" size={25} />
      </button>
    </div>
  );
};
