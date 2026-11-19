import { ChatBoxStyles } from "./styles/ChatBoxStyles";
import ChatInput from "./ChatInput";
import DOMPurify from "isomorphic-dompurify";
import { useState, useEffect, useRef } from "react";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import Image from "next/legacy/image";
import useDate from "../../lib/useDate";
import Avatar from "../UI/Avatar";
const ChatBox = ({
  user,
  currentChat,
  setCurrentChat,
  setShowUserList,
  showUserList,
  showChat,
  t,
  chatLastVisit,
  setChatLastVisit,
}) => {
  const ref = useRef();
  const unsubscribeRef = useRef(null);
  const db = getFirestore();
  const [chatMessages, setChatMessages] = useState([]);
  // const [chatLastVisit, setChatLastVisit] = useState();
  const { getTimeFromDate, formatComparingDate, formatDate } = useDate();
  const [hasDeletedChat, setHasDeletedChat] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    if (chatMessages.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [chatMessages]);
  useEffect(() => {
    if (user?.uid && currentChat?.uid) {
      const chatDocument =
        user?.guide === "true"
          ? user?.uid + currentChat?.uid
          : currentChat?.uid + user?.uid;
      const chatRef = doc(db, "chats", chatDocument);
      getDoc(chatRef)
        .then((chat) => {
          const tempChatUser = { ...chat.data()[user.uid] };
          updateDoc(chatRef, {
            [user.uid]: { ...tempChatUser, lastVisit: new Date().getTime() },
          }).catch((err) => {
            setLoading(false);
            console.log(err);
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      unsubscribeRef.current = onSnapshot(chatRef, async (doc) => {
        if (doc.exists()) {
          setHasDeletedChat(doc.data().hasDeletedChat);
          if (doc?.data()[currentChat?.uid] && showChat) {
            setChatLastVisit(doc.data()[currentChat?.uid]?.lastVisit);
          }
          setChatMessages((prevState) => {
            if (prevState?.length !== doc.data()?.messages?.length) {
              return doc.data().messages;
            } else {
              setTimeout(() => {
                setLoading(false);
              }, 500);
            }
            return prevState;
          });
        } else {
          if (unsubscribeRef.current) {
            unsubscribeRef.current(); // Stop listening
            unsubscribeRef.current = null;
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentChat]);
  useEffect(() => {
    if (user?.uid && currentChat?.uid && showChat) {
      const chatDocument =
        user?.guide === "true"
          ? user?.uid + currentChat?.uid
          : currentChat?.uid + user?.uid;
      const chatRef = doc(db, "chats", chatDocument);
      var t = new Date();
      t.setSeconds(t.getSeconds() + 4);
      getDoc(chatRef)
        .then((chat) => {
          const tempChatUser = { ...chat.data()[user.uid] };
          updateDoc(chatRef, {
            [user.uid]: { ...tempChatUser, lastVisit: t.getTime() },
          });
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages, showChat]);
  const checkSameDates = (date1, date2) => {
    if (formatComparingDate(date1) === formatComparingDate(date2)) {
      return true;
    } else {
      return false;
    }
  };
  const isToday = (date) => {
    if (formatComparingDate(Date.now()) === formatComparingDate(date)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <ChatBoxStyles className={!showUserList ? "show" : ""}>
      <button
        className="back-button"
        onClick={() => {
          setShowUserList(true);
          setCurrentChat();
          setChatLastVisit(0);
          if (unsubscribeRef.current) {
            unsubscribeRef.current(); // Stop listening
            unsubscribeRef.current = null;
          }
          setLoading(true);
        }}
      >
        <Image
          height={13}
          width={13}
          src="/img/icon-arrow-left.svg"
          alt="dekitabi-chat-back-button"
        />
      </button>
      {loading && (
        <div className="chat-loading">
          <Image
            src="/img/icon-spinner.svg"
            height={50}
            width={50}
            alt="loading-dekitabi-chat"
          />
        </div>
      )}
      <div className={`chat-box ${!loading ? "show" : ""}`} id="chat-box">
        <div>
          {chatMessages.length > 0 && (
            <>
              {isToday(chatMessages[0]?.time, Date.now()) ? (
                <p className="chat-date">{t("today")}</p>
              ) : (
                <p className="chat-date">{formatDate(chatMessages[0]?.time)}</p>
              )}
            </>
          )}
          {chatMessages?.map((message, i) => (
            <div key={i}>
              <div
                className={`chat-message ${
                  message.from === user.uid ? "from-right" : ""
                }`}
              >
                {message.from !== user.uid && (
                  <Avatar width={35} height={35} src={currentChat?.avatar} />
                )}
                <p
                  className={
                    message.from === user.uid ? "from-me" : "from-them"
                  }
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      `${message.message} <span>${getTimeFromDate(
                        message.time / 1000
                      )}</span>`,
                      {
                        USE_PROFILES: { html: true },
                      }
                    ),
                  }}
                ></p>
              </div>
              {message.from === user.uid && (
                <div className="sent">
                  {chatMessages[i].time > chatLastVisit ? t("sent") : t("read")}
                </div>
              )}
              {chatMessages[i + 1] &&
                !checkSameDates(
                  chatMessages[i].time,
                  chatMessages[i + 1].time
                ) &&
                isToday(chatMessages[i + 1].time) && (
                  <p className="chat-date">Today</p>
                )}
              {chatMessages[i + 1] &&
                !checkSameDates(
                  chatMessages[i].time,
                  chatMessages[i + 1].time
                ) &&
                !isToday(chatMessages[i + 1].time) && (
                  <p className="chat-date">
                    {formatDate(chatMessages[i + 1].time)}
                  </p>
                )}
            </div>
          ))}
        </div>
        <div ref={ref}> </div>
      </div>
      <ChatInput
        user={user}
        currentChat={currentChat}
        hasDeletedChat={hasDeletedChat}
      />
    </ChatBoxStyles>
  );
};
export default ChatBox;
