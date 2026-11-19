import { ProfileStyles } from "./styles/ProfileStyles";
import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileGeneralDetails from "./ProfileGeneralDetails";
import dynamic from "next/dynamic";
const EditProfile = dynamic(() => import("./EditProfile/EditProfile"));
const EditProfilePicture = dynamic(() =>
  import("./EditProfile/EditProfilePicture")
);
const ProfileTutorial = dynamic(() =>
  import("./ProfileTutorial/ProfileTutorial")
);
import { useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "next-i18next";
import ProfileInfo from "./ProfileDetails/ProfileInfo";
import { ProfileResponsiveStyles } from "./styles/responsive/ProfileResponsiveStyles";
const PageNotFound = dynamic(() => import("../UI/PageNotFound"), {
  ssr: false,
});
// import ProfileAvailability from "./ProfileAvailability";
import useSendNotificationEmail from "../../lib/useSendNotificationEmail";
const BookGuide = dynamic(() => import("./BookGuide"));
const Profile = ({ id, userSsr }) => {
  const { t } = useTranslation(["profile"]);
  const user = useSelector((state) => state.app.user, shallowEqual);
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const itineraries = useSelector(
    (state) => state.itinerary.itineraries,
    shallowEqual
  );
  const { send } = useSendNotificationEmail();
  const [profile, setProfile] = useState(userSsr);
  const [editProfile, setEditProfile] = useState();
  const [editPicture, setEditPicture] = useState(false);
  const [loadingProfilePicture, setLoadingProfilePicture] = useState(false);
  // const [showAvailability, setShowAvailability] = useState(false);
  const [loadingBg, setLoadingBg] = useState(false);
  const [tours, setTours] = useState([]);
  useEffect(() => {
    if (
      user?.uid &&
      user?.uid !== profile?.uid &&
      user?.uid !== userSsr?.uid &&
      userSsr?.notificationsSettings?.profileVisit
    ) {
      send("profileVisit", userSsr, user);
    }
    if (userSsr?.uid !== profile?.uid) {
      setProfile(userSsr);
    }
  }, [userSsr?.username, user]);
  console.log(profile);
  if (!userSsr?.uid) return <PageNotFound />;
  return (
    <ProfileResponsiveStyles>
      <ProfileStyles
        id="profile"
        className={profile?.guide === "false" ? "traveler-profile" : ""}
      >
        {profile?.states?.length > 0 &&
          (profile?.uid !== user?.uid || !user?.uid) &&
          user?.guide !== "true" &&
          itineraries?.length === 0 && (
            <BookGuide t={t} name={profile?.firstname} />
          )}
        <div>
          <ProfileHeader
            profile={profile}
            setProfile={setProfile}
            id={id}
            user={user}
            t={t}
            loadingBg={loadingBg}
            setLoadingBg={setLoadingBg}
            toursLength={tours?.length}
          />
          <div className="profile-content">
            <div className="profile-info-wrapper">
              <ProfileInfo
                profile={profile}
                setProfile={setProfile}
                user={user}
                t={t}
                currency={currency}
                tours={tours}
                setTours={setTours}
              />
            </div>
            <div className="profile-general-details-wrapper">
              <ProfileGeneralDetails
                user={user}
                setEditProfile={setEditProfile}
                profile={profile}
                setProfile={setProfile}
                loadingProfilePicture={loadingProfilePicture}
                t={t}
                setEditPicture={setEditPicture}
                // setShowAvailability={setShowAvailability}
                setLoadingProfilePicture={setLoadingProfilePicture}
                editPicture={editPicture}
              />
            </div>
          </div>
        </div>
        {profile?.newUser && user?.uid === profile?.uid && (
          <ProfileTutorial profile={profile} setProfile={setProfile} t={t} />
        )}
        {/* {profile?.guide === "true" && (
          <div className="availability-wrapper">
            <BasicModal
              setShowModal={setShowAvailability}
              showModal={showAvailability}
            >
              <ProfileAvailability profile={profile} user={user} t={t} />
            </BasicModal>
          </div>
        )} */}
        {profile?.uid === user?.uid && editPicture && (
          <EditProfilePicture
            editPicture={editPicture}
            setEditPicture={setEditPicture}
            profile={profile}
            setProfile={setProfile}
            t={t}
            setLoadingProfilePicture={setLoadingProfilePicture}
          />
        )}
        {editProfile && (
          <EditProfile
            profile={profile}
            setProfile={setProfile}
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            t={t}
          ></EditProfile>
        )}
      </ProfileStyles>
    </ProfileResponsiveStyles>
  );
};
export default Profile;
