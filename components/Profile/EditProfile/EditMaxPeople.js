import { EditNameStyles } from "./styles/EditNameStyles";
import React, { useState } from "react";
import ItineraryPersonNumber from "../../Itinerary/Details/ItineraryPersonNumber";
import Image from "next/image";
const EditMaxPeople = ({ profile, setProfile, updateProfile, t }) => {
  const [editMaxPeople, setEditMaxPeople] = useState(false);
  const [saved, setSaved] = useState(false);
  const updatePeople = async ({ person }) => {
    if (updateProfile({ maxPeople: person })) {
      setEditMaxPeople(false);
      setProfile({ ...profile, maxPeople: person });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  return (
    <EditNameStyles>
      <div className="title">
        <h3>{t("maxPeople")}</h3>{" "}
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {!editMaxPeople && (
          <button onClick={() => setEditMaxPeople(true)}>{t("edit")}</button>
        )}
        {editMaxPeople && (
          <button onClick={() => setEditMaxPeople(false)}>{t("cancel")}</button>
        )}
      </div>
      {!editMaxPeople && (
        <div className="flex-wrapper-five">
          <Image
            height={20}
            width={20}
            src="/img/icon-signin.svg"
            alt="login"
          />
          {t("maxMsg", { people: profile?.maxPeople })}
        </div>
      )}
      {editMaxPeople && (
        <ItineraryPersonNumber
          itineraryMainPerson={profile?.maxPeople}
          updateItineraryHandler={updatePeople}
        />
      )}
    </EditNameStyles>
  );
};
export default React.memo(EditMaxPeople);
