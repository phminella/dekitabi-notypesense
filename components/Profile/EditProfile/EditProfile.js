import EditProfileDescription from "./EditProfileDescription";
import EditProfileTitle from "./EditProfileTitle";
import { EditProfileStyles } from "./styles/EditProfileStyles";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import EditLanguages from "./EditLanguages";
import EditSocialMedia from "./EditSocialMedia";
import EditStates from "./EditStates";
import EditContact from "./EditContact";
import EditFee from "./EditFee";
import EditVerified from "./EditVerified";
import EditName from "./EditName";
import EditUsername from "./EditUsername";
import EditCanDrive from "./EditCanDrive";
import EditAcceptTourFrom from "./EditAcceptTourFrom";
import EditMaxPeople from "./EditMaxPeople";
import BasicModal from "../../UI/BasicModal";
import React from "react";
const EditProfile = ({
  setEditProfile,
  profile,
  editProfile,
  setProfile,
  t,
}) => {
  const updateProfile = async (update) => {
    const userRef = doc(getFirestore(), "users", profile?.uid);
    return updateDoc(userRef, update).then(() => {
      return true;
    });
  };
  return (
    <EditProfileStyles className="edit-profile">
      <BasicModal setShowModal={setEditProfile} showModal={editProfile}>
        <EditProfileTitle setEditProfile={setEditProfile} t={t} />
        <div className="edit-profile-content">
          <p className="sub-title">{t("editProfileSubtitle")}</p>
          <EditUsername
            profile={profile}
            setProfile={setProfile}
            updateProfile={updateProfile}
            t={t}
          />
          <EditName
            profile={profile}
            setProfile={setProfile}
            updateProfile={updateProfile}
            t={t}
          />
          <EditLanguages
            profile={profile}
            setProfile={setProfile}
            updateProfile={updateProfile}
            t={t}
          />
          {profile?.guide === "true" && (
            <>
              <EditStates
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
                t={t}
              />
              <EditAcceptTourFrom
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
                t={t}
              />
              <EditMaxPeople
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
                t={t}
              />
              <EditFee
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
                t={t}
              />
              <EditProfileDescription
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
                t={t}
              />
              <EditContact
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
                t={t}
              />
              <EditSocialMedia
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
                t={t}
              />
              <EditCanDrive
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
                t={t}
              />
              {profile?.licensed !== "true" && (
                <EditVerified
                  profile={profile}
                  setProfile={setProfile}
                  updateProfile={updateProfile}
                  t={t}
                />
              )}
            </>
          )}
        </div>
      </BasicModal>
    </EditProfileStyles>
  );
};
export default React.memo(EditProfile);
