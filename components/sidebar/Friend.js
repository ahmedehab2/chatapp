import { useChatContext } from "context/ChatContext";
import Link from "next/link";
import React from "react";

const Friend = ({ friend }) => {
  const { dispatch } = useChatContext();

  const handleSelect = (friend) => {
    dispatch({ type: "CHANGE_USER", payload: friend });
  };
  const chatId = friend[0];
  return (
    <Link
      onClick={() => handleSelect(friend[1].friendInfo)}
      href={`/Chats/${chatId}`}
      className="flex items-center gap-5 w-full h-14 px-2 dark:bg-gray-800 bg-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-3xl shadow-md mt-3 "
    >
      <img
        className="rounded-full h-10 w-10"
        src={friend[1].friendInfo.pictureURL}
        alt="avatar"
        referrerPolicy="no-referrer"
      />
      <div className="flex-1 py-1">
        <p className="h-2 text-gray-800 dark:text-white rounded">
          {friend[1].friendInfo.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-3">
          {friend[1].lastMessage?.message}
        </p>
      </div>
    </Link>
  );
};

export default Friend;
