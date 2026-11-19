import { ActivityEditStringStyles } from "./styles/ActivityEditStringStyles";
import { useState } from "react";
import NoInformation from "../../Activities/NoInformation";
import EditInformationButton from "../../Activities/EditInformationButton";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
const ActivityEditString = ({
  field,
  activity,
  updateProfile,
  t,
  showModal,
  ref,
  maxChar = 100,
  example,
}) => {
  const [input, setInput] = useState(activity[field] ? activity[field] : "");
  const [edit, setEdit] = useState(showModal === field ? true : false);
  const [error, setError] = useState(false);
  const textAreaMaxLength = field === "description" ? 3000 : 1000;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (field !== "name") {
      updateProfile(field, input).then(() => {
        setEdit(false);
      });
    } else {
      const usersRef = collection(getFirestore(), "activities");
      const q = query(
        usersRef,
        where(
          "url",
          "==",
          input
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s\s+/g, " ")
            .toLowerCase()
            .trim()
            .split(" ")
            .join("-")
        )
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        updateProfile(field, input).then(() => {
          setEdit(false);
        });
      } else {
        setError("name");
      }
    }
  };
  return (
    <ActivityEditStringStyles id={field} ref={ref}>
      <p className="profile-field">
        {t(`shops:${field}`)}{" "}
        {!edit && activity[field] && (
          <EditInformationButton setShowModal={setEdit} field={field} />
        )}
      </p>
      {!edit && activity[field] && (
        <div className="profile-value">
          {field === "website" ? (
            <Link href={activity[field]} target="_blank" prefetch={false}>
              {activity[field]}
            </Link>
          ) : field === "duration" ? (
            <p className="profile-value">
              {activity[field]}
              {t("min")}
            </p>
          ) : (
            <p className="profile-value">{activity[field]}</p>
          )}
        </div>
      )}
      {!edit && !activity[field] && (
        <NoInformation
          t={t}
          example={example}
          text={t(
            `shops:no${
              String(field).charAt(0).toUpperCase() + String(field).slice(1)
            }`
          )}
          add={setEdit}
        />
      )}
      {edit && (
        <form onSubmit={handleSubmit}>
          {field === "description" ||
          field === "included" ||
          field === "notIncluded" ? (
            <div className="edit-description">
              <textarea
                value={input}
                placeholder={t(
                  `shops:add${
                    String(field).charAt(0).toUpperCase() +
                    String(field).slice(1)
                  }`
                )}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                maxLength={textAreaMaxLength}
                autoFocus
              ></textarea>
              <p className="edit-description-counter">
                {t("shops:charRemaining", {
                  char: textAreaMaxLength - input?.length,
                })}
              </p>
            </div>
          ) : (
            <div className="mui-input-wrapper">
              {field === "duration" && (
                <p className="profile-subtitle">
                  {t("shops:editDurationWarning")}
                </p>
              )}
              <TextField
                name={field}
                required
                label={t(`shops:${field}`)}
                placeholder={t(
                  `shops:add${
                    String(field).charAt(0).toUpperCase() +
                    String(field).slice(1)
                  }`
                )}
                variant="filled"
                color="secondary"
                value={input}
                id={field}
                type={
                  field === "website"
                    ? "url"
                    : field === "phoneNumber"
                    ? "tel"
                    : "text"
                }
                maxLength={maxChar}
                autoFocus
                onChange={(e) => {
                  if (error) {
                    setError();
                  }
                  if (
                    e.target.value?.length <= maxChar &&
                    (field !== "duration" ||
                      (field === "duration" && !isNaN(e.target.value)))
                  ) {
                    setInput(
                      field === "duration"
                        ? Number(e.target.value)
                        : e.target.value
                    );
                  }
                }}
              />
            </div>
          )}
          {error === "name" && (
            <p className="error-message">
              &#9940;
              {t(`shops:nameError`)}
            </p>
          )}
          <div className="edit-buttons">
            <button
              className="link"
              type="button"
              onClick={() => {
                setInput(activity[field]);
                setEdit(false);
              }}
            >
              {t("cancel")}
            </button>{" "}
            <button type="submit" className="normal-button">
              {t("save")}
            </button>
          </div>
        </form>
      )}
    </ActivityEditStringStyles>
  );
};
export default ActivityEditString;
