import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { db } from "firebaseConfig";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { IoIosSend } from "react-icons/io";
import { useRouter } from "next/router";
import { useAuthContext } from "context/AuthContext";
import { useChatContext } from "context/ChatContext";

const BottomChatBar = () => {
  const { currentUser } = useAuthContext();
  const { state } = useChatContext();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { chatID } = router.query;

  const isEmpty = (str) => !str.trim().length;

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyForSubmitMessage = async (e) => {
    if (e.key === "Enter") {
      submitMessage();
    }
  };

  const submitMessage = async () => {
    setMessage("");
    if (!isEmpty(message)) {
      try {
        await updateDoc(doc(db, "chats", chatID), {
          messages: arrayUnion({
            id: uuid(),
            text: message,
            senderID: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatID + ".lastMessage"]: {
            message,
          },
          [chatID + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", state.user.uid), {
          [chatID + ".lastMessage"]: {
            message,
          },
          [chatID + ".date"]: serverTimestamp(),
        });
      } catch {
        toast.error("Message not sent, try again");
      }
    }
  };

  return (
    <div className="h-12 w-[85%] lg:w-[95%] self-center flex items-center gap-2">
      <input
        onChange={handleChange}
        onKeyDown={handleKeyForSubmitMessage}
        value={message}
        className="py-3 px-4 outline-none w-full bg-white dark:bg-gray-700 shadow-xl rounded-2xl"
        type="text"
        placeholder="type your message..."
      />
      <button
        onClick={submitMessage}
        className="w-10 h-10 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-center items-center"
      >
        <IoIosSend size={30} fill="blue" />
      </button>
    </div>
  );
};

export default BottomChatBar;
