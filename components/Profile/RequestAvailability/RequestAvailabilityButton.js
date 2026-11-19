import { RequestAvailabilityButtonStyles } from "./styles/RequestAvailabilityButtonStyles";
import Image from "next/image";
import DatePicker, { DateObject } from "react-multi-date-picker";
import getCalendarLocales from "../../../lib/getCalendarLocales";
import React, { useState, useEffect } from "react";
import "react-multi-date-picker/styles/colors/purple.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getFunctions, httpsCallable } from "firebase/functions";
import RequestButtonPlugin from "./RequestButtonPlugin";
import BasicModal from "../../UI/BasicModal";
import RequestAvailabilityTitle from "./RequestAvailabilityTitle";
import RequestAvailabilityCompleted from "./RequestAvailabilityCompleted";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore/lite";
import { i18n } from "next-i18next";
const RequestAvailabilityButton = ({ profile, user, t }) => {
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const [calendarAvailability, setCalendarAvailability] = useState();
  const [calendarLocales, setCalendarLocales] = useState();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const language = useSelector((state) => state.app.language);
  const requestAvailability = async (e) => {
    setLoading(true);
    let formattedAvailability = [];
    if (e) {
      e.map((date) => {
        if (date?.valueOf() > new Date().getTime()) {
          formattedAvailability?.push(
            new DateObject(new Date(date)).format("MM/DD/YYYY")
          );
        }
      });
    }
    if (formattedAvailability?.length > 0) {
      updateDoc(doc(getFirestore(), "users", profile?.uid), {
        availabilityRequest: arrayUnion({
          email: user?.email,
          language: language?.code,
        }),
      })
        .then(async () => {
          i18n.loadLanguages(
            profile?.language?.code === "zh-TW"
              ? "zh_tw"
              : profile?.language?.code === "zh-CN"
              ? "zh_cn"
              : profile?.language?.code === "fil"
              ? "tl"
              : profile?.language?.code
          );
          const gl = i18n.getFixedT(
            profile?.language?.code === "zh-TW"
              ? "zh_tw"
              : profile?.language?.code === "zh-CN"
              ? "zh_cn"
              : profile?.language?.code === "fil"
              ? "tl"
              : profile?.language?.code
          );
          const sentEmail = await sendEmail({
            to: profile?.email,
            sender: "noreply@dekitabi.com",
            subject: `dekitabi | ${gl("availabilityRequest")}`,
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
               ${gl("availabilityRequest")}</h1>
                <h2>${gl("hello")} ${
              profile?.firstname
                ? `${profile?.firstname} ${profile?.lastname}`
                : gl("guide")
            },</h2>
                <div style="margin: 0; line-height:20px; text-align:left; padding:20px; border-radius:10px; background:#ededed">
               <p style="margin:0 0 15px 0"><b>${gl(
                 "thanksUsingDekitabi"
               )}</b> ${gl(
              "requestedAvailabilityEmail"
            )}</p><p><b>${formattedAvailability?.map(
              (availability) => availability
            )}</b></p><p style="margin:15px 0 0 0">${gl(
              "requestedAvailabilityEmail2"
            )}<br/>${gl("requestedAvailabilityEmail3")}</p></div>
                <a href="https://www.dekitabi.com/${
                  profile?.username
                }" target="_blank" rel="noreferrer" style="display:block; margin:10px 0; padding:15px;font-size:1.1em;border-radius:5px; color:white; background:#2186eb; text-decoration:none; text-align:center">${gl(
              "goToProfile"
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
          setShowCompleteModal(true);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (language) {
      getCalendarLocales(language)
        .then((locales) => {
          setCalendarLocales(locales);
        })
        .catch((err) => console.log(err));
    }
  }, [language]);
  return (
    <RequestAvailabilityButtonStyles>
      <button className="normal-button" disabled={loading}>
        {loading ? (
          <Image
            src={`/img/icon-spinner.svg`}
            height={15}
            width={15}
            alt="requesting-tour-guide-availability"
          />
        ) : (
          <>
            <Image
              src="/img/icon-plus.svg"
              alt="request-dekitabi-tour-guide-availability"
              height={15}
              width={15}
            />
            {t("requestAvailability")}
          </>
        )}
      </button>
      <div className={`calendar`}>
        <DatePicker
          format="MM/DD/YYYY"
          className="purple rmdp-mobile"
          multiple
          value={calendarAvailability}
          onChange={requestAvailability}
          onClose={() => setCalendarAvailability([])}
          onOpen={() => setCalendarAvailability([])}
          locale={calendarLocales}
          mobileLabels={{
            OK: t("request"),
            CANCEL: t("cancel"),
          }}
          minDate={dayjs(new Date()).format("YYYY/MM/DD")}
          maxDate={dayjs(new Date())
            .startOf("day")
            .add(12, "months")
            .format("YYYY/MM/DD")}
          plugins={[
            <RequestButtonPlugin
              t={t}
              position="bottom"
              key={0}
              size="medium"
            />,
            <RequestAvailabilityTitle
              t={t}
              position="top"
              key={0}
              size="medium"
            />,
          ]}
        />
      </div>
      <BasicModal
        showModal={showCompleteModal}
        setShowModal={setShowCompleteModal}
      >
        <RequestAvailabilityCompleted t={t} />
      </BasicModal>
    </RequestAvailabilityButtonStyles>
  );
};
export default RequestAvailabilityButton;
