import { ProfileInfoNameStyles } from "./styles/ProfileInfoNameStyles";
import TextField from "@mui/material/TextField";
import { useState } from "react";
const ProfileInfoName = ({ user, t, updateProfile }) => {
  const [firstname, setFirstname] = useState(
    user?.firstname ? user?.firstname : ""
  );
  const [lastname, setLastname] = useState(
    user?.lastname ? user?.lastname : ""
  );
  const [editName, setEditName] = useState(false);
  const [saved, setSaved] = useState(false);
  const updateName = async (e) => {
    e.preventDefault();
    try {
      if (await updateProfile({ firstname: firstname, lastname: lastname })) {
        setEditName(false);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 2000);
      }
    } catch (error) {
      setSaved(false);
    }
  };
  return (
    <ProfileInfoNameStyles>
      <div className="title">
        <h3>{t("displayName")}</h3>
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {user?.firstname && user?.lastname && !editName && (
          <button onClick={() => setEditName(true)}>{t("edit")}</button>
        )}
        {(!user?.firstname || !user?.lastname) && !editName && (
          <button onClick={() => setEditName(true)}>{t("add")}</button>
        )}
        {editName && (
          <button onClick={() => setEditName(false)}>{t("cancel")}</button>
        )}
      </div>
      {!user?.firstname && !user?.lastname && !editName && (
        <p>{t("nameEmpty2")}</p>
      )}
      {(user?.firstname || user?.lastname) && !editName && (
        <div className="name">
          {user?.firstname} {user?.lastname}
        </div>
      )}
      {editName && (
        <div className="name-edit">
          <form onSubmit={updateName}>
            <div className="two-columns-wrapper">
              {/* First Name romaji / kanji */}
              <div className="mui-input-wrapper">
                <TextField
                  name="first-name"
                  required
                  label={t("firstName")}
                  placeholder={t("firstNameInput")}
                  variant="filled"
                  color="secondary"
                  value={firstname}
                  onChange={(e) => {
                    const regex = /[^0-9]/;
                    if (
                      e.target.value.length < 25 &&
                      (regex.test(e.target.value) || e.target.value === "")
                    ) {
                      setFirstname(e.target.value);
                    }
                  }}
                />
              </div>
              {/* Last Name romaji / kanji */}
              <div className="mui-input-wrapper">
                <TextField
                  name="last-name"
                  required
                  label={t("lastName")}
                  placeholder={t("lastNameInput")}
                  variant="filled"
                  color="secondary"
                  value={lastname}
                  minLength={2}
                  maxLength={25}
                  onChange={(e) => {
                    const regex = /[^0-9]/;
                    if (
                      e.target.value.length < 25 &&
                      (regex.test(e.target.value) || e.target.value === "")
                    ) {
                      setLastname(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="edit-buttons">
              <button
                type="button"
                onClick={() => {
                  setEditName(false);
                  setFirstname(user?.firstname || "");
                  setLastname(user?.lastname || "");
                }}
              >
                {t("cancel")}
              </button>{" "}
              <button type="submit">{t("save")}</button>
            </div>
          </form>
        </div>
      )}
    </ProfileInfoNameStyles>
  );
};
export default ProfileInfoName;
