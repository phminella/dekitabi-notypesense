import {
  updateDoc,
  doc,
  getFirestore,
  getDoc,
  setDoc,
  arrayUnion,
  increment,
} from "firebase/firestore/lite";
import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useTranslation } from "next-i18next";
import axios from "axios";
import useDate from "./useDate";
import useChat from "./useChat";
import getConfirmTimeLimit from "./getConfirmTimeLimit";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setItineraries } from "../store/itinerarySlice";
import useLocalStorage from "./useLocalStorage";
import { getLanguageFlagAbsoluteSrc } from "./languageFlags";
const useTour = () => {
  const { i18n, t } = useTranslation();
  const itineraries = useSelector(
    (state) => state.itinerary.itineraries,
    shallowEqual
  );
  const dispatch = useDispatch();
  const { toTimeLength } = useDate();
  const { createChat, sendMessage } = useChat();
  const { getItem } = useLocalStorage();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  let db;
  let functions;
  let sendEmail;
  let pushNotification;
  let sendTask;
  let confirmTourFunction;
  let acceptTourFunction;
  try {
    db = getFirestore();
    functions = getFunctions(undefined, "asia-northeast1");
    pushNotification = httpsCallable(functions, "pushNotification");
    sendEmail = httpsCallable(functions, "sendEmail");
    sendTask = httpsCallable(functions, "sendTask");
    confirmTourFunction = httpsCallable(functions, "confirmTour");
    acceptTourFunction = httpsCallable(functions, "acceptTour");
  } catch (err) {
    console.log(err);
  }
  const createTour = async (
    language,
    currency,
    orderId,
    newItineraryId,
    itinerary,
    traveler,
    travelerEmail,
    paymentMethod,
    customerId,
    setProgress
  ) => {
    setLoading(true);
    const guideRef = doc(getFirestore(), "users", itinerary?.guide);
    const guideSnap = await getDoc(guideRef);
    const guide = guideSnap.data();
    await i18n.loadLanguages(
      guide?.language?.code === "zh-TW"
        ? "zh_tw"
        : guide?.language?.code === "zh-CN"
        ? "zh_cn"
        : guide?.language?.code === "fil"
        ? "tl"
        : guide?.language?.code
    );
    const gl = i18n.getFixedT(
      guide?.language?.code === "zh-TW"
        ? "zh_tw"
        : guide?.language?.code === "zh-CN"
        ? "zh_cn"
        : guide?.language?.code === "fil"
        ? "tl"
        : guide?.language?.code
    );
    const itineraryRef = doc(getFirestore(), "itineraries", itinerary?.id);
    const itinerarySnap = await getDoc(itineraryRef);
    const tempItinerary = itinerarySnap.data();
    const newItinerary = {
      ...tempItinerary,
      ...itinerary,
      url: "",
      attractions: tempItinerary?.attractions,
      id: newItineraryId,
      status: "pending",
      ...(!tempItinerary?.meetingPlace && {
        meetingPlace: {
          mapUrl: itinerary?.attractions[0]?.mapUrl,
          name: itinerary?.attractions[0]?.name,
          translatedName: itinerary?.attractions[0]?.translatedName,
        },
      }),
      ...(tempItinerary.meetingPlace?.name && {
        meetingPlace: tempItinerary?.meetingPlace}
      ),
      createdBy: traveler?.uid ? traveler?.uid : "Guest",
      travelerContact: travelerEmail,
      ...(!itinerary.tourBaseItinerary &&
        itinerary.published && { tourBaseItinerary: itinerary.id }),
      orderId,
      paymentMethod,
      customerId,
      createdAt: new Date().getTime(),
      language,
      currency,
      published: false,
      reviewed: false,
      ...(getItem("affiliateId") &&
        !itinerary?.coupon && { affiliateId: getItem("affiliateId") }),
    };
    console.log(newItinerary)
    let tempItineraries = [...itineraries];
    for (let i = 0; i < itineraries.length; i++) {
      if (itineraries[i]?.id === newItinerary?.id) {
        tempItineraries[i] = newItinerary;
        dispatch(setItineraries(tempItineraries));
        break;
      }
    }
    //
    // Send email to guide
    //
    const guideEmail = sendEmail({
      to: guide?.email,
      sender: "noreply@dekitabi.com",
      subject: `dekitabi | ${gl("newTourRequest")}`,
      body: `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
<div
  style="
    background: #f7f7f7;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
  "
>
  <div style="text-align: center; padding: 40px 0 20px 0">
    <img
      src="https://www.dekitabi.com/img/logo.png"
      height="45"
      width="141"
      alt="dekitabi"
    />
  </div>
  <section
    style="
      background: white;
      max-width: 600px;
      margin: 20px auto;
      border-top: 4px solid #03c03c;
      border-radius: 5px;
      padding: 20px;
      text-align: center;
    "
  >
    <h1 style="color: #03c03c; margin: 0">${gl("newTourRequest")}</h1>
    <h2>
      ${gl("hello")} ${
        guide.firstname
          ? `${guide?.firstname}
      ${guide?.lastname}`
          : gl("guide")
      },
    </h2>
    <p style="margin: 0 0 20px 0; text-align: left">
      <b>${gl("thanksUsingDekitabi")}</b> ${gl("newTourRequest")}. ${gl(
        getConfirmTimeLimit(newItinerary).isComingSoon
          ? "newTourRequestGuideMsg1Soon"
          : "newTourRequestGuideMsg1"
      )}
    </p>
    <p style="text-align: left">
      ${gl("newTourRequestGuideMsg2")} <br />${gl("newTourRequestGuideMsg3")}
      <br /><br />${gl("orderIdMsg")} <b>${orderId}</b>.
      <br /><br />${gl("goToDekitabiAccount")}
    </p>
    <a
      href="https://www.dekitabi.com/account/tours"
      target="_blank"
      rel="noreferrer"
      style="
        display: block;
        margin: 10px 0;
        padding: 15px;
        font-size: 1.1em;
        border-radius: 5px;
        color: white;
        background: #2186eb;
        text-align: center;
        text-decoration: none;
      "
      >${gl("myAccount")}</a
    >
  </section>
  <section
  style="
    background: white;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 5px;
  "
>
  <h3 style="margin: 0 0 15px 0; padding: 0 0 15px 0">${gl(
    "tourInformation"
  )}</h3>
  <a
    href="https://www.dekitabi.com/itinerary/${newItinerary.id}"
    target="_blank"
    rel="noreferrer"
    style="
      padding: 15px;
      font-size: 1.1em;
      border-radius: 5px;
      color: white;
      background: #2186eb;
      text-decoration: none;
    "
    >${gl("viewItinerary")}</a
  >
  <ul style="padding: 0; margin: 15px 0 0 0; list-style: none">
    <li
      style="
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("travelerContact")}:</p>
      <p style="margin: 0">
        <b
          >${
            traveler === "Guest"
              ? travelerEmail
              : `dekitabi ${gl("chat")}:${
                  traveler?.firstname
                    ? `${traveler?.firstname} ${traveler?.lastname}`
                    : traveler?.username
                }`
          }</b
        >
      </p>
    </li>
    <li
      style="
        border-bottom: 1px solid lightgray;
        padding: 12px 0;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("transportationIncluded")}:</p>
      <p style="margin: 0; font-weight: bold">
        <span
          style="
            border-radius: 5px;
            padding: 3px 5px;
            background: #f3f3f3;
            font-size: 0.9em;
          "
        >
          ${
            newItinerary?.transportIncluded
              ? `<img
            src="https://www.dekitabi.com/img/icon-car.png"
            height="15px"
            width="20px"
            style="vertical-align: middle; margin-top: -3px"
          />
          ${gl("yes")} `
              : `<img
            src="https://www.dekitabi.com/img/icon-close.png"
            height="15px"
            width="15px"
            style="vertical-align: middle; margin-top: -3px"
          />
          ${gl("no")} `
          }
        </span>
      </p>
    </li>
    <li
      style="
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("primaryLanguage")}:</p>
      <p style="margin: 0; font-weight: bold">
        <span
          style="
            border-radius: 5px;
            padding: 3px 5px;
            background: #f3f3f3;
            font-size: 0.9em;
          "
          ><img
            src="${getLanguageFlagAbsoluteSrc(newItinerary?.primaryLanguage)}"
            height="15px"
            width="20px"
            style="vertical-align: middle; margin-top: -3px"
          />
          ${newItinerary?.primaryLanguage}</span
        >
      </p>
    </li>
    <li
      style="
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("date")}:</p>
      <p style="margin: 0; font-weight: bold">
        ${
          (new Date(newItinerary.date).getMonth() > 8
            ? new Date(newItinerary.date).getMonth() + 1
            : "0" + (new Date(newItinerary.date).getMonth() + 1)) +
          "/" +
          (new Date(newItinerary.date).getDate() > 9
            ? new Date(newItinerary.date).getDate()
            : "0" + new Date(newItinerary.date).getDate()) +
          "/" +
          new Date(newItinerary.date).getFullYear()
        }
      </p>
    </li>
    <li
      style="
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("startTime")}:</p>
      <p style="margin: 0; font-weight: bold">${newItinerary.startTime}</p>
    </li>
    <li
      style="
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("duration")}:</p>
      <p style="margin: 0; font-weight: bold">
        ${toTimeLength(newItinerary.duration, newItinerary.language.code)}
      </p>
    </li>
    <li
      style="
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("persons")}:</p>
      <p style="margin: 0; font-weight: bold">${newItinerary.person}</p>
    </li>
    <li
      style="
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("meetingPlace")}:</p>
      <p style="margin: 0; font-weight: bold">
        ${
          newItinerary.meetingPlace
            ? newItinerary.meetingPlace.translatedName
              ? newItinerary.meetingPlace.translatedName[guide?.language?.code]
              : newItinerary.meetingPlace.name
            : newItinerary.attractions[0].translatedName
            ? newItinerary.attractions[0].translatedName[guide?.language?.code]
            : newItinerary.attractions[0].name
        }
        <a
          href="${
            newItinerary.meetingPlace
              ? `${newItinerary?.meetingPlace?.mapUrl}&hl=${guide?.language?.code}`
              : `${itinerary?.attractions[0]?.mapUrl}&hl=${guide?.language?.code}`
          }"
          target="_blank"
          rel="noreferrer"
          style="color: #2186eb"
          >${gl("viewWithGoogleMaps")}</a
        >
      </p>
    </li>
    <li
      style="
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        margin-left: 0;
      "
    >
      <p style="margin: 0 0 5px 0">${gl("price")}:</p>
      <p style="font-size: 1.2em; margin: 0; font-weight: bold">
        <b
          >JPY${newItinerary.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b
        >
      </p>
    </li>
  </ul>
  <div style="padding: 10px 0 20px 0">
    <p style="margin: 0">
      ${gl("acceptOrRejectMsg")}
      <a
        href="https://www.dekitabi.com/account/tours"
        target="_blank"
        rel="noreferrer"
        style="color: #2186eb"
        >${gl("goToAccount")}</a
      >. ${gl("orButtonsBellow")}
    </p>
    <div style="font-size: 0.9em; margin-top: 15px; padding-top: 10px">
      <a
        href="https://www.dekitabi.com/confirm-tour/${newItinerary.id}"
        target="_blank"
        rel="noreferrer"
        style="
          background: #03c03c;
          padding: 15px;
          border-radius: 5px;
          color: white;
          text-decoration: none;
          font-size: 1.2em;
        "
        >${gl("accept")}</a
      >
      <a
        href="https://www.dekitabi.com/cancel-tour/${newItinerary.id}PyCaRABa"
        target="_blank"
        rel="noreferrer"
        style="
          background: red;
          padding: 15px;
          border-radius: 5px;
          color: white;
          text-decoration: none;
          font-size: 1.2em;
        "
        >${gl("reject")}</a
      >
    </div>
  </div>
</section>
  <section
    style="
      max-width: 600px;
      margin: 0 auto;
      position: relative;
      padding: 0 10px;
    "
  >
    <div>
      <img src="https://www.dekitabi.com/img/logo.png" height="30" width="90" />
      <ul
        style="
          margin: 10px 0 0 0;
          list-style: none;
          float: right;
          display: block;
        "
      >
        <li style="display: inline; margin-left: 5px">
          <a
            href="https://www.instagram.com/dekitabi"
            target="_blank"
            rel="noreferrer"
            style="text-decoration: none"
          >
            <img
              src="https://www.dekitabi.com/img/icon-instagram.png"
              alt="instagram"
              height="20"
              width="20"
            />
          </a>
        </li>
        <li style="display: inline; margin-left: 5px">
          <a
            href="https://www.facebook.com/dekitabi"
            target="_blank"
            rel="noreferrer"
            style="text-decoration: none"
          >
            <img
              src="https://www.dekitabi.com/img/icon-facebook.png"
              alt="facebook"
              height="20"
              width="20"
            />
          </a>
        </li>
        <li style="display: inline; margin-left: 5px">
          <a
            href="https://www.threads.net/@dekitabi"
            target="_blank"
            rel="noreferrer"
            style="text-decoration: none"
          >
            <img
              src="https://www.dekitabi.com/img/icon-threads.png"
              alt="threads"
              height="20"
              width="20"
            />
          </a>
        </li>
        <li style="display: inline; margin-left: 5px">
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
        style="margin-right: 5px; text-decoration: none"
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
      background: white;
      text-align: center;
    "
  >
    ${gl("doNotReplyEmail")}
  </p>
</div>
`,
    });
    setProgress(4);
    return sendTask({
      taskDate: !getConfirmTimeLimit(newItinerary).isComingSoon
        ? Math.ceil(Date.now() / 1000) + 48 * 60 * 60
        : getConfirmTimeLimit(newItinerary).time,
      firebaseFunctionUrl:
        "https://asia-northeast1-dekitabi.cloudfunctions.net/cancelTour",
      taskFunctionArgs: {
        user: newItinerary.createdBy,
        tour: newItinerary,
        reason: "auto-cancel",
        isGuide: true,
        fromTask: true,
      },
    }).then(async (taskData) => {
      console.log(newItinerary);
      return setDoc(
        doc(db, "itineraries", newItinerary.id),
        {
          ...newItinerary,
          cancelTourTaskName: taskData?.data?.response?.name,
        },
        {
          merge: true,
        }
      ).then(async () => {
        // Update Guides booked tours
        const guideNotificationId = `${newItineraryId}${newItinerary.guide}${new Date().getTime()}`;
        setDoc(
          doc(
            db,
            "notifications",
            `${guideNotificationId}`
          ),
          {
            userId: newItinerary.guide,
            id: guideNotificationId,
            newItineraryId: newItinerary.id,
            createdAt: new Date().getTime(),
            type: "tour",
          }
        );
        return updateDoc(doc(db, "users", newItinerary.guide), {
          notificationsCounter: increment(1),
        })
          .then(async () => {
            if (traveler?.uid) {
              createChat(newItinerary.guide, traveler?.uid, false).then(() => {
                sendMessage(
                  traveler,
                  guide,
                  traveler,
                  t("chatTourRequest", {
                    itineraryId: newItinerary.id,
                    itineraryName: newItinerary.name,
                  }),
                  guide?.chats?.findIndex(
                    (chat) => chat.chatUser === traveler?.uid
                  ) === -1
                    ? [newItinerary?.guide]
                    : []
                ).then(() => console.log("msg sent"));
              });
              // Update notification
        const travelerNotificationId = `${newItineraryId}${traveler?.uid}${new Date().getTime()}`;
              setDoc(
                doc(
                  db,
                  "notifications",
                  `${travelerNotificationId}`
                ),
                {
                  userId: traveler?.uid,
                  id: travelerNotificationId,
                  message: `<a href="/itinerary/${newItinerary.id}"><b>${
                    newItinerary.name
                  }</b></a><br/>
                  ${t(
                    getConfirmTimeLimit(newItinerary).isComingSoon
                      ? "tourRequestNotificationTravelerSoon"
                      : "tourRequestNotificationTraveler"
                  )}`,
                  createdAt: new Date().getTime(),
                  type: "notification",
                }
              );
              return updateDoc(doc(db, "users", traveler?.uid), {
                booked: arrayUnion(newItinerary.guide),
                notificationsCounter: increment(1),
                ordersCounter: increment(1),
              })
                .then(async () => {
                  setLoading(false);
                  return true;
                  // return pushNotification({
                  //   title: gl("newNotification"),
                  //   body: gl("newTourRequest"),
                  //   link: "https://www.dekitabi.com/account/tours",
                  //   tokens: guide.firebaseMessagingTokens
                  //     ? guide.firebaseMessagingTokens
                  //     : [],
                  //   recipient: guide.uid,
                  // })
                  //   .then(() => {
                  //     setLoading(false);
                  //     return true;
                  //   })
                  //   .catch((err) => console.log(err));
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                  return true;
                });
            } else {
              setLoading(false);
              setProgress(4);
              return true;
              // return pushNotification({
              //   title: gl("newNotification"),
              //   body: gl("newTourRequest"),
              //   link: "https://www.dekitabi.com/account/tours",
              //   tokens: guide.firebaseMessagingTokens
              //     ? guide.firebaseMessagingTokens
              //     : [],
              //   recipient: guide.uid,
              // })
              //   .then((ok) => {
              //     console.log(ok);
              //     setProgress(4);
              //     return true;
              //   })
              //   .catch((err) => console.log(err));
            }
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            return false;
          });
      });
    });
  };
  //
  // Payment Email
  //
  //
  const acceptTour = async (user, tour) => {
    return acceptTourFunction({ user, tour }).then(async (data) => {
      if (data?.data?.result === true) {
        return true;
      } else {
        const sentEmail = await sendEmail({
          to: "contact@dekitabi.com",
          sender: "contact@dekitabi.com",
          subject: `dekitabi | Accept Tour error`,
          body: `itineraryId: ${tour?.id} error: ${JSON.stringify(
            data
          )} time: ${new Date()}`,
        });
        return false;
      }
    });
  };
  //
  //
  // Confirm Tour
  //
  //
  const confirmTour = async (user, tour, paymentIntent) => {
    return confirmTourFunction({ user, tour, paymentIntent }).then(
      async (data) => {
        if (data?.data?.result === true) {
          return true;
        } else {
          const sentEmail = await sendEmail({
            to: "contact@dekitabi.com",
            sender: "contact@dekitabi.com",
            subject: `dekitabi | Confirm error`,
            body: `itineraryId: ${tour?.id} error: ${JSON.stringify(
              data
            )} time: ${new Date()}`,
          });
          return false;
        }
      }
    );
  };
  //
  //
  // Cancel Tour
  //
  //
  const cancelTour = async (tour, reason, isGuide = false) => {
    console.log(tour, reason, isGuide);
    setLoading(true);
    return axios({
      method: "post",
      url: `https://asia-northeast1-dekitabi.cloudfunctions.net/cancelTour`,
      data: { tour, reason, isGuide },
    })
      .then((data) => {
        console.log(data);
        let tempItineraries = [...itineraries];
        for (let i = 0; i < itineraries.length; i++) {
          if (tempItineraries[i]?.id === tour?.id) {
            tempItineraries[i] = { ...tempItineraries[i], status: false };
            dispatch(setItineraries(tempItineraries));
            break;
          }
        }
        setLoading(false);
        return data;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        return false;
      });
    // Delete Chat
  };
  return {
    progress,
    loading,
    createTour,
    acceptTour,
    confirmTour,
    cancelTour,
  };
};
export default useTour;
