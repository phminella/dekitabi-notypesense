import { ProfileInfoStyles } from "./styles/ProfileInfoStyles";
import ProfileStates from "./ProfileStates";
import ProfileContact from "./ProfileContact";
import ProfileSocialMedia from "./ProfileSocialMedia";
import Tours from "../Tours/Tours";
import DekitabiReviews from "../../Reviews/DekitabiReviews/DekitabiReviews";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import ProfilePhotos from "../ProfilePhotos/ProfilePhotos";
import DOMPurify from "isomorphic-dompurify";
import ShowOriginal from "../../UI/ShowOriginal";
import ProfileLiked from "./ProfileLiked";
import ProfileTravelersTab from "./ProfileTravelersTab";
const ProfileInfo = ({
  setProfile,
  user,
  profile,
  t,
  currency,
  tours,
  setTours,
}) => {
  const language = useSelector((state) => state.app.language);
  const [showOriginal, setShowOriginal] = useState(false);
  const [tab, setTab] = useState("itinerary");
  return (
    <ProfileInfoStyles>
      <div className="profile-section">
        {profile?.description && (
          <div className="profile-description">
            {profile?.firstname ? (
              <h1 className="hello-title">
                {t("helloProfile", { profileFirstname: profile?.firstname })}
              </h1>
            ) : (
              <h1>{t("introduction")}</h1>
            )}
            {profile?.uid !== user?.uid && (
              <ShowOriginal
                t={t}
                showOriginal={showOriginal}
                setShowOriginal={setShowOriginal}
              />
            )}
            {user?.uid === profile?.uid ||
            user?.booked?.includes(profile?.uid) ? (
              <p>
                {profile?.translatedDescription &&
                profile?.uid !== user?.uid &&
                !showOriginal
                  ? profile?.translatedDescription[language?.code]
                  : profile?.description}
              </p>
            ) : (
              <p
                className="introduction"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    profile?.translatedDescription && !showOriginal
                      ? profile?.translatedDescription[language?.code].replace(
                          /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,
                          `<span>${t("bookToSee", {
                            name: `${profile?.firstname} ${profile?.lastname}`,
                          })}</span>`
                        )
                      : profile?.description?.replace(
                          /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,
                          `<span>${t("bookToSee", {
                            name: `${profile?.firstname} ${profile?.lastname}`,
                          })}</span>`
                        ),
                    {
                      USE_PROFILES: { html: true },
                    }
                  ),
                }}
              />
            )}
          </div>
        )}
        <ProfilePhotos
          profile={profile}
          setProfile={setProfile}
          user={user}
          t={t}
          photos={profile?.photos}
        />
        {profile?.states?.length > 0 && profile?.guide === "true" && (
          <ProfileStates profile={profile} t={t} />
        )}
        {profile?.guide === "false" && (
          <ProfileTravelersTab tab={tab} setTab={setTab} t={t} />
        )}
        {tab === "itinerary" && (
          <Tours
            profile={profile}
            t={t}
            user={user}
            currency={currency}
            tours={tours}
            setTours={setTours}
          />
        )}
        {tab === "liked" && (
          <ProfileLiked
            profile={profile}
            t={t}
            user={user}
            currency={currency}
            tours={tours}
            setTours={setTours}
          />
        )}
        {profile?.guide === "true" && (
          <p className="profile-title">
            {t("contact")}{" "}
            {(profile?.contact?.email !== "" ||
              profile?.contact?.phone !== "" ||
              profile?.contact?.skype !== "" ||
              profile?.contact?.whatsapp !== "" ||
              profile?.contact?.line !== "" ||
              profile?.contact?.wechat !== "" ||
              profile?.contact?.kakao !== "" ||
              profile?.contact?.qq !== "" ||
              profile?.socialMedia?.facebook !== "" ||
              profile?.socialMedia?.twitter !== "" ||
              profile?.socialMedia?.instagram !== "" ||
              profile?.socialMedia?.tiktok !== "" ||
              profile?.socialMedia?.weibo !== "" ||
              profile?.socialMedia?.youtube !== "" ||
              profile?.socialMedia?.substack ||
              profile?.socialMedia?.linkedin) &&
              user?.uid !== profile?.uid &&
              !user?.booked?.includes(profile?.uid) && (
                <span>
                  {t("bookToSee", {
                    name: `${profile?.firstname} ${profile?.lastname}`,
                  })}
                </span>
              )}
          </p>
        )}
        {user && profile?.guide === "true" && (
          <div
            className={`profile-contact-wrapper ${
              (profile?.contact &&
                profile?.contact?.email === "" &&
                profile?.contact?.phone === "" &&
                profile?.contact?.skype === "" &&
                profile?.contact?.whatsapp === "" &&
                profile?.contact?.line === "" &&
                profile?.contact?.wechat === "" &&
                profile?.contact?.kakao === "" &&
                profile?.contact?.qq === "" &&
                profile?.socialMedia &&
                profile?.socialMedia?.facebook === "" &&
                profile?.socialMedia?.twitter === "" &&
                profile?.socialMedia?.instagram === "" &&
                profile?.socialMedia?.tiktok === "" &&
                profile?.socialMedia?.weibo === "" &&
                profile?.socialMedia?.youtube === "" &&
                (!profile?.socialMedia?.substack ||
                  profile?.socialMedia?.substack === "") &&
                (!profile?.socialMedia?.linkedin ||
                  profile?.socialMedia?.linkedin === "")) ||
              user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? ""
                : "hide-info"
            }`}
          >
            <ProfileContact profile={profile} user={user} t={t} />
            {profile?.socialMedia &&
              (profile?.socialMedia?.facebook !== "" ||
                profile?.socialMedia?.twitter !== "" ||
                profile?.socialMedia?.instagram !== "" ||
                profile?.socialMedia?.tiktok !== "" ||
                profile?.socialMedia?.weibo !== "" ||
                profile?.socialMedia?.youtube !== "" ||
                profile?.socialMedia?.substack !== "" ||
                profile?.socialMedia?.linkedin !== "") && (
                <ProfileSocialMedia
                  user={user}
                  profile={profile}
                  t={t}
                ></ProfileSocialMedia>
              )}
          </div>
        )}
        {profile?.guide === "true" && (
          <>
            <p className="profile-title">{t("reviewsTitle")}</p>
            <DekitabiReviews
              profile={profile}
              user={user}
              t={t}
              id={profile?.uid}
              reviewsLength={profile?.ratingCounter}
              guide={true}
            />
          </>
        )}
      </div>
    </ProfileInfoStyles>
  );
};
export default React.memo(ProfileInfo);
