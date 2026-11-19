import { EditProfileDescriptionStyles } from "./styles/EditProfileDescriptionStyles";
import React, { useState } from "react";
const EditProfileDescription = ({ profile, setProfile, updateProfile, t }) => {
  const [description, setDescription] = useState(profile?.description);
  const [editDescription, setEditDescription] = useState(false);
  const [saved, setSaved] = useState(false);
  const updateDescription = async () => {
    if (updateProfile({ description: description })) {
      setEditDescription(false);
      setProfile({ ...profile, description });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  return (
    <EditProfileDescriptionStyles>
      <div className="title">
        <h3>{t("introduction")}</h3>{" "}
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {profile?.description && !editDescription && (
          <button onClick={() => setEditDescription(true)}>{t("edit")}</button>
        )}
        {!profile?.description && !editDescription && (
          <button onClick={() => setEditDescription(true)}>{t("add")}</button>
        )}
        {editDescription && (
          <button onClick={() => setEditDescription(false)}>
            {t("cancel")}
          </button>
        )}
      </div>
      {!profile?.description && !editDescription && (
        <p>{t("descriptionEmpty")}</p>
      )}
      {profile?.description && !editDescription && (
        <div className="description">{profile?.description}</div>
      )}
      {editDescription && (
        <div className="description-edit">
          <form>
            <textarea
              value={description}
              placeholder={t("descriptionInput")}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              autoFocus
            ></textarea>
            <p className="description-counter">
              {1000 - description?.length} {t("charRemaining")}
            </p>
            <div className="edit-buttons">
              <button
                onClick={() => {
                  setEditDescription(false);
                  setDescription(profile?.description);
                }}
              >
                {t("cancel")}
              </button>{" "}
              <button onClick={() => updateDescription()}>{t("save")}</button>
            </div>
          </form>
        </div>
      )}
    </EditProfileDescriptionStyles>
  );
};
export default React.memo(EditProfileDescription);
