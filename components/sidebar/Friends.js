import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "firebaseConfig";
import Friend from "./Friend";
import { useAuthContext } from "context/AuthContext";
import FriendSkeleton from "components/skeletons/friendSkeleton";

const Friends = () => {
  const { currentUser } = useAuthContext();
  const [chats, setChats] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser?.uid),
        (doc) => {
          doc && setChats(Object.entries(doc.data()));
          setloading(false);
        }
      );
      return () => unsub();
    };

    currentUser && getChats();
  }, [currentUser]);

  if (loading)
    return [...Array(5)].map((value, i) => <FriendSkeleton key={i} />);

  return chats?.length > 0 ? (
    chats
      .sort((a, b) => b[0].date - a[0].date)
      .map((friend) => <Friend key={friend} friend={friend} />)
  ) : (
    <p className="text-gray-500 dark:text-white mx-auto my-auto">
      add some friends
    </p>
  );
};

export default Friends;
