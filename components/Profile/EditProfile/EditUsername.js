import { EditUsernameStyles } from "./styles/EditUsernameStyles";
import React, { useState } from "react";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import { useRouter } from "next/router";
const EditUsername = ({ profile, setProfile, updateProfile, t }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [editUsername, setEditUsername] = useState(false);
  const [saved, setSaved] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateUsername = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      username === "affiliate" ||
      username === "about" ||
      username === "affiliate-program" ||
      username === "suggest-attractions" ||
      username === "verify-with-stripe" ||
      username === "account" ||
      username === "cancelation-policy" ||
      username === "careers" ||
      username === "checkout" ||
      username === "contact-us" ||
      username === "guides-general-information" ||
      username === "order-complete-processing" ||
      username === "order-complete" ||
      username === "payments-and-payouts-policy" ||
      username === "price-per-person" ||
      username === "terms-and-conditions" ||
      username === "attraction" ||
      username === "cancel-tour" ||
      username === "confirm-tour" ||
      username === "itinerary" ||
      username === "s" ||
      username === "review" ||
      username === "privacy-policy" ||
      username === "suggest-attractions" ||
      username === "guide-at-dekitabi" ||
      username?.length < 1
    ) {
      setUsernameExists(true);
      setLoading(false);
    } else {
      const usersRef = collection(getFirestore(), "users");
      const q = query(
        usersRef,
        where("username", "==", username?.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const userRef = doc(getFirestore(), "users", profile?.uid);
        return updateDoc(userRef, { username: username?.toLowerCase() }).then(
          () => {
            router.push({ query: { id: username?.toLowerCase() } }).then(() => {
              router.reload();
            });
          }
        );
      } else {
        setUsernameExists(true);
        setLoading(false);
      }
    }
  };
  return (
    <EditUsernameStyles>
      <div className="title">
        <h3>{t("changeUsername")}</h3>{" "}
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {profile?.username && !editUsername && (
          <button onClick={() => setEditUsername(true)}>{t("edit")}</button>
        )}
        {editUsername && (
          <button
            onClick={() => {
              setEditUsername(false);
              setUsernameExists(false);
            }}
          >
            {t("cancel")}
          </button>
        )}
      </div>
      {profile?.username && !editUsername && (
        <div className="username">
          www.dekitabi.com/<span>{profile?.username}</span>
        </div>
      )}
      {editUsername && (
        <form onSubmit={updateUsername}>
          <div className="mui-input-wrapper">
            <TextField
              name="username"
              label="Change username"
              placeholder="Change username"
              variant="filled"
              color="secondary"
              error={usernameExists}
              className={usernameExists ? "error-input" : ""}
              value={username}
              onChange={(e) => {
                if (usernameExists) {
                  setUsernameExists(false);
                }
                setUsername(e.target.value?.replace(/\s/g, ""));
              }}
              minLength={2}
              maxLength={55}
              required
            />
            {usernameExists && (
              <p className="error-message">&#9940;{t("usernameError")}</p>
            )}
          </div>
          <div className="edit-buttons">
            {!loading && (
              <button
                type="button"
                onClick={() => {
                  setEditUsername(false);
                  setUsername(profile?.username);
                  setUsernameExists(false);
                }}
              >
                {t("cancel")}
              </button>
            )}
            {!loading && <button type="submit">{t("save")}</button>}
            {loading && (
              <Image
                src="/img/icon-spinner.svg"
                height={30}
                width={30}
                alt="icon-spinner"
              />
            )}
          </div>
        </form>
      )}
    </EditUsernameStyles>
  );
};
export default React.memo(EditUsername);
