import Image from "next/legacy/image";
import React, { useState, useEffect, useRef } from "react";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
// import useChat from "../../lib/useChat";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setShowChat } from "../../store/appSlice";
import {
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  arrayRemove,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import setTimeAgoLocale from "../../lib/setTimeAgoLocale";
setTimeAgoLocale;
const ChatOpen = ({
  unreadMessages,
  setUnreadMessages,
  setNewMessage,
  t,
  user,
}) => {
  const language = useSelector((state) => state.app.language, shallowEqual);
  const timeAgo = setTimeAgoLocale(language);
  const db = getFirestore();
  const dispatch = useDispatch();
  const showChat = useSelector((state) => state.app.showChat);
  const [currentChat, setCurrentChat] = useState();
  const [chatLastVisit, setChatLastVisit] = useState();
  const [showUserList, setShowUserList] = useState(true);
  const [chatUserList, setChatUserList] = useState([]);
  const chatUserListRef = useRef([]);
  const [loadingChat, setLoadingChat] = useState(true);
  const getChatUserList = async () => {
    let chatList = [];
    chatList = await Promise.all(
      user?.chats?.map(async (chat, i) => {
        let chatUserRef;
        try {
          chatUserRef = doc(db, "users", chat?.chatUser);
        } catch (err) {
          console.log(err);
          return false;
        }
        if (chatUserRef) {
          const docSnap = await getDoc(chatUserRef);
          if (docSnap.exists()) {
            const chatUser = docSnap.data();
            const chatDocument =
              user?.guide === "true"
                ? user?.uid + chatUser.uid
                : chatUser?.uid + user?.uid;
            const chatRef = doc(getFirestore(), "chats", chatDocument);
            return {
              uid: chatUser.uid,
              firstname: chatUser.firstname,
              lastname: chatUser.lastname,
              avatar:
                chatUser.avatar !== "/img/avatar.png" ||
                chatUser?.photos?.length === 0
                  ? chatUser?.avatar
                  : chatUser?.photos?.length > 0
                  ? chatUser?.photos[0]
                  : "/img/avatar.png",
              lastVisit: chatUser.lastVisit,
              language: chatUser.language,
              username: chatUser.username,
              email: chatUser.email,
              sendEmails: chatUser?.notificationsSettings?.chatMessage,
              firebaseMessagingTokens: chatUser.firebaseMessagingTokens,
              //
              //
              //
              //
              unread: await getDoc(chatRef)
                .then((docData) => {
                  if (docData.exists()) {
                    let counter = 0;
                    let lastVisit =
                      docData.data()[user?.uid]?.lastVisit ||
                      new Date().getTime();
                    const chatMessages = docData.data()?.messages;
                    for (let i = chatMessages?.length - 1; i >= 0; i--) {
                      if (chatMessages[i].time >= lastVisit) {
                        if (chatMessages[i]?.from === chatUser.uid) {
                          counter++;
                        }
                      } else {
                        break;
                      }
                    }
                    return counter;
                  } else {
                    return 0;
                  }
                })
                .catch((err) => console.log(err)),
              //
              //
              //
              //
            };
          } else {
            updateDoc(doc(getFirestore(), "users", user?.uid), {
              chats: arrayRemove(chat),
            });
            const chatDocument =
              user?.guide === "true"
                ? user?.uid + chat?.chatUser
                : chat?.chatUser + user?.uid;
            const chatRef = doc(getFirestore(), "chats", chatDocument);
            deleteDoc(chatRef);
            return false;
          }
        } else {
          updateDoc(doc(getFirestore(), "users", user?.uid), {
            chats: arrayRemove(chat),
          });
          return false;
        }
      })
    );
    chatList = chatList.filter(function (element) {
      return element !== false;
    });
    chatList.map((chatUser) => {
      import("firebase/firestore").then(({ onSnapshot, doc, getFirestore }) => {
        const chatDocument =
          user?.guide === "true"
            ? user?.uid + chatUser?.uid
            : chatUser?.uid + user?.uid;
        const chatRef = doc(getFirestore(), "chats", chatDocument);
        const unsubscribe = onSnapshot(chatRef, (docData) => {
          if (docData.exists()) {
            if (docData.data().hasDeletedChat.includes(user?.uid)) {
              unsubscribe();
            } else {
              if (chatUserListRef.current.length > 0) {
                let counter = 0;
                let lastVisit =
                  docData.data()[user?.uid]?.lastVisit || new Date().getTime();
                const chatMessages = docData.data()?.messages;
                for (let i = chatMessages?.length - 1; i >= 0; i--) {
                  if (chatMessages[i].time >= lastVisit) {
                    if (chatMessages[i]?.from === chatUser?.uid) {
                      counter++;
                    }
                  } else {
                    break;
                  }
                }
                const index = chatUserListRef.current.findIndex(
                  (user) => user.uid === chatUser.uid
                );
                if (chatUserListRef.current[index]) {
                  let tempChatUser = {
                    ...chatUserListRef.current[index],
                    unread: counter,
                  };
                  let tempChatUserList = [...chatUserListRef.current];
                  tempChatUserList.splice(index, 1, tempChatUser);
                  chatUserListRef.current = tempChatUserList.sort(
                    (a, b) => b.unread - a.unread
                  );
                  setChatUserList(chatUserListRef.current);
                }
              }
            }
          }
        });
      });
    });
    setLoadingChat(false);
    chatUserListRef.current = chatList.sort((a, b) => b.unread - a.unread);
    setChatUserList(chatUserListRef.current);
  };
  useEffect(() => {
    if (user?.chats) {
      getChatUserList();
    } else {
      setUnreadMessages(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.chats?.length]);
  useEffect(() => {
    if (chatUserListRef.current.length > 0) {
      let totalCounter = chatUserListRef.current.reduce(
        (total, unread) => total + unread?.unread,
        0
      );
      if (unreadMessages !== totalCounter && !showChat) {
        if (totalCounter > 0) {
          setNewMessage(true);
          setTimeout(() => {
            setNewMessage(false);
          }, 2500);
        }
      }
      setUnreadMessages(totalCounter);
    }
  }, [chatUserList]);
  return (
    <div className={`chat-open ${showChat ? "show" : ""}`}>
      <div className="window-bar">
        <div className="window-bar-wrapper">
          {t("chat")}{" "}
          {unreadMessages > 0 && (
            <div className="chat-notification">{unreadMessages}</div>
          )}{" "}
          <span>{currentChat?.firstname || currentChat?.username}</span>
          <button
            className="chat-close"
            onClick={() => dispatch(setShowChat(false))}
          >
            <Image
              height={15}
              width={15}
              src="/img/icon-arrow-down.svg"
              alt="close-dekitabi-chat"
            />
          </button>
          {/* {currentChat?.lastVisit && (
            <p className="last-visit">
              {t("lastSeen")}{" "}
              {timeAgo.format(
                Math.floor(new Date().getTime()) -
                  (new Date().getTime() - currentChat?.lastVisit)
              )}
            </p>
          )} */}
          {/* {typeof chatLastVisit !== "undefined" &&
            typeof currentChat?.lastVisit !== "undefined" &&
            (chatLastVisit > 1 || currentChat?.lastVisit) && ( */}
          {chatLastVisit > 1 && currentChat?.uid && (
            <p className="last-visit">
              {t("lastSeen")}{" "}
              {timeAgo.format(
                Math.floor(new Date().getTime()) -
                  (new Date().getTime() - chatLastVisit)
              )}
            </p>
          )}
        </div>
      </div>
      <div className="chat-wrapper">
        {loadingChat && (
          <div className="chat-loading">
            <Image
              src="/img/icon-spinner.svg"
              height={50}
              width={50}
              alt="loading-dekitabi-chat"
            />
          </div>
        )}
        <ChatList
          user={user}
          chatUserList={chatUserList}
          setCurrentChat={setCurrentChat}
          setShowUserList={setShowUserList}
          showUserList={showUserList}
          t={t}
        />
        <ChatBox
          user={user}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          setShowUserList={setShowUserList}
          showUserList={showUserList}
          showChat={showChat}
          t={t}
          setChatLastVisit={setChatLastVisit}
          chatLastVisit={chatLastVisit}
        />
      </div>
    </div>
  );
};
export default ChatOpen;
