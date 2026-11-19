import { getFunctions, httpsCallable } from "firebase/functions";
import {
  updateDoc,
  doc,
  getFirestore,
  setDoc,
  increment,
} from "firebase/firestore/lite";
import { useTranslation } from "next-i18next";
const useSendNotificationEmail = () => {
  const { i18n } = useTranslation();
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const send = (type, profile, user, itineraryUrl, itineraryName, comment) => {
    const gl = i18n.getFixedT(profile.language.code);
    let subject;
    let message;
    if (type === "profileVisit") {
      subject = gl("someoneHasViewedYourProfile");
      message = gl("someoneHasViewedYourProfileEmail");
    } else if (type === "itineraryLike") {
      subject = gl("someoneLikedYourItinerary", {
        itineraryUrl,
        itineraryName,
      });
      message = gl("someoneLikedYourItineraryEmail", {
        itineraryUrl,
        itineraryName,
        username: user?.username ? user?.username : gl("guest"),
      });
    } else {
      subject = gl("someoneCommentedYourItinerary", {
        itineraryName,
        itineraryUrl,
      });
      message = gl("someoneCommentedYourItineraryEmail", {
        itineraryUrl,
        itineraryName,
        username: user?.username ? user?.username : gl("guest"),
      });
    }
    sendEmail({
      to: profile?.email,
      sender: "noreply@dekitabi.com",
      subject: `dekitabi | ${subject}`,
      body: `<link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div style="background:#f7f7f7; font-family: 'Poppins', sans-serif; font-size:15px">
        <div style="text-align:center; padding:20px 0 20px 0">
        <img
        src="https://www.dekitabi.com/img/logo.png"
        height="45"
        width="141"
        alt="dekitabi"
      /></div>
        <section style="background:white;max-width:600px;margin: 20px auto;border-top:4px solid #2186eb;border-radius:5px;padding:20px; text-align:center">
         <h1 style="color: #1a2b49; margin: 0">
         ${subject}</h1>
          <h2>${gl("hello")} ${
        profile.firstname
          ? `${profile?.firstname} ${profile?.lastname}`
          : profile?.username
      },</h2>
          <div style="margin: 0 0 20px 0; line-height:20px; text-align:left; padding:20px; border-radius:10px; background:#ededed">
         ${gl("thanksUsingDekitabi")} ${message}
          ${
            comment
              ? `<p style="margin:15px 0 0 0; padding-top:15px; border-top:1px solid lightgray">${
                  user?.username
                    ? `<a style="font-weight:bold; text-decoration:none; color:#fc0165" href="https://www.dekitabi.com/${user?.username}">${user?.username}</a> `
                    : `<b>${gl("guest")}</b> `
                }${comment}</p>`
              : ""
          }</div>
          <a href="https://www.dekitabi.com/account/notifications" target="_blank" rel="noreferrer" style="margin:10px 0; font-size:1.1em;color:#2186eb; text-decoration:underline; text-align:center">${gl(
            "configureNotifications"
          )}</a>
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
        <p style="font-size: 0.8em">
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
          ${gl("doNotReplyEmail")}
          </p>
       </div>`,
    });
    const notificationId =  `${profile?.uid}${new Date()?.getTime()}`;
    setDoc(
      doc(
        getFirestore(),
        "notifications",
        `${notificationId}`
      ),
      {
        id: notificationId,
        userId: profile?.uid,
        message,
        createdAt: new Date().getTime(),
        type: "notification",
      }
    );
    updateDoc(doc(getFirestore(), "users", profile?.uid), {
      notificationsCounter: increment(1),
    });
  };
  return {
    send,
  };
};
export default useSendNotificationEmail;
