import { EditStatesStyles } from "./styles/EditStatesStyles";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SelectStates from "../../Misc/SelectStates";
import Image from "next/image";
const EditStates = ({ profile, setProfile, updateProfile, t }) => {
  const language = useSelector((state) => state.app.language);
  const user = useSelector((state) => state.app.user);
  const [states, setStates] = useState([]);
  const [editStates, setEditStates] = useState(false);
  const updateStates = async () => {
    let tempStates = [];
    let tempTranslatedStates = [];
    states?.map((state) => {
      tempStates?.push(state.value);
      tempTranslatedStates?.push(state.translatedValue);
    });
    updateProfile({
      states: tempStates,
      translatedStates: tempTranslatedStates,
    }).then(() => {
      setEditStates(false);
    });
  };
  useEffect(() => {
    setProfile({
      ...profile,
      states: user?.states,
      translatedStates: user?.translatedStates,
    });
  }, [user?.translatedStates]);
  return (
    <EditStatesStyles>
      <div className="title">
        <h3>{t("prefectures")}</h3>
        {profile?.states?.length > 0 && !editStates && (
          <button onClick={() => setEditStates(true)}>{t("edit")}</button>
        )}
        {(!profile?.states || profile?.states?.length < 1) && !editStates && (
          <button onClick={() => setEditStates(true)}>{t("add")}</button>
        )}
        {editStates && (
          <button onClick={() => setEditStates(false)}>{t("cancel")}</button>
        )}
      </div>
      <p className="sub-title">{t("prefecturesSubtitle")}</p>
      {!profile?.states && (
        <Image
          width={30}
          height={30}
          alt="spinner"
          src={"/img/icon-spinner.svg"}
        />
      )}
      {profile?.states?.length > 0 &&
        profile?.translatedStates[profile?.states?.length - 1] &&
        !editStates && (
          <div className="states">
            {profile?.states?.map((state, i) => (
              <div key={i} className="state">
                {t(profile?.translatedStates[i][language?.code])}
              </div>
            ))}
          </div>
        )}
      {profile?.states?.length < 1 && !editStates && (
        <p>{t("prefecturesEmpty")}</p>
      )}
      {editStates && (
        <div className="edit-states">
          <SelectStates
            country={profile?.country}
            states={profile?.states}
            translatedStates={profile?.translatedStates}
            setStates={setStates}
            t={t}
          />
          <div className="edit-buttons">
            <button
              onClick={() => {
                setEditStates(false);
              }}
            >
              {t("cancel")}
            </button>{" "}
            <button onClick={() => updateStates()}>{t("save")}</button>
          </div>
        </div>
      )}
    </EditStatesStyles>
  );
};
export default React.memo(EditStates);
