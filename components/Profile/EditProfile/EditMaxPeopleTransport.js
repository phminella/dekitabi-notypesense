import { EditNameStyles } from "./styles/EditNameStyles";
import React, { useState } from "react";
import ItineraryPersonNumber from "../../Itinerary/Details/ItineraryPersonNumber";
import Image from "next/image";
const EditMaxPeopleTransport = ({ profile, setProfile, updateProfile, t }) => {
  const [editMaxPeople, setEditMaxPeople] = useState(false);
  const [saved, setSaved] = useState(false);
  const updatePeople = async ({ person }) => {
    if (updateProfile({ maxPeopleTransport: person })) {
      setEditMaxPeople(false);
      setProfile({ ...profile, maxPeopleTransport: person });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  return (
    <EditNameStyles>
      <div className="title">
        <h3>{t("maxPeopleTransport")}</h3>{" "}
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {!editMaxPeople && !profile?.maxPeopleTransport && (
          <button onClick={() => setEditMaxPeople(true)}>{t("add")}</button>
        )}
        {!editMaxPeople && profile?.maxPeopleTransport && (
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
          {t("maxMsg", { people: profile?.maxPeopleTransport })}
        </div>
      )}
      {editMaxPeople && (
        <ItineraryPersonNumber
          itineraryMainPerson={
            profile?.maxPeopleTransport ? profile?.maxPeopleTransport : 1
          }
          updateItineraryHandler={updatePeople}
        />
      )}
    </EditNameStyles>
  );
};
export default React.memo(EditMaxPeopleTransport);
