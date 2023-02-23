import React, { useContext, createContext, useState, useEffect } from "react";
import { initFirebase, db, provider } from "firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
  browserSessionPersistence,
  onIdTokenChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import nookies from "nookies";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Context = createContext();

export const AuthContext = ({ children }) => {
  initFirebase();
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setCurrentUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await currentUser.getIdToken();
        setCurrentUser(currentUser);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
    return () => unsubscribe();
  });

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  const addUserToFirestoreDB = async (user) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName.toLowerCase(),
        pictureURL: user.photoURL,
        uid: user.uid,
      });
      await setDoc(doc(db, "userChats", user.uid), {});
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  const sign = () =>
    auth.setPersistence(browserSessionPersistence).then(() =>
      signInWithPopup(auth, provider)
        .then((result) => {
          const { isNewUser } = getAdditionalUserInfo(result);
          if (isNewUser) {
            addUserToFirestoreDB(result.user);
          }
          setCurrentUser(result.user);
          router.replace("/Chats");
        })
        .catch(() => toast.error("Something went wrong."))
    );

  const signout = () => {
    auth.signOut().then(() => {
      router.replace("/");
      nookies.set(undefined, "token", "", { path: "/" });
      setCurrentUser(null);
    });
  };

  return (
    <Context.Provider value={{ sign, signout, currentUser }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
