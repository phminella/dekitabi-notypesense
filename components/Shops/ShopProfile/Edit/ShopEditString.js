import { ShopEditStringStyles } from "./styles/ShopEditStringStyles";
import { useState } from "react";
import NoInformation from "../../Activities/NoInformation";
import EditInformationButton from "../../Activities/EditInformationButton";
import TextField from "@mui/material/TextField";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
const ShopEditString = ({
  field,
  shopProfile,
  updateProfile,
  t,
  showModal,
  ref,
  maxChar = 100,
  example,
}) => {
  const [input, setInput] = useState(
    shopProfile[field] ? shopProfile[field] : ""
  );
  const [edit, setEdit] = useState(showModal === field ? true : false);
  const [error, setError] = useState(false);
  const textAreaMaxLength = field === "description" ? 3000 : 2000;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (field !== "name") {
      updateProfile(field, input).then(() => {
        setEdit(false);
      });
    } else {
      const usersRef = collection(getFirestore(), "shops");
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
    <ShopEditStringStyles id={field} ref={ref}>
      <p className="profile-field">
        {t(`shops:${field}`)}{" "}
        {!edit && shopProfile[field] && (
          <EditInformationButton setShowModal={setEdit} field={field} />
        )}
      </p>
      {!edit && shopProfile[field] && (
        <p className="profile-value">{shopProfile[field]}</p>
      )}
      {!edit && !shopProfile[field] && (
        <NoInformation
          example={example}
          text={t(
            `shops:no${
              String(field).charAt(0).toUpperCase() + String(field).slice(1)
            }`
          )}
          add={setEdit}
          t={t}
        />
      )}
      {edit && (
        <form onSubmit={handleSubmit}>
          {field === "description" || field === "notification" ? (
            <div className="edit-description">
              <textarea
                value={input}
                placeholder={t(
                  `shops:addShop${
                    String(field).charAt(0).toUpperCase() +
                    String(field).slice(1)
                  }`
                )}
                type={
                  field === "website"
                    ? "url"
                    : field === "phoneNumber"
                    ? "tel"
                    : field === "contactEmail"
                    ? "email"
                    : "text"
                }
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
              <TextField
                name={field}
                required
                label={
                  field === "contactEmail" ? t(`shops:${field}`) : t(field)
                }
                type={
                  field === "website"
                    ? "url"
                    : field === "phoneNumber"
                    ? "tel"
                    : field === "contactEmail"
                    ? "email"
                    : "text"
                }
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
                autoFocus
                onChange={(e) => {
                  if (error) {
                    setError();
                  }
                  if (e.target.value?.length < maxChar) {
                    setInput(e.target.value);
                  }
                }}
              />
            </div>
          )}
          {error === "name" && (
            <p className="error-message">&#9940;{t("shops:nameExists")}</p>
          )}
          <div className="edit-buttons">
            <button
              className="link"
              type="button"
              onClick={() => {
                setInput(shopProfile[field]);
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
    </ShopEditStringStyles>
  );
};
export default ShopEditString;
