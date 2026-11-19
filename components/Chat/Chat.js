import { ChatStyles } from "./styles/ChatStyles";
import Image from "next/legacy/image";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ChatOpen = dynamic(() => import("./ChatOpen"));
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setShowChat } from "../../store/appSlice";
import { setShowLogin } from "../../store/appSlice";
import Badge from "@mui/material/Badge";
import { useTranslation } from "next-i18next";
import setTimeAgoLocale from "../../lib/setTimeAgoLocale";
import isPwa from "../../lib/isPwa";
import { getFirestore, doc, updateDoc } from "firebase/firestore/lite";
setTimeAgoLocale;
const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user, shallowEqual);
  const showChat = useSelector((state) => state.app.showChat);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [newMessage, setNewMessage] = useState(false);
  if (user?.address) return <></>;
  return (
    <ChatStyles>
      <button
        className={`new-message ${newMessage ? "show" : ""}`}
        onClick={() => {
          if (user?.uid) {
            const userRef = doc(getFirestore(), "users", user.uid);
            updateDoc(userRef, {
              lastVisit: new Date().getTime(),
            });
            dispatch(setShowChat(!showChat));
            setNewMessage(false);
          } else {
            dispatch(setShowLogin(true));
          }
        }}
      >
        <p>
          <Image
            height={20}
            width={20}
            src="/img/icon-chat2.svg"
            alt="dekitabi-chat"
          />
          {t("newMessage")}
        </p>
      </button>
      {user && (
        <button
          className={`shuffle-chat ${!showChat && user ? "show" : ""} ${
            isPwa() ? "pwa-icon" : ""
          }`}
          onClick={() => {
            if (user?.uid) {
              const userRef = doc(getFirestore(), "users", user.uid);
              updateDoc(userRef, {
                lastVisit: new Date().getTime(),
              });
              dispatch(setShowChat(!showChat));
            } else {
              dispatch(setShowLogin(true));
            }
          }}
        >
          <Badge
            className="notification-dot"
            variant="dot"
            color="primary"
            invisible={unreadMessages < 1}
          >
            {!isPwa() ? (
              <Image
                height={25}
                width={25}
                src="/img/icon-chat2.svg"
                alt="dekitabi-chat"
              />
            ) : (
              <Image
                height={29}
                width={29}
                src="/img/icon-chat-pwa.svg"
                alt="dekitabi-chat-mobile"
              />
            )}
          </Badge>
        </button>
      )}
      {user?.uid && (
        <ChatOpen
          unreadMessages={unreadMessages}
          setUnreadMessages={setUnreadMessages}
          setNewMessage={setNewMessage}
          t={t}
          user={user}
        />
      )}
    </ChatStyles>
  );
};
export default Chat;
