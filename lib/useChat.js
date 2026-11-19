import {
  updateDoc,
  doc,
  getFirestore,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore/lite";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setShowChat } from "../store/appSlice";
import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
const useChat = () => {
  const { t, i18n } = useTranslation();
  let functions;
  let sendEmail;
  // let pushNotification;
  let db;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
    // pushNotification = httpsCallable(functions, "pushNotification");
    db = getFirestore();
  } catch (err) {
    console.log(err);
  }
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);
  const [loading, setLoading] = useState(false);
  const createChat = async (guide, traveler, openChat = true) => {
    console.log(guide, traveler);
    const chatSnap = await getDoc(doc(db, "chats", guide + traveler));
    if (!chatSnap.exists()) {
      return setDoc(doc(db, "chats", guide + traveler), {
        [traveler]: {
          lastVisit: new Date().getTime(),
          lastNotificationEmail: new Date().getTime(),
        },
        messages: [
          {
            from: guide,
            time: new Date().getTime(),
            message: t("welcomeChat"),
          },
        ],
        hasDeletedChat: [guide],
        [guide]: {
          lastVisit: 1,
          lastNotificationEmail: 0,
        },
      })
        .then(async () => {
          return updateDoc(doc(db, "users", traveler), {
            chats: arrayUnion({
              chatUser: guide,
            }),
          })
            .then(async () => {
              return updateDoc(doc(db, "users", guide), {
                chats: arrayUnion({
                  chatUser: traveler,
                }),
              })
                .then(async () => {
                  dispatch(setShowChat(true));
                  return true;
                })
                .catch((err) => {
                  alert(err);
                  console.log(err);
                  return false;
                });
            })
            .catch((err) => {
              alert(err);
              console.log(err);
              return false;
            });
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    } else {
      if (chatSnap.data()?.hasDeletedChat?.includes(traveler)) {
        return updateDoc(doc(db, "chats", guide + traveler), {
          hasDeletedChat: arrayRemove(traveler),
        })
          .then(async () => {
            return updateDoc(doc(db, "users", traveler), {
              chats: arrayUnion({
                chatUser: guide,
              }),
            })
              .then(() => {
                dispatch(setShowChat(true));
                return true;
              })
              .catch((err) => {
                console.log(err);
                return false;
              });
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      } else {
        dispatch(setShowChat(true));
      }
    }
  };
  const deleteChat = async (chatUser) => {
    setLoading(true);
    const chatId =
      user?.guide === "true"
        ? user?.uid + chatUser?.uid
        : chatUser?.uid + user?.uid;
    // Delete user chat
    const index = user?.chats.findIndex(
      (chat) => chat.chatUser === chatUser.uid
    );
    return updateDoc(doc(db, "users", user?.uid), {
      chats: arrayRemove(user.chats[index]),
    })
      .then(async () => {
        return updateDoc(doc(db, "chats", chatId), {
          hasDeletedChat: arrayUnion(user?.uid),
        })
          .then(() => {
            setLoading(false);
            return true;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const sendMessage = async (
    user,
    guide,
    traveler,
    message,
    hasDeletedChat
  ) => {
    return updateDoc(doc(db, "chats", guide?.uid + traveler?.uid), {
      //IT HAD UPDATE USER ID LAST VISIT HERE
      messages: arrayUnion({
        from: user?.uid,
        time: new Date().getTime(),
        message,
      }),
      hasDeletedChat: [],
    })
      .then(() => {
        const recipient = user?.guide === "true" ? traveler : guide;
        if (hasDeletedChat?.length === 0 || !hasDeletedChat) {
          sendNotificationEmail(guide, traveler, user, message);
          return true;
          // i18n.loadLanguages(
          //   recipient?.language?.code === "zh-TW"
          //     ? "zh_tw"
          //     : recipient?.language?.code === "zh-CN"
          //     ? "zh_cn"
          //     : recipient?.language?.code === "fil"
          //     ? "tl"
          //     : recipient?.language?.code
          // );
          // const ul = i18n.getFixedT(
          //   recipient?.language?.code === "zh-TW"
          //     ? "zh_tw"
          //     : recipient?.language?.code === "zh-CN"
          //     ? "zh_cn"
          //     : recipient?.language?.code === "fil"
          //     ? "tl"
          //     : recipient?.language?.code
          // );
          // pushNotification({
          //   title: ul("newMessage"),
          //   body: ul("someoneHasSentYouMessage2", {
          //     user: user.firstname ? user.firstname : user.username,
          //   }),
          //   link: "https://www.dekitabi.com/",
          //   tokens: recipient.firebaseMessagingTokens
          //     ? recipient.firebaseMessagingTokens
          //     : [],
          //   recipient: recipient.uid,
          // })
          //   .then((res) => {
          //     console.log(res);
          //     return true;
          //   })
          //   .catch((err) => console.log(err));
        } else {
          let t = new Date();
          t.setSeconds(t.getSeconds() + 10);
          return updateDoc(doc(db, "users", recipient?.uid), {
            chats: arrayUnion({
              chatUser: user?.uid,
            }),
          })
            .then(() => {
              sendNotificationEmail(guide, traveler, user, message);
              return true;
              // i18n.loadLanguages(
              //   recipient?.language?.code === "zh-TW"
              //     ? "zh_tw"
              //     : recipient?.language?.code === "zh-CN"
              //     ? "zh_cn"
              //     : recipient?.language?.code === "fil"
              //     ? "tl"
              //     : recipient?.language?.code
              // );
              // const ul = i18n.getFixedT(
              //   recipient?.language?.code === "zh-TW"
              //     ? "zh_tw"
              //     : recipient?.language?.code === "zh-CN"
              //     ? "zh_cn"
              //     : recipient?.language?.code === "fil"
              //     ? "tl"
              //     : recipient?.language?.code
              // );
              // pushNotification({
              //   body: ul("newMessage"),
              //   title: ul("someoneHasSentYouMessage2", {
              //     user: user.firstname ? user.firstname : user.username,
              //   }),
              //   link: "https://www.dekitabi.com/",
              //   tokens: recipient.firebaseMessagingTokens
              //     ? recipient.firebaseMessagingTokens
              //     : [],
              // })
              //   .then((res) => {
              //     return true;
              //   })
              //   .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
              return false;
            });
        }
      })
      .catch((err) => {
        console.log(err, err.message.includes("No document to update"));
        if (err.message.includes("No document to update")) {
          createChat(guide?.uid, traveler?.uid).then(() => {
            sendMessage(user, guide, traveler, message, hasDeletedChat);
          });
        } else {
          return false;
        }
      });
  };
  const sendNotificationEmail = async (guide, traveler, user, message) => {
    const recipient = user?.uid === traveler?.uid ? guide : traveler;
    console.log(recipient);
    if (!recipient?.sendEmails) {
      return true;
    } else {
      const chatRef = doc(db, "chats", guide.uid + traveler.uid);
      const chatSnap = await getDoc(chatRef);
      let chatMessages = chatSnap?.exists() ? chatSnap.data().messages : [];
      let chatUser;
      let chatUserUid;
      if (user?.uid === guide?.uid) {
        chatUserUid = traveler?.uid;
        chatUser = chatSnap.data()[traveler?.uid];
      } else {
        chatUserUid = guide?.uid;
        chatUser = chatSnap.data()[guide?.uid];
      }
      // if (user.guide === "true") {
      //   if (chatMessages[chatMessages.length - 1].from === chatUserUid) {
      //     const replyTime =
      //       Math.round(new Date().getTime() / 1000) -
      //       Math.round(chatMessages[chatMessages.length - 1].time / 1000);
      //     const averageReplyTime =
      //       (replyTime +
      //         user.replyTimeList?.reduce((partialSum, a) => partialSum + a, 0)) /
      //       (user.replyTimeList?.length + 1);
      //     const userRef = doc(getFirestore(), "users", user?.uid);
      //     updateDoc(userRef, {
      //       replyTimeList: arrayUnion(replyTime),
      //       replyTime: Math.round(averageReplyTime),
      //     });
      //   }
      // }
      const now = Date.now();
      const fiveMinutes = 300000;
      const lastEmail = chatUser.lastNotificationEmail || 0;
      const lastVisit = chatUser.lastVisit || 0;
      const lastMessageTime =
        chatMessages.length > 1
          ? chatMessages[chatMessages.length - 1]?.time
          : 0;
      const timeSinceLastEmail = now - lastEmail;
      const timeSinceLastVisit = now - lastVisit;
      const userVisitedAfterLastEmail = lastVisit > lastEmail;
      const messageSentAfterVisit = lastMessageTime > lastVisit;
      const messageIsRecent = now - lastMessageTime < fiveMinutes;
      // const timeSinceLastEmail = now - chatUser.lastNotificationEmail;
      // const timeSinceLastVisit = now - chatUser.lastVisit;
      // const lastMessageTime =
      //   chatMessages.length > 1
      //     ? chatMessages[chatMessages.length - 1]?.time
      //     : 0;
      // const userVisitedAfterEmail =
      //   chatUser.lastVisit > chatUser.lastNotificationEmail;
      // const userLikelyDidNotSeeLastMessage =
      //   chatUser.lastVisit + fiveMinutes > lastMessageTime;
      console.log(
        timeSinceLastEmail,
        timeSinceLastVisit,
        userVisitedAfterLastEmail,
        messageSentAfterVisit,
        messageIsRecent,
        "time since last email > 5",
        timeSinceLastEmail > fiveMinutes, // Prevent too frequent emails
        "time since last visit > 5",
        timeSinceLastVisit > fiveMinutes, // User has been away for a bit
        "user visited after last email",
        userVisitedAfterLastEmail, // They've come back after last email
        "message sent after last visit",
        messageSentAfterVisit, // They probably didn't see this message
        "message is recent",
        messageIsRecent
      );
      if (
        timeSinceLastEmail > fiveMinutes && // Prevent too frequent emails
        timeSinceLastVisit > fiveMinutes && // User has been away for a bit
        userVisitedAfterLastEmail && // They've come back after last email
        messageSentAfterVisit && // They probably didn't see this message
        messageIsRecent // Don't notify about super old messages
      ) {
        updateDoc(chatRef, {
          [chatUserUid]: {
            ...chatUser,
            lastNotificationEmail: new Date().getTime(),
          },
        });
        await i18n.loadLanguages(
          recipient?.language?.code === "zh-TW"
            ? "zh_tw"
            : recipient?.language?.code === "zh-CN"
            ? "zh_cn"
            : recipient?.language?.code === "fil"
            ? "tl"
            : recipient?.language?.code
        );
        const ul = i18n.getFixedT(recipient.language.code);
        // console.log(user?.email, ul("cancel"), recipient);
        sendEmail({
          to: recipient?.email,
          sender: "noreply@dekitabi.com",
          subject: `dekitabi | ${ul("someoneHasSentYouMessage")}`,
          body: `<div style="background:#FAFAFA ; font-family: Verdana, Geneva, Tahoma, sans-serif; padding:10px">
          <div style="text-align:center; padding:20px 0 20px 0">
          <img
          src="https://www.dekitabi.com/img/logo.png"
          height="45"
          width="141"
          alt="dekitabi"
        /></div>
          <section style="background:white;max-width:600px;margin: 20px auto;border-top:4px solid #2186eb;border-radius:5px;padding:20px; text-align:center">
           <h1 style="color: #1a2b49; margin: 0">
           ${ul("newNotification")}</h1>
            <h2>${ul("hello")} ${
            recipient.firstname
              ? `${recipient?.firstname} ${recipient?.lastname}`
              : `${recipient?.guide === "true" ? ul("guide") : ul("traveler")}`
          },</h2>
        <p style="margin: 0 0 10px 0; line-height:20px; text-align:left;">
            <b>${ul("thanksUsingDekitabi")}</b> ${ul(
            "someoneHasSentYouMessageEmail"
          )}</p>
            <p style="margin: 0 0 20px 0; line-height:20px; text-align:left; padding:20px; border-radius:10px; background:#ededed">
            <b>${
              user.firstname
                ? `${user?.firstname} ${user?.lastname}`
                : `${user?.username}`
            }: </b> "${message}"</p>
            <a href="https://www.dekitabi.com/" target="_blank" rel="noreferrer" style="display:block; margin:10px 0; padding:15px;font-size:1.1em;border-radius:5px; color:white; background:#2186eb; text-decoration:none; text-align:center">${ul(
              "goToDekitabi"
            )}</a>
            <p>${ul(
              "wantDisable"
            )} <a href="https://www.dekitabi.com/account/notifications" target="_blank" rel="noreferrer">${ul(
            "disableNotifications"
          )}</a></p>
          </section>      <section
          style="
            max-width: 600px;
            margin: 0 auto;
            position: relative;
            padding: 0 10px;
          "
        >
          <div>
            <img src="https://www.dekitabi.com/img/logo.png" height="30" width="90" />
            <ul style="margin: 10px 0 0 0; list-style: none; float: right; display: block">
              <li style="display: inline; margin-left:5px">
                <a
                  href="https://www.instagram.com/dekitabi"
                  target="_blank"
                  rel="noreferrer"
                  style="text-decoration:none"
                >
                  <img
                    src="https://www.dekitabi.com/img/icon-instagram.png"
                    alt="instagram"
                    height="20"
                    width="20"
                  />
                </a>
              </li>
              <li style="display: inline; margin-left:5px">
                <a
                  href="https://www.facebook.com/dekitabi"
                  target="_blank"
                  rel="noreferrer"
                  style="text-decoration:none"
                >
                  <img
                    src="https://www.dekitabi.com/img/icon-facebook.png"
                    alt="facebook"
                    height="20"
                    width="20"
                  />
                </a>
              </li>
              <li style="display: inline; margin-left:5px">
                <a
                  href="https://www.threads.net/@dekitabi"
                  target="_blank"
                  rel="noreferrer"
                  style="text-decoration:none"
                >
                  <img
                    src="https://www.dekitabi.com/img/icon-threads.png"
                    alt="threads"
                    height="20"
                    width="20"
                  />
                </a>
              </li>
              <li style="display: inline; margin-left:5px">
                <a
                  href="https://www.twitter.com/dekitabi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="https://www.dekitabi.com/img/icon-twitter.png"
                    alt="twitter"
                    height="20"
                    width="20"
                  />
                </a>
              </li>
            </ul>
          </div>
          <p style="font-size: 0.8em; color:black">
            〒160-0023<br />
            東京都新宿区西新宿三丁目3番13号　西新宿水間ビル6階.
          </p>
          <div>
            <a
              href="https://play.google.com/store/apps/details?id=com.dekitabi"
              target="_blank"
              rel="noreferrer"
              style="margin-right: 5px; text-decoration:none"
            >
              <img
                src="https://www.dekitabi.com/img/icon-googleplay.png"
                alt="open"
                width="100"
                height="29"
              />
            </a>
            <a
              href="https://appgallery.huawei.com/#/app/C110443229"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://www.dekitabi.com/img/icon-huawei.png"
                alt="open"
                width="100"
                height="29"
              />
            </a>
          </div>
        </section>
            <p
              style="
                margin: 25px 0 0 0;
                color: #adadad;
                padding: 20px 0;
                border-top: 1px solid #adadad;
                font-size: 10px;
                background:white;
                text-align:center;
              "
            >
            ${ul("doNotReplyEmail")}
            </p>
         </div>`,
        });
      }
    }
  };
  return { loading, createChat, deleteChat, sendMessage };
};
export default useChat;
