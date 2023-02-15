import React, { use, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { MdPersonAdd } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { db } from "firebaseConfig";
import { useAuthContext } from "context/AuthContext";
import { useChatContext } from "context/ChatContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [addingFriend, setAddingFriend] = useState(false);
  const { currentUser } = useAuthContext();
  const { state, dispatch } = useChatContext();
  const { user } = state;
  const router = useRouter();

  const fetcher = async () => {
    const q = query(
      collection(db, "users"),
      where("name", "==", `${userName.toLowerCase()}`),
      where("name", "!=", `${currentUser.displayName.toLowerCase()}`)
    );
    const querySnapshot = await getDocs(q);

    const entriesData = querySnapshot.docs.map((entry) => entry.data());
    return entriesData;
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
    if (userName.length <= 1 && users != null) {
      setUsers(null);
    }
  };

  const handleKeyForSearch = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      fetcher()
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch(() => toast.error("Something went wrong, try again"));
    }
  };

  const addFriend = async (friend) => {
    const chatId =
      currentUser.uid > friend.uid
        ? currentUser.uid + friend.uid
        : friend.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", chatId));

      if (!response.exists()) {
        setAddingFriend(true);

        await updateDoc(doc(db, "users", currentUser.uid), {
          friends: arrayUnion(`${friend.uid}`),
        });

        await updateDoc(doc(db, "users", friend.uid), {
          friends: arrayUnion(`${currentUser.uid}`),
        });

        await setDoc(doc(db, "chats", chatId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatId + ".friendInfo"]: {
            uid: friend.uid,
            name: friend.name,
            pictureURL: friend.pictureURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", friend.uid), {
          [chatId + ".friendInfo"]: {
            uid: currentUser.uid,
            name: currentUser.displayName,
            pictureURL: currentUser.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });

        setAddingFriend(false);
      }
    } catch {
      toast.error("Something went wrong, try again");
    }
  };
  const handleSelect = (friend) => {
    const chatId =
      currentUser.uid > friend.uid
        ? currentUser.uid + friend.uid
        : friend.uid + currentUser.uid;

    router.push(`/Chats/${chatId}`);
    dispatch({ type: "CHANGE_USER", payload: friend });
  };

  return (
    <>
      <div className="relative my-6 mx-5">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <input
          type="text"
          className="w-full py-1 pl-10 pr-4 text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-900 rounded-xl shadow-lg outline-none border border-gray-300 dark:border-gray-600  focus:border-gray-400"
          placeholder="Search"
          value={userName}
          onChange={handleChange}
          onKeyDown={handleKeyForSearch}
        />
      </div>
      {loading ? (
        <div className="animate-pulse flex items-center space-x-4 my-2">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      ) : users?.length > 0 ? (
        <>
          {users.map((user) => {
            const isFriend = user.friends.includes(currentUser.uid);
            return (
              <div
                onClick={() => {
                  isFriend && handleSelect(user);
                }}
                key={user.uid}
                className="flex space-x-4 m-2 rounded-2xl p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
              >
                <img
                  className="rounded-full h-10 w-10"
                  src={user.pictureURL}
                  alt="avatar"
                />
                <div className="flex-1 py-1">
                  <div className="h-2 text-gray-600 dark:text-white rounded">
                    {user.name}
                  </div>
                </div>
                {addingFriend ? (
                  <div className="rounded-full w-10 flex items-center justify-center">
                    <ImSpinner2
                      fill="blue"
                      size={25}
                      className="hover:fill-blue-500 animate-spin"
                    />
                  </div>
                ) : isFriend ? (
                  <div className="rounded-full w-10 flex items-center justify-center">
                    <FaUserFriends
                      fill="blue"
                      className="hover:fill-blue-500"
                      size={25}
                      title="friend"
                    />
                  </div>
                ) : (
                  <button
                    className="rounded-full w-10 flex items-center justify-center"
                    onClick={() => addFriend(user)}
                  >
                    <MdPersonAdd fill="blue" size={25} title="Add friend" />
                  </button>
                )}
              </div>
            );
          })}
          <hr className="border border-gray-600 m-2" />
        </>
      ) : (
        users?.length === 0 && (
          <p className="text-white mx-auto my-3">no user found</p>
        )
      )}
    </>
  );
};

export default Search;
