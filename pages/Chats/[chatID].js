import BottomChatBar from "components/chatpage/BottomChatBar";
import Layout from "components/Layout";
import Messages from "components/chatpage/Messages";
import nookies from "nookies";
import { firebaseAdmin } from "FirebaseAdmin";
import { useAuthContext } from "context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import MessagesSkeleton from "components/skeletons/MessagesSkeleton";
import TopChatBar from "components/chatpage/TopChatBar";
import Head from "next/head";

const Chat = () => {
  const { currentUser } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { chatID } = router.query;

  useEffect(() => {
    setloading(true);
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", chatID), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data()?.messages);
          setloading(false);
        } else {
          setError(true);
        }
      });
      return () => unsub();
    };

    currentUser && getMessages();
  }, [currentUser, chatID]);

  return error ? (
    <>
      <Head>
        <title>Wrong page</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-screen flex flex-grow flex-col gap-5 justify-center items-center bg-gray-200 dark:bg-gray-800 ">
        <p className="text-xl text-gray-600 dark:text-gray-200">
          Error, Wrong page
        </p>
        <button
          className="p-2 rounded-lg bg-gray-500 text-white hover:bg-slate-400"
          onClick={() => {
            router.replace("/Chats");
            setError(false);
          }}
        >
          Back
        </button>
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Textto</title>
      </Head>
      <Toaster />
      <div className="flex-grow h-screen py-2 bg-gray-100 dark:bg-gray-800 flex flex-col">
        <TopChatBar />
        {loading ? <MessagesSkeleton /> : <Messages messages={messages} />}
        <BottomChatBar />
      </div>
    </>
  );
};

Chat.Layout = Layout;

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    return {
      props: { token },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
};
export default Chat;
