import Avatar from "../UI/Avatar";
import Image from "next/legacy/image";
import { ChatUserStyles } from "./styles/ChatUserStyles";
import useChat from "../../lib/useChat";
import { useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
const ChatUser = ({ chatHandler, chatUser, t }) => {
  const { deleteChat, loading } = useChat();
  const [showDelete, setShowDelete] = useState(false);
  return (
    <ChatUserStyles>
      <button
        className="chat-user-button"
        onClick={async () => {
          const chatUserRef = doc(getFirestore(), "users", chatUser?.uid);
          const docSnap = await getDoc(chatUserRef);
          chatHandler({ ...chatUser, lastVisit: docSnap.data().lastVisit });
        }}
      >
        <div className="chat-user">
          <Avatar width={45} height={45} src={chatUser?.avatar} />{" "}
          {chatUser?.firstname && <>{chatUser?.firstname}</>}
          {!chatUser?.firstname && <>{chatUser?.username}</>}
        </div>
      </button>
      <div className="chat-arrow">
        <div className="chat-options">
          {chatUser?.unread > 0 && (
            <div className="chat-notification">{chatUser?.unread}</div>
          )}
          {loading ? (
            <div className="chat-notification">
              <Image
                height={25}
                width={25}
                src="/img/icon-spinner-white.svg"
                alt="loading-dekitabi-chat"
                className="spinner"
              />
            </div>
          ) : (
            <div className="chat-delete-wrapper">
              <div
                className={`chat-delete-confirm ${showDelete ? "show" : ""}`}
              >
                <button
                  className="chat-delete-confirm-button"
                  onClick={() =>
                    deleteChat(chatUser)
                      .then(() => {
                        setShowDelete(false);
                      })
                      .catch((err) => {
                        setShowDelete(false);
                      })
                  }
                >
                  <Image
                    height={18}
                    width={18}
                    src="/img/icon-delete.svg"
                    alt="delete-dekitabi-chat"
                  />
                </button>
                <button
                  className="chat-delete-confirm-button"
                  onClick={() => setShowDelete(false)}
                >
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-arrow-right.svg"
                    alt="view-dekitabi-chat"
                  />
                </button>
              </div>
              <button
                className="chat-notification chat-delete"
                onClick={() => setShowDelete(true)}
              >
                <Image
                  height={25}
                  width={25}
                  src="/img/icon-settings.svg"
                  alt="dekitabi-chat-options"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </ChatUserStyles>
  );
};
export default ChatUser;
