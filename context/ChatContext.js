import React, { useContext, createContext, useReducer } from "react";

const Context = createContext();

export const ChatContext = ({ children }) => {
  const activeChat = JSON.parse(localStorage.getItem("activeChat"));

  const INITIAL_STATE = {
    user: activeChat ? activeChat : {}, //persist activeChat  state using localStorage
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        localStorage.setItem("activeChat", JSON.stringify(action.payload));
        return {
          user: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useChatContext = () => useContext(Context);
