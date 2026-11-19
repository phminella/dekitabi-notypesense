import { HeaderAvailabilityStyles } from "./styles/HeaderAvailabilityStyles";
import DatePicker, { DateObject } from "react-multi-date-picker";
import getCalendarLocales from "../../lib/getCalendarLocales";
import HeaderAvailabilityPlugin from "./HeaderAvailabilityPlugin";
import "react-multi-date-picker/styles/colors/purple.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import React, { useEffect, useMemo, useState } from "react";
import {
  doc,
  updateDoc,
  getFirestore,
  deleteField,
} from "firebase/firestore/lite";
import HeaderAvailabilityUpdated from "./HeaderAvailabilityUpdated";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Image from "next/image";
import { getFunctions, httpsCallable } from "firebase/functions";
import useLocalStorage from "../../lib/useLocalStorage";
const HeaderAvailability = ({
  userAvailability,
  userAvailabilityUpdatedOn,
  userUid,
  userEmail,
  user,
  t,
  i18n,
}) => {
  const functions = useMemo(() => {
    try {
      return getFunctions(undefined, "asia-northeast1");
    } catch (err) {
      console.error("Failed to initialize firebase functions:", err);
      return null;
    }
  }, []);
  const sendTask = functions ? httpsCallable(functions, "sendTask") : null;
  const deleteTask = functions ? httpsCallable(functions, "deleteTask") : null;
  const sendEmail = functions ? httpsCallable(functions, "sendEmail") : null;
  const { getItem, setItem } = useLocalStorage();
  const [calendarAvailability, setCalendarAvailability] = useState();
  const [calendarLocales, setCalendarLocales] = useState();
  const [availabilityTutorial, setAvailabilityTutorial] = useState(
    !getItem("availabilityTutorial") ? true : false
  );
  const [currentMonth, setCurrentMonth] = useState({
    length: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const language = useSelector((state) => state.app.language);
  const selectAllMonth = () => {
    let tempMonthAvailability = [];
    for (let i = 1; i <= currentMonth.length; i++) {
      tempMonthAvailability.push(
        `${currentMonth?.month?.toString().length === 1 ? "0" : ""}${
          currentMonth?.month
        }/${i?.toString().length === 1 ? "0" : ""}${i}/${currentMonth?.year}`
      );
    }
    const currentAvailability = Array.isArray(calendarAvailability)
      ? calendarAvailability
      : [];
    setCalendarAvailability([
      ...new Set([...currentAvailability, ...tempMonthAvailability]),
    ]);
  };
  const updateAvailability = async (e) => {
    try {
      const formattedAvailability = [];
      if (e) {
        e.forEach((date) => {
          if (date.valueOf() > new Date().getTime()) {
            formattedAvailability.push(
              new DateObject(new Date(date)).format("MM/DD/YYYY")
            );
          }
        });
      }
      let taskData;
      if (user?.notificationsSettings?.availabilityReminder && sendTask) {
        taskData = await sendTask({
        taskDate: Math.ceil(Date.now() / 1000) + 24 * 60 * 60 * 30,
        firebaseFunctionUrl:
          "https://asia-northeast1-dekitabi.cloudfunctions.net/sendTaskEmail",
        taskFunctionArgs: {
          to: userEmail,
          sender: "noreply@dekitabi.com",
          subject: `dekitabi | ${t("availabilityEmailTitle")}`,
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
       ${t("availabilityEmailTitle")}</h1>
        <h2>${t("hello")} ${
            user.firstname ? `${user?.firstname} ${user?.lastname}` : t("guide")
          },</h2>
        <p style="margin: 0 0 20px 0; line-height:20px; text-align:left; padding:20px; border-radius:10px; background:#ededed">
        ${t("availabilityEmailMsg")}<br/>${t(
            "availabilityEmailMsg2"
          )}<br/><b>${t("thanksUsingDekitabi")}</b></p>
      
        <a href="https://www.dekitabi.com/account" target="_blank" rel="noreferrer" style="display:block; margin:10px 0; padding:15px;font-size:1.1em;border-radius:5px; color:white; background:#2186eb; text-decoration:none; text-align:center">${t(
          "myAccount"
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
        ${t("doNotReplyEmail")}
        </p>
     </div>`,
        },
        });
      }
      if (user?.availabilityTask && deleteTask) {
        await deleteTask(user?.availabilityTask);
      }
      if (user?.availabilityRequest?.length > 0 && sendEmail) {
        await Promise.allSettled(
          user?.availabilityRequest?.map(async (traveler) => {
            i18n.loadLanguages(
              traveler?.language === "zh-TW"
                ? "zh_tw"
                : traveler?.language === "zh-CN"
                ? "zh_cn"
                : traveler?.language === "fil"
                ? "tl"
                : traveler?.language
            );
            const gl = i18n.getFixedT(
              traveler?.language === "fil"
                ? "tl"
                : traveler?.language === "zh-TW"
                ? "zh_tw"
                : traveler?.language === "zh-CN"
                ? "zh_cn"
                : traveler?.language
            );
            await sendEmail({
          to: traveler?.email,
          sender: "noreply@dekitabi.com",
          subject: `dekitabi | ${gl("availabilityUpdated")}`,
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
               <h1 style="color: #1a2b49; margin: 0 0 20px 0">
               ${gl("availabilityUpdated")}</h1>
                <div style="margin: 0; line-height:20px; text-align:left; padding:20px; border-radius:10px; background:#ededed">
               <p><b>${gl("thanksUsingDekitabi")}</b> ${gl(
            "availabilityUpdatedMsg",
            {
              guide: user?.firstname
                ? `${user?.firstname} ${user?.lastname}`
                : gl("guide"),
            }
          )}</p></div>
                <a href="https://www.dekitabi.com/${
                  user?.username
                }" target="_blank" rel="noreferrer" style="display:block; margin:10px 0; padding:15px;font-size:1.1em;border-radius:5px; color:white; background:#2186eb; text-decoration:none; text-align:center">${gl(
            "guideProfile",
            {
              guide: user?.firstname
                ? `${user?.firstname} ${user?.lastname}`
                : gl("guide"),
            }
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
          })
        );
      }
      const userRef = doc(getFirestore(), "users", userUid);
      await updateDoc(userRef, {
        availabilityUpdatedOn: Math.ceil(new Date().getTime() / 1000),
        availability: formattedAvailability,
        ...(taskData?.data?.response?.name && {
          availabilityTask: taskData?.data?.response?.name,
        }),
        ...(user?.availabilityRequest?.length > 0 && {
          availabilityRequest: deleteField(),
        }),
      });
      return true;
    } catch (err) {
      console.error("Failed to update availability:", err);
      return false;
    }
  };
  const userAvailabilityComponent = (
    <HeaderAvailabilityUpdated
      t={t}
      position="bottom"
      key={0}
      size="medium"
      selectAllMonth={selectAllMonth}
    />
  );
  useEffect(() => {
    if (language) {
      getCalendarLocales(language)
        .then((locales) => {
          setCalendarLocales(locales);
        })
        .catch((err) =>
          console.error("Failed to load calendar locales:", err)
        );
    }
  }, [language]);
  return (
    <HeaderAvailabilityStyles className="header-availability">
      {userAvailability?.length === 0 && availabilityTutorial && (
        <div className="availability-reminder">
          <Image
            src="/img/icon-availability.svg"
            height={25}
            width={25}
            alt="dekitabi-tour-guide-availability"
          />
          <div className="availability-message">
            {t("step2Message")}
            <div className="buttons">
              <button
                onClick={() => {
                  setItem("availabilityTutorial", true);
                  setAvailabilityTutorial(false);
                }}
              >
                {t("hide")}
              </button>
              <button
                onClick={() => {
                  setAvailabilityTutorial(false);
                  setItem("availabilityTutorial", true);
                  const datePickerInput =
                    document.getElementsByClassName("rmdp-input")?.[0];
                  if (
                    datePickerInput &&
                    typeof datePickerInput.focus === "function"
                  ) {
                    datePickerInput.focus();
                  }
                }}
              >
                {t("viewAvailability")}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`calendar`}>
        <DatePicker
          format="MM/DD/YYYY"
          className="purple rmdp-mobile"
          multiple
          value={calendarAvailability}
          onChange={updateAvailability}
          onClose={() => setCalendarAvailability(userAvailability)}
          onOpen={() => setCalendarAvailability(userAvailability)}
          onFocusedDateChange={(dateFocused, dateClicked) => {
            if (!dateClicked) return;
            const clickedDate = new DateObject(new Date(dateClicked)).format(
              "MM/DD/YYYY"
            );
            if (
              (dateFocused || dateFocused === dateClicked) &&
              !calendarAvailability?.includes(clickedDate)
            ) {
              setCalendarAvailability((previousAvailability) => [
                ...(Array.isArray(previousAvailability)
                  ? previousAvailability
                  : []),
                clickedDate,
              ]);
            } else {
              setCalendarAvailability((previousAvailability) => {
                const tempAvailability = Array.isArray(previousAvailability)
                  ? [...previousAvailability]
                  : [];
                const index = tempAvailability.indexOf(clickedDate);
                if (index > -1) {
                  tempAvailability.splice(index, 1);
                }
                return tempAvailability;
              });
            }
          }}
          locale={calendarLocales}
          mobileLabels={{
            OK: t("update"),
            CANCEL: t("cancel"),
          }}
          plugins={[
            <HeaderAvailabilityPlugin
              t={t}
              position="top"
              key={0}
              size="medium"
            />,
            userAvailabilityComponent,
          ]}
          minDate={dayjs(new Date()).format("YYYY/MM/DD")}
          maxDate={dayjs(new Date())
            .startOf("day")
            .add(10, "months")
            .format("YYYY/MM/DD")}
          onMonthChange={(e) => {
            setCurrentMonth({
              length: e.month.length,
              month: e.month.number,
              year: e.year,
            });
          }}
        />
      </div>
    </HeaderAvailabilityStyles>
  );
};
export default React.memo(HeaderAvailability);
