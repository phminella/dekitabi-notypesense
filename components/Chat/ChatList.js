import { ChatListStyles } from "./styles/ChatListStyles";
import ChatUser from "./ChatUser";
import NotFound from "../UI/NotFound";
const ChatList = ({
  user,
  setCurrentChat,
  setShowUserList,
  chatUserList,
  showUserList,
  t,
}) => {
  const chatHandler = (chatUser) => {
    setCurrentChat(chatUser);
    setShowUserList(false);
  };
  return (
    <ChatListStyles className={showUserList ? "show" : ""}>
      {user?.guide === "false" && (
        <div className="chat-list-title">{t("guides")}</div>
      )}
      {user?.guide === "true" && (
        <div className="chat-list-title">{t("travelers")}</div>
      )}
      <div className="chat-list">
        {chatUserList?.length < 1 && (
          <div className="no-chats">
            <NotFound message={`${t("noChats")}.`} />
          </div>
        )}
        {chatUserList.map((chatUser, i) => {
          if (chatUser) {
            return (
              <ChatUser
                key={i}
                chatHandler={chatHandler}
                user={user}
                chatUser={chatUser}
                t={t}
              />
            );
          }
        })}
      </div>
    </ChatListStyles>
  );
};
export default ChatList;
