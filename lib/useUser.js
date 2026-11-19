import { useSelector, shallowEqual } from "react-redux";
import { useState } from "react";
import {
  OAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  updateEmail,
  browserPopupRedirectResolver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
  where,
  getDocs,
  collection,
  query,
} from "firebase/firestore/lite";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useRouter } from "next/router";
import useAuth from "./useAuth";
import { useTranslation } from "next-i18next";
const useUser = () => {
  let functions;
  let createStripeAccount;
  let updateStripeAccount;
  let deleteStripeAccount;
  let createStripeCustomer;
  let updateStripeCustomer;
  let deleteStripeCustomer;
  let sendEmail;
  let auth;
  try {
    auth = getAuth();
    functions = getFunctions(undefined, "asia-northeast1");
    createStripeAccount = httpsCallable(functions, "createStripeAccount");
    updateStripeAccount = httpsCallable(functions, "updateStripeAccount");
    deleteStripeAccount = httpsCallable(functions, "deleteStripeAccount");
    createStripeCustomer = httpsCallable(functions, "createStripeCustomer");
    updateStripeCustomer = httpsCallable(functions, "updateStripeCustomer");
    deleteStripeCustomer = httpsCallable(functions, "deleteStripeCustomer");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [complete, setComplete] = useState();
  const language = useSelector((state) => state.app.language, shallowEqual);
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const cart = useSelector((state) => state.app.cart, shallowEqual);
  const user = useSelector((state) => state.app.user, shallowEqual);
  const { signOff } = useAuth();
  const itineraries = useSelector(
    (state) => state.itinerary.itineraries,
    shallowEqual
  );
  const sendAffiliateEmail = async (email, id, stripe) => {
    sendEmail({
      to: email,
      sender: "noreply@dekitabi.com",
      subject: `dekitabi | A guide has signed up`,
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
           A guide has signed up</h1>
            <h2>Hello!</h2>
            <p style="margin: 0 0 20px 0; line-height:20px; text-align:left; padding:20px; border-radius:10px; background:#ededed">
            <b>Thanks for supporting dekitabi!</b> A guide has signed up using your coupon. You can check more details about his profile at your affiliate account page using the link below. For the guide's first 5 completed tours you will receive 5% of his guide fee.${
              !stripe
                ? "<br/><br/>The fee will be transferred to your dekitabi balance in Japanese Yen. When we send your balance through PayPal, the currency rate of the day will apply."
                : "<br/><br/>The fee will be transferred to your dekitabi balance. Every friday your dekitabi balance will be deposited into your registered bank account."
            }</p>
            <a href="https://www.dekitabi.com/affiliate/${id}" target="_blank" rel="noreferrer" style="display:block; margin:10px 0; padding:15px;font-size:1.1em;border-radius:5px; color:white; background:#2186eb; text-decoration:none; text-align:center">
             Affiliate Account</a>
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
           This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.
            </p>
         </div>`,
    });
  };
  const setNewUser = async (result, guide, country, affiliateId, shopId) => {
    let stripeAccount = {};
    let stripeCustomer = {};
    let tempItineraries = await Promise.all(
      itineraries.map((itinerary) => itinerary.id)
    );
    if (guide || shopId) {
      // const ip = await axios.get("https://geolocation-db.com/json/");
      try {
        stripeAccount = await createStripeAccount({
          email: result.user.email,
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (!guide && !shopId) {
      try {
        stripeCustomer = await createStripeCustomer({
          email: result.user.email,
          preferred_locales: [language.code],
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (
      (!stripeCustomer && !guide && !shopId) ||
      (!stripeAccount && (guide || shopId))
    ) {
      return false;
    } else {
      return shopId
        ? {
            name: shopId,
            chats: [],
            shopId: shopId
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s\s+/g, " ")
              .toLowerCase()
              .trim()
              .split(" ")
              .join("-"),
            url: shopId
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s\s+/g, " ")
              .toLowerCase()
              .trim()
              .split(" ")
              .join("-"),
            guide: "true",
            viewCounter: 0,
            bookingCounter: 0,
            shopFee: 8,
            activities: [],
            itineraries: [],
            address: "",
            languages: [
              "en",
              "ja",
              "zh-CN",
              "zh-TW",
              "ko",
              "fil",
              "th",
              "vi",
              "ms",
              "fr",
              "es",
              "it",
              "pt",
              "id",
            ],
            cancellationPolicy: [],
            contactEmail: "",
            description: "",
            photos: [],
            openingHours: {
              0: ["09:00", "22:00"],
              1: ["09:00", "22:00"],
              2: ["09:00", "22:00"],
              3: ["09:00", "22:00"],
              4: ["09:00", "22:00"],
              5: ["09:00", "22:00"],
              6: ["09:00", "22:00"],
            },
            phoneNumber: "",
            serviceLanguages: ["日本語"],
            website: "",
            email: result?.user?.email,
            uid: result.user.uid,
            stripeUnverified: "true",
            stripeAccountId: stripeAccount.data.id,
            stripeAccountRequirements: stripeAccount.data.requirements,
            stripeFirstTime: true,
            createdAt: new Date().getTime(),
            lastVisit: new Date().getTime(),
            sample: true,
            itineraries: tempItineraries || [],
            language: language
              ? language
              : {
                  language: "English",
                  code: "en",
                },
          }
        : {
            ...(affiliateId && {
              affiliateId,
              couponsLeft: 5,
            }),
            ...(guide && {
              acceptTourFrom: 0,
              newUser: true,
              completedTours: 0,
              stripeAccountId: stripeAccount.data.id,
              stripeAccountRequirements: stripeAccount.data.requirements,
              stripeFirstTime: true,
              licensed: "false",
              bg: "bg9",
              maxPeople: 10,
              tours: [],
              availability: [],
              states: [],
              country,
              canDrive: "false",
              verified: "false",
              stripeUnverified: "true",
              replyTime: 0,
              replyTimeList: [],
              fee: {
                halfDay: 500,
                fullDay: 1000,
              },
              getCards: true,
              firebaseLanguages: [
                "en",
                "ja",
                "zh-CN",
                "zh-TW",
                "ko",
                "fil",
                "th",
                "vi",
                "ms",
                "fr",
                "es",
                "it",
                "pt",
                "id",
              ],
              description: "",
              contact: {
                line: "",
                phone: "",
                email: "",
                whatsapp: "",
                kakao: "",
                skype: "",
                qq: "",
                wechat: "",
              },
              socialMedia: {
                facebook: "",
                instagram: "",
                youtube: "",
                weibo: "",
                twitter: "",
                tiktok: "",
                substack: "",
                linkedin: "",
              },
              photos: [],
              ratings: [],
              ratingScore: 0,
              ratingCounter: 0,
            }),
            avatar: "/img/avatar.png",
            likesCounter: 0,
            uid: result.user.uid,
            username: guide
              ? t("guide") + "-" + result.user.uid.slice(0, 5)
              : t("traveler") + "-" + result.user.uid.slice(0, 5),
            guide: guide ? "true" : "false",
            email: result.user.email,
            ...(!guide && {
              cart,
              stripeCustomerId: stripeCustomer.data.id,
              ordersCounter: 0,
              booked: [],
            }),
            chats: [],
            firstname: "",
            lastname: "",
            createdAt: new Date().getTime(),
            currency: currency || {
              currency: "Japanese Yen",
              code: "JPY",
              symbol: "¥",
              rate: 1,
            },
            lastVisit: new Date().getTime(),
            itineraries: tempItineraries || [],
            language: language
              ? language
              : {
                  language: "English",
                  code: "en",
                },
            languages: [],
            notificationsCounter: 0,
            notificationsSettings: {
              availabilityReminder: false,
              chatMessage: true,
              itineraryComment: false,
              itineraryLike: false,
              profileVisit: false,
            },
            firebaseMessagingTokens: [],
          };
    }
  };
  const sendTravelerSignUpEmail = (travelerEmail) => {
    if (
      sendEmail({
        to: travelerEmail,
        sender: "noreply@dekitabi.com",
        subject: `dekitabi | ${t("thanksForSignUp")}`,
        body: `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
<div
  style="
    background: #f7f7f7;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
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
    <h1 style="color: #03c03c; margin: 0">${t("thanksForSignUp")}</h1>
    <h3>${t("getStarted")}</h3>
    <p style="margin: 0 0 20px 0; text-align: left">${t("whyDekitabiMsg1")}</p>
    <ul style="text-align: left">
      <li>${t("whyDekitabiMsg2")}</li>
      <li>${t("whyDekitabiMsg3")}</li>
      <li>${t("whyDekitabiMsg4")}</li>
    </ul>
    <p style="margin: 0 0 20px 0; text-align: left">${t("whyDekitabiMsg5")}</p>
    <a
      href="https://www.dekitabi.com/"
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
      >${t("startTrip")}</a
    >
    <p style="text-align: left">${t("followUs")}</p>
    <ul
      style="
        margin: 0;
        list-style: none;
        display: block;
        text-align: left;
        padding: 0;
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
    <p style="margin: 20px 0 20px 0; text-align: left">
      ${t("contactFormMsg")}
    </p>
    <p style="text-align: left">${t("thanksUsingDekitabi")}</p>
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
    ${t("doNotReplyEmail")}
  </p>
</div>
`,
      })
    ) {
      return true;
    } else {
      return false;
    }
  };
  const sendGuideSignUpEmail = (guideEmail) => {
    if (
      sendEmail({
        to: guideEmail,
        sender: "noreply@dekitabi.com",
        subject: `dekitabi | ${t("thanksForSignUp")}`,
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
          <h1 style="color: #03c03c; margin: 0">
              ${t("thanksForSignUp")}
          </h1>
          <h3>${t("getReady")}</h3>
          <p style="margin: 0 0 20px 0; text-align: left">
            ${t("getReadyMsg")}</p>
            <ul style="text-align:left">
              <li>${t("getReady1")}</li>
              <li>${t("getReady2")}</li>
              <li>${t("getReady3")}</li>
            </ul>
            <a
            href="https://www.dekitabi.com/verify-with-stripe"
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
             ">${t("verifyIdentity")}</a>
          <p style="text-align: left; font-size:18px; margin-top:20px; padding-top:20px; border-top:1px solid black">dekitabi.com/ <b style="color:#2186eb">${t(
            "yourChoice"
          )}</b></p>
          <p style="text-align: left">${t("dontForgetUsername")}<br/><br/>${t(
          "dontForgetUsername2"
        )}<br/><br/>
        <i>${t("testMsg2")}
        <br/><br/> ${t("joinFbGroup")}
        <br/><br/><a
        href="https://www.facebook.com/groups/dekitabi.guides/"
        target="_blank"
        rel="noreferrer"
      >https://www.facebook.com/groups/dekitabi.guides/
      </a><br/><br/><b>${t("thanksUsingDekitabi")}</b></p>    
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
            background: white;
            text-align: center;
          "
        >
          ${t("doNotReplyEmail")}
        </p>
      </div>`,
      })
    ) {
      return true;
    } else {
      return false;
    }
  };
  const federatedSignIn = async (signinProvider, guide, country, affiliate) => {
    setLoading(true);
    setError(false);
    const addUserToDb = async (result) => {
      const user = result.user;
      return getDoc(doc(getFirestore(), "users", user?.uid))
        .then(async (res) => {
          if (!res.exists()) {
            return setNewUser(result, guide, country, affiliate?.id)
              .then(async (newUserData) => {
                if (newUserData) {
                  return setDoc(
                    doc(getFirestore(), "users", result.user.uid),
                    newUserData
                  )
                    .then(async () => {
                      setLoading(false);
                      if (newUserData?.guide === "true") {
                        if (affiliate?.id) {
                          const affiliateEmail = await sendAffiliateEmail(
                            affiliate?.email,
                            affiliate?.id,
                            affiliate?.stripeAccountId
                          );
                        }
                        if (sendGuideSignUpEmail(newUserData?.email)) {
                          return newUserData;
                        } else {
                          const auth = getAuth();
                          const user = auth.currentUser;
                          deleteUser(user);
                          console.log(error);
                          setError(error?.message?.split("(")[1].split(")")[0]);
                          setLoading(false);
                        }
                      } else {
                        if (sendTravelerSignUpEmail(newUserData?.email)) {
                          return newUserData;
                        }
                      }
                    })
                    .catch((error) => {
                      const auth = getAuth();
                      const user = auth.currentUser;
                      deleteUser(user);
                      console.log(error);
                      setError(error?.message?.split("(")[1].split(")")[0]);
                      setLoading(false);
                    });
                } else {
                  const auth = getAuth();
                  const user = auth.currentUser;
                  deleteUser(user);
                  setLoading(false);
                  return false;
                }
              })
              .catch((error) => {
                const auth = getAuth();
                const user = auth.currentUser;
                deleteUser(user);
                console.log(error);
                setLoading(false);
                if (
                  error?.code === "ERR_NETWORK" ||
                  !error?.message?.split("(")[1]
                ) {
                  setError("errorMsg");
                } else {
                  setError(error?.message?.split("(")[1].split(")")[0]);
                }
              });
          } else {
            return res.data();
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (error?.code === "ERR_NETWORK" || !error?.message?.split("(")[1]) {
            setError("errorMsg");
          } else {
            setError(error?.message?.split("(")[1].split(")")[0]);
          }
        });
    };
    let provider = null;
    auth.useDeviceLanguage();
    if (signinProvider === "Facebook") {
      provider = new FacebookAuthProvider();
      provider.setCustomParameters({
        display: "popup",
      });
    } else if (signinProvider === "Google") {
      provider = new GoogleAuthProvider();
    } else if (signinProvider === "Apple") {
      provider = new OAuthProvider("apple.com");
      provider.setCustomParameters({
        // Localize the Apple authentication screen in French.
        locale: language?.code,
      });
      provider.addScope("email");
    }
    return signInWithPopup(auth, provider, browserPopupRedirectResolver)
      .then(async (result) => {
        return addUserToDb(result);
      })
      .catch((error) => {
        console.log(error?.message);
        setLoading(false);
        if (error?.code === "ERR_NETWORK" || !error?.message?.split("(")[1]) {
          setError(error?.message);
        } else {
          setError(error?.message?.split("(")[1].split(")")[0]);
        }
      });
  };
  //
  // Sign up
  //
  const signUp = async (guide, email, password, country, affiliate, shopId) => {
    setLoading(true);
    setError(false);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        return setNewUser(result, guide, country, affiliate?.id, shopId)
          .then(async (newUserData) => {
            if (newUserData) {
              if (shopId) {
                return setDoc(
                  doc(getFirestore(), "shops", result.user.uid),
                  newUserData
                )
                  .then(async () => {
                    setError("");
                    setLoading(false);
                    return newUserData;
                  })
                  .catch((error) => {
                    const auth = getAuth();
                    const user = auth.currentUser;
                    deleteUser(user);
                    console.log(error);
                    setLoading(false);
                    if (
                      error?.code === "ERR_NETWORK" ||
                      !error?.message?.split("(")[1]
                    ) {
                      setError("errorMsg");
                    } else {
                      setError(error?.message?.split("(")[1].split(")")[0]);
                    }
                  });
              } else {
                return setDoc(
                  doc(getFirestore(), "users", result.user.uid),
                  newUserData
                )
                  .then(async () => {
                    setError("");
                    setLoading(false);
                    if ("Notification" in window) {
                      Notification?.requestPermission();
                    }
                    if (newUserData?.guide === "true") {
                      if (affiliate?.id) {
                        const affiliateEmail = await sendAffiliateEmail(
                          affiliate?.email,
                          affiliate?.id,
                          affiliate?.stripeAccountId
                        );
                      }
                      if (sendGuideSignUpEmail(newUserData?.email)) {
                        return newUserData;
                      } else {
                        const auth = getAuth();
                        const user = auth.currentUser;
                        deleteUser(user);
                        console.log(error);
                        setLoading(false);
                        if (
                          error?.code === "ERR_NETWORK" ||
                          !error?.message?.split("(")[1]
                        ) {
                          setError("errorMsg");
                        } else {
                          setError(error?.message?.split("(")[1].split(")")[0]);
                        }
                      }
                    } else {
                      if (sendTravelerSignUpEmail(newUserData?.email)) {
                        return newUserData;
                      }
                    }
                  })
                  .catch((error) => {
                    const auth = getAuth();
                    const user = auth.currentUser;
                    deleteUser(user);
                    console.log(error);
                    setLoading(false);
                    if (
                      error?.code === "ERR_NETWORK" ||
                      !error?.message?.split("(")[1]
                    ) {
                      setError("errorMsg");
                    } else {
                      setError(error?.message?.split("(")[1].split(")")[0]);
                    }
                  });
              }
            } else {
              const auth = getAuth();
              const user = auth.currentUser;
              deleteUser(user);
              setLoading(false);
            }
          })
          .catch((error) => {
            const auth = getAuth();
            const user = auth.currentUser;
            deleteUser(user);
            console.log(error);
            setLoading(false);
            if (
              error?.code === "ERR_NETWORK" ||
              !error?.message?.split("(")[1]
            ) {
              setError("errorMsg");
            } else {
              setError(error?.message?.split("(")[1].split(")")[0]);
            }
          });
      })
      .catch((error) => {
        console.log(error?.message);
        setLoading(false);
        if (error?.code === "ERR_NETWORK" || !error?.message?.split("(")[1]) {
          setError(error?.message ? error?.message : "errorMsg");
        } else {
          setError(error?.message?.split("(")[1].split(")")[0]);
        }
      });
  };
  //
  // Sign in
  //
  const signIn = async (email, password) => {
    setLoading(true);
    setError(false);
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setLoading(false);
        return true;
      })
      .catch((error) => {
        console.log(error);
        setError(error?.message?.split("(")[1].split(")")[0]);
        setLoading(false);
      });
  };
  const resetPassword = async (email) => {
    auth.languageCode = language.code;
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        setComplete(true);
        return true;
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.message?.split("(")[1].split(")")[0]);
        // ..
      });
  };
  const updateAuthEmail = async (email, password) => {
    const userRef = doc(getFirestore(), "users", user?.uid);
    return updateEmail(auth.currentUser, email)
      .then((res) => {
        setError("");
        updateDoc(userRef, { email });
        if (user?.guide === "true") {
          updateStripeAccount({
            id: user?.stripeAccountId,
            updatedData: { email },
          });
        } else {
          updateStripeCustomer({
            id: user?.stripeCustomerId,
            updatedData: { email },
          });
          return true;
        }
      })
      .catch(async (error) => {
        if (
          error.message === "Firebase: Error (auth/requires-recent-login)." ||
          error.message ===
            "Firebase: Please verify the new email before changing email. (auth/operation-not-allowed)."
        ) {
          setError("Confirm login to change your password");
          if (auth.currentUser.providerData[0].providerId === "google.com") {
            if (await federatedSignIn("Google")) {
              return updateEmail(auth.currentUser, email)
                .then(async (res) => {
                  setError("");
                  updateDoc(userRef, { email });
                  return true;
                })
                .catch((err) => console.log(err));
            }
          }
          if (auth.currentUser.providerData[0].providerId === "facebook.com") {
            if (await federatedSignIn("Facebook")) {
              return updateEmail(auth.currentUser, email)
                .then(async (res) => {
                  updateDoc(userRef, { email });
                  setError("");
                  return true;
                })
                .catch((err) => console.log(err));
            }
          }
          if (auth.currentUser.providerData[0].providerId === "password") {
            const credential = EmailAuthProvider.credential(
              user.email,
              password
            );
            // Now you can use that to reauthenticate
            return reauthenticateWithCredential(auth.currentUser, credential)
              .then(async (res) => {
                return updateEmail(auth.currentUser, email)
                  .then(async (res) => {
                    updateDoc(userRef, { email });
                    setError("");
                    return true;
                  })
                  .catch((error) => {
                    setError(error?.message?.split("(")[1].split(")")[0]);
                  });
              })
              .catch((error) => {
                setError(error?.message?.split("(")[1].split(")")[0]);
              });
          }
        } else {
          setError(error?.message?.split("(")[1].split(")")[0]);
        }
      });
  };
  const updateAuthPassword = async (password, oldPassword) => {
    return updatePassword(auth.currentUser, password, oldPassword)
      .then(async (res) => {
        return true;
      })
      .catch(async (error) => {
        console.log(error);
        if (
          error.message === "Firebase: Error (auth/requires-recent-login)." ||
          error.message ===
            "Firebase: Please verify the new email before changing email. (auth/operation-not-allowed)."
        ) {
          setError("oldPasswordInput");
          if (auth.currentUser.providerData[0].providerId === "google.com") {
            if (await federatedSignIn("Google")) {
              return updatePassword(auth.currentUser, password)
                .then(async (res) => {
                  setError("");
                  return true;
                })
                .catch((err) => console.log(err));
            }
          }
          if (auth.currentUser.providerData[0].providerId === "facebook.com") {
            if (await federatedSignIn("Facebook")) {
              return updatePassword(auth.currentUser, password)
                .then(async (res) => {
                  setError("");
                  return true;
                })
                .catch((err) => console.log(err));
            }
          }
          if (auth.currentUser.providerData[0].providerId === "password") {
            const credential = EmailAuthProvider.credential(
              user.email,
              oldPassword
            );
            // Now you can use that to reauthenticate
            if (
              await reauthenticateWithCredential(auth.currentUser, credential)
            ) {
              return updatePassword(auth.currentUser, password)
                .then(async (res) => {
                  setError("");
                  return true;
                })
                .catch((err) => console.log(err));
            }
          }
        } else {
          setError(error?.message?.split("(")[1].split(")")[0]);
        }
        return false;
      });
  };
  const deleteAccount = async (user, password) => {
    const deleteUserFromFirebase = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      return deleteUser(currentUser)
        .then(() => {
          return true;
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
    };
    const itinerariesQ = query(
      collection(getFirestore(), "itineraries"),
      where("createdBy", "==", user?.uid)
    );
    const itinerariesQSnap = await getDocs(itinerariesQ);
    itinerariesQSnap.forEach(async (itinerary) => {
      if (itinerary?.data().published === true) {
        deleteDoc(doc(getFirestore(), "tours", itinerary?.data().id));
      }
      if (!itinerary?.data()?.status) {
        deleteDoc(doc(getFirestore(), "itineraries", itinerary?.data().id));
      }
    });
    if (user?.guide === "true") {
      if (user?.photos?.length > 0) {
        const deletedPhotos = await user?.photos?.map((photo) => {
          const fileRef = ref(getStorage(), photo?.url ? photo?.url : photo);
          deleteObject(fileRef);
        });
      }
      deleteStripeAccount(user?.stripeAccountId)
        .then(() => {
          deleteDoc(doc(getFirestore(), "users", user?.uid))
            .then(async () => {
              deleteUserFromFirebase()
                .then(() => {
                  signOff()
                    .then(() => {
                      router.push("/");
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      deleteStripeCustomer(user?.stripeCustomerId)
        .then(() => {
          deleteDoc(doc(getFirestore(), "users", user?.uid))
            .then(async () => {
              deleteUserFromFirebase()
                .then(() => {
                  signOff()
                    .then(() => {
                      router.push("/");
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };
  return {
    user,
    loading,
    complete,
    error,
    federatedSignIn,
    signUp,
    signIn,
    resetPassword,
    updateAuthEmail,
    updateAuthPassword,
    deleteAccount,
  };
};
export default useUser;
