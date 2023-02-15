import { useAuthContext } from "context/AuthContext";
import { useChatContext } from "context/ChatContext";
import moment from "moment/moment";
import React, { useEffect, useRef } from "react";

const Messages = ({ messages }) => {
  const scrollRef = useRef();

  const Scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } = scrollRef.current;
    if (scrollHeight <= scrollTop + offsetHeight + 100) {
      scrollRef.current?.scrollTo(0, scrollHeight);
    }
  };

  useEffect(() => {
    Scroll();
  }, [messages]);

  const { currentUser } = useAuthContext();
  const { state } = useChatContext();
  const { user } = state;

  return (
    <div
      ref={scrollRef}
      className="bg-gray-100 dark:bg-gray-800 flex flex-col p-2 flex-grow chatUI"
    >
      <div className="grid-cols-12">
        {messages.map((message) =>
          message.senderID === currentUser?.uid ? (
            <div
              key={message.id}
              className="col-start-6 col-end-13 p-3 rounded-lg"
            >
              <div className="flex items-center gap-2 justify-start flex-row-reverse">
                <div className="flex items-center justify-center rounded-full flex-shrink-0">
                  <img
                    src={currentUser.photoURL}
                    referrerPolicy="no-referrer"
                    className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
                  />
                </div>
                <div className="relative text-sm bg-gray-200 dark:bg-gray-500 py-2 px-4 shadow rounded-xl">
                  <p className="text-blak dark:text-white">{message.text}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {moment(message.date.toDate()).calendar()}
                </span>
              </div>
            </div>
          ) : (
            <div
              key={message.id}
              className="col-start-1 col-end-8 p-3 rounded-lg"
            >
              <div className="flex flex-row gap-2 items-center">
                <div className="flex items-center justify-center rounded-full flex-shrink-0">
                  <img
                    src={user.pictureURL}
                    referrerPolicy="no-referrer"
                    className="rounded-full w-8 h-8 lg:w-10 lg:h-10"
                  />
                </div>

                <div className="self-start relative text-sm bg-white dark:bg-gray-700 py-2 px-4 shadow rounded-xl">
                  <p className="text-black dark:text-white">{message.text}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {moment(message.date.toDate()).calendar()}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Messages;
