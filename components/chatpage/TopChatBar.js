import { useChatContext } from "context/ChatContext";
import React from "react";

const TopChatBar = () => {
  const { state } = useChatContext();
  return (
    <div className="w-[85%] lg:w-[95%] mx-auto flex items-center bg-white dark:bg-gray-700  h-16 p-3 rounded-3xl my-3 shadow-md">
      <div className="flex gap-3 w-fit items-center shadow-3xl rounded-3xl">
        <img
          className="w-8 h-8 rounded-full"
          src={state.user.pictureURL}
          alt="avatar"
        />
        <span>{state.user.name}</span>
      </div>
    </div>
  );
};

export default TopChatBar;
