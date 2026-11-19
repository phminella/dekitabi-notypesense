import { AccountNotificationsStyles } from "./styles/AccountNotificationsStyles";
import { useTranslation } from "next-i18next";
import {
  doc,
  updateDoc,
  getFirestore,
  deleteField,
} from "firebase/firestore/lite";
import Spinner from "../../UI/Spinner";
import Image from "next/image";
import Head from "next/head";
import { useSelector, shallowEqual } from "react-redux";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
const AccountNotifications = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const { t } = useTranslation();
  const [chatMessage, setChatMessage] = useState(false);
  const [profileVisit, setProfileVisit] = useState(false);
  const [itineraryLike, setItineraryLike] = useState(false);
  const [itineraryComment, setItineraryComment] = useState(false);
  const [availabilityReminder, setAvailabilityReminder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  let functions;
  let deleteTask;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    deleteTask = httpsCallable(functions, "deleteTask");
  } catch (error) {
    deleteTask = null;
  }
  const saveSettings = async () => {
    setLoading(true);
    const userRef = doc(getFirestore(), "users", user?.uid);
    if (
      user?.availabilityTask &&
      !availabilityReminder &&
      user?.guide === "true"
    ) {
      try {
        if (deleteTask) {
          await deleteTask(user?.availabilityTask);
        }
      } catch (error) {
        setLoading(false);
        return;
      }
    }
    updateDoc(userRef, {
      ...(user?.guide === "true" &&
        user?.availabilityTask &&
        !availabilityReminder && {
          availabilityTask: deleteField(),
        }),
      notificationsSettings: {
        profileVisit,
        itineraryLike,
        itineraryComment,
        chatMessage,
        ...(user?.guide === "true" && { availabilityReminder }),
      },
    })
      .then(() => {
        setSaved(true);
        setLoading(false);
        setTimeout(() => {
          setSaved(false);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (user?.language) {
      setProfileVisit(
        user?.notificationsSettings?.profileVisit
          ? user?.notificationsSettings?.profileVisit
          : false
      );
      setItineraryLike(
        user?.notificationsSettings?.itineraryLike
          ? user?.notificationsSettings?.itineraryLike
          : false
      );
      setItineraryComment(
        user?.notificationsSettings?.itineraryComment
          ? user?.notificationsSettings?.itineraryComment
          : false
      );
      setAvailabilityReminder(
        user?.notificationsSettings?.availabilityReminder
          ? user?.notificationsSettings?.availabilityReminder
          : false
      );
      setChatMessage(
        user?.notificationsSettings?.chatMessage
          ? user?.notificationsSettings?.chatMessage
          : false
      );
    }
  }, [user]);
  if (!user?.languages) return <Spinner />;
  return (
    <AccountNotificationsStyles>
      <Head>
        <title>{`${t("account")}/${t("notifications")}`}</title>
      </Head>
      <div className="page-header">
        <p className="breadcrumbs">
          <Link prefetch={false} href="/account">
            {" "}
            {t("account")}
          </Link>{" "}
          <span>&gt;</span> <span>{t("notifications")}</span>
        </p>
        <h1 className="title">{t("notifications")}</h1>
        <div className="sub-title">
          <p>{t("notificationsDesc")}</p>
        </div>
      </div>
      <div className="notifications">
        <div className="checkbox-wrapper">
          <FormControlLabel
            control={
              <Checkbox
                style={{
                  transform: "scale(1.5)",
                }}
                checked={profileVisit}
                onChange={() => setProfileVisit(!profileVisit)}
                sx={{
                  color: "var(--pink)",
                  "&.Mui-checked": {
                    color: "var(--pink)",
                  },
                }}
              />
            }
            label={t("notificationsProfileVisit")}
          />
        </div>
        {user?.guide === "true" && (
          <div className="checkbox-wrapper">
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    transform: "scale(1.5)",
                  }}
                  checked={availabilityReminder}
                  onChange={() =>
                    setAvailabilityReminder(!availabilityReminder)
                  }
                  sx={{
                    color: "var(--pink)",
                    "&.Mui-checked": {
                      color: "var(--pink)",
                    },
                  }}
                />
              }
              label={t("notificationsAvailabilityReminder")}
            />
          </div>
        )}
        <div className="checkbox-wrapper">
          <FormControlLabel
            control={
              <Checkbox
                style={{
                  transform: "scale(1.5)",
                }}
                checked={itineraryLike}
                onChange={() => setItineraryLike(!itineraryLike)}
                sx={{
                  color: "var(--pink)",
                  "&.Mui-checked": {
                    color: "var(--pink)",
                  },
                }}
              />
            }
            label={t("notificationsItineraryLike")}
          />
        </div>
        <div className="checkbox-wrapper">
          <FormControlLabel
            control={
              <Checkbox
                style={{
                  transform: "scale(1.5)",
                }}
                checked={itineraryComment}
                onChange={() => setItineraryComment(!itineraryComment)}
                sx={{
                  color: "var(--pink)",
                  "&.Mui-checked": {
                    color: "var(--pink)",
                  },
                }}
              />
            }
            label={t("notificationsItineraryComment")}
          />
        </div>
        <div className="checkbox-wrapper">
          <FormControlLabel
            control={
              <Checkbox
                style={{
                  transform: "scale(1.5)",
                }}
                checked={chatMessage}
                onChange={() => setChatMessage(!chatMessage)}
                sx={{
                  color: "var(--pink)",
                  "&.Mui-checked": {
                    color: "var(--pink)",
                  },
                }}
              />
            }
            label={t("notificationsChatMessage")}
          />
        </div>
        <p className="notifications-info">*{t("emailNotificationSettings")}</p>
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        <button className="normal-button" onClick={saveSettings}>
          {loading ? (
            <Image
              src="/img/icon-spinner-white.svg"
              alt="spinner"
              className="spinner"
              height={30}
              width={30}
            />
          ) : (
            t("save")
          )}
        </button>
      </div>
    </AccountNotificationsStyles>
  );
};
export default AccountNotifications;
