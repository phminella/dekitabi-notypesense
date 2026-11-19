import { EditNameStyles } from "./styles/EditNameStyles";
import React, { useState, useMemo } from "react";
import Image from "next/image";
const EditAcceptTourFrom = ({ profile, setProfile, updateProfile, t }) => {
  const daysRange = useMemo(
    () => Array.from({ length: 28 }, (_, i) => i + 1 * 1),
    []
  );
  const [editAcceptTourFrom, setEditAcceptTourFrom] = useState(false);
  const [saved, setSaved] = useState(false);
  const updateAcceptTourFrom = async (e) => {
    if (updateProfile({ acceptTourFrom: parseInt(e.target.value -1) })) {
      setEditAcceptTourFrom(false);
      setProfile({ ...profile, acceptTourFrom: parseInt(e.target.value -1) });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  return (
    <EditNameStyles>
      <div className="title">
        <h3>{t("acceptTourFrom")}</h3>{" "}
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {!editAcceptTourFrom && (
          <button onClick={() => setEditAcceptTourFrom(true)}>
            {t("edit")}
          </button>
        )}
        {editAcceptTourFrom && (
          <button onClick={() => setEditAcceptTourFrom(false)}>
            {t("cancel")}
          </button>
        )}
      </div>
      {!editAcceptTourFrom && (
        <div className="flex-wrapper-five">
          <Image
            height={20}
            width={20}
            src="/img/icon-calendar.svg"
            alt="login"
          />
          {t("acceptTourFromMsg", { days: profile?.acceptTourFrom + 1})}
        </div>
      )}
      {editAcceptTourFrom && (
        <div className="accept-tour-from">
          <Image
            height={20}
            width={20}
            src="/img/icon-calendar.svg"
            alt="calendar"
          />
          <select
            value={profile?.acceptTourFrom + 1}
            onChange={(e) => {
              updateAcceptTourFrom(e);
            }}
          >
            {daysRange.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}
    </EditNameStyles>
  );
};
export default React.memo(EditAcceptTourFrom);
