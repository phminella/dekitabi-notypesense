import { ProfileGeneralDetailsStyles } from "./styles/ProfileGeneralDetailsStyles";
import Avatar from "../UI/Avatar";
import Image from "next/legacy/image";
import React from "react";
import { useDispatch } from "react-redux";
import { setShowLogin } from "../../store/appSlice";
import useChat from "../../lib/useChat";
import dayjs from "dayjs";
import Price from "../UI/Price";
import dynamic from "next/dynamic";
import { getLanguageFlagSrc } from "../../lib/languageFlags";
const EditUploadGuidePicture = dynamic(() => import("./EditProfile/EditUploadGuidePicture"), {
  ssr: false,
});
import { useSelector } from "react-redux";
// import RequestAvailabilityButton from "./RequestAvailability/RequestAvailabilityButton";
const ProfileGeneralDetails = ({
  profile,
  setEditProfile,
  setEditPicture,
  setProfile,
  user,
  loadingProfilePicture,
  t,
  setLoadingProfilePicture,
  editPicture,
  // setShowAvailability,
}) => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.app.currency);
  const { createChat } = useChat();
  return (
    <ProfileGeneralDetailsStyles className="general-details">
      <div className="profile-header-wrapper">
        <div className="profile-avatar-wrapper">
          {loadingProfilePicture ? (
            <Avatar width={140} height={140} src={"/img/icon-spinner.svg"} />
          ) : (
            <Avatar
              width={140}
              height={140}
              src={
                profile?.avatar !== "/img/avatar.png"
                  ? profile?.avatar
                  : profile?.photos?.length > 0
                  ? profile?.photos[0]
                  : "/img/avatar.png"
              }
            />
          )}
          {profile?.uid === user?.uid && (
            <EditUploadGuidePicture
              editPicture={editPicture}
              setEditPicture={setEditPicture}
              profile={profile}
              setProfile={setProfile}
              t={t}
              setLoadingProfilePicture={setLoadingProfilePicture}
            ></EditUploadGuidePicture>
          )}
        </div>
        <div className="profile-header-description">
          <p className="profile-bold">
            {profile?.firstname || profile?.lastname ? (
              <span>
                {profile?.firstname} {profile?.lastname}
              </span>
            ) : (
              <span>{profile?.username}</span>
            )}
          </p>
          {profile?.likesCounter > 0 && (
            <p className="profile-likes">
              <Image
                height={19}
                width={19}
                src="/img/icon-heart-filled.svg"
                alt="dekitabi-profile-likes"
              ></Image>
              <b>{t("likes", { counter: profile?.likesCounter })}</b>
            </p>
          )}
          {profile?.guide === "true" && (
            <div
              className="profile-rating flex-wrapper-five"
              style={{ marginBottom: "5px" }}
            >
              {/* <Image
              height={15}
              width={15}
              src="/img/icon-star.svg"
              alt="star"
              className="star"
            ></Image>
            {profile?.ratingScore ? profile?.ratingScore?.toFixed(1) : 0} (
            {profile?.ratingCounter}) */}
              {profile?.verified === "true" && (
                <img
                  className="verified"
                  src="/img/icon-verified.svg"
                  height={17}
                  width={17}
                  alt="verified"
                  title={t("verifiedId")}
                />
              )}
              {profile?.licensed === "true" && (
                <img
                  className="licensed"
                  src="/img/icon-licensed.svg"
                  height={17}
                  width={17}
                  alt="licensed"
                  title={t("licensedGuide")}
                />
              )}
              {profile?.canDrive === "true" && (
                <img
                  className="driver"
                  src="/img/icon-driver.svg"
                  height={14}
                  width={14}
                  alt="driver"
                  title={t("canDrive")}
                />
              )}
            </div>
          )}{" "}
          <p
            className="flex-wrapper-five profile-created"
            style={{ marginBottom: "5px" }}
          >
            {t("joined")} {dayjs(profile?.createdAt).format("MM/YYYY")}
          </p>
          <ul className="profile-header-badges">
            {profile?.languages?.map((language, i) => {
              return (
                <li className="badge language flex-wrapper-five" key={i}>
                  <Image
                    src={getLanguageFlagSrc(language)}
                    height={12}
                    width={17}
                    alt={`dekitabi-tour-guide-language-${language
                      .split(" ")
                      .join("-")}`}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  {language}
                </li>
              );
            })}
          </ul>
          {profile?.guide === "true" && (
            <>
              <div className="flex-wrapper-five max-people">
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-signin.svg"
                  alt="dekitabi-tour-guide-max-people"
                />
                {t("maxMsg", { people: profile?.maxPeople })}{" "}
                {profile?.transportIncluded === "true" &&
                  (profile?.feeWithTransport?.halfDay ||
                    profile?.feeWithTransport?.fullDay) && (
                    <p className="transport">
                      (
                      <Image
                        height={14}
                        width={14}
                        src="/img/icon-car.svg"
                        alt="dekitabi-tour-guide-transportation-max-people"
                      ></Image>
                      {profile?.maxPeopleTransport})
                    </p>
                  )}
              </div>
              <ul className="profile-header-prices">
                {profile?.fee?.halfDay ? (
                  <li>
                    <Image
                      src={`/img/icon-half.svg`}
                      height={22}
                      width={22}
                      alt="dekitabi-tour-guide-half-day-fee"
                    />
                    <span>
                      <Price
                        currency={currency}
                        value={profile?.fee?.halfDay}
                        conversionType={"priceWithoutFee"}
                      />
                    </span>
                  </li>
                ) : (
                  <></>
                )}
                {profile?.fee?.fullDay ? (
                  <li className="guide-fee">
                    <Image
                      src={`/img/icon-full.svg`}
                      height={22}
                      width={22}
                      alt="dekitabi-tour-guide-full-day-fee"
                    />
                    <span>
                      <Price
                        currency={currency}
                        value={profile?.fee?.fullDay}
                        conversionType={"priceWithoutFee"}
                      />
                    </span>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </>
          )}
          {profile?.transportIncluded === "true" &&
            profile?.guide === "true" &&
            (profile?.feeWithTransport?.halfDay ||
              profile?.feeWithTransport?.fullDay) && (
              <p className="transport">
                <Image
                  height={17}
                  width={17}
                  src="/img/icon-car.svg"
                  alt="dekitabi-tour-guide-with-transport"
                ></Image>
                {t("priceWithTransport")}
              </p>
            )}
          <div className="profile-buttons">
            {/* {user && user?.guide !== "true" && profile?.guide === "true" && (
              <>
                <button
                  className="normal-button availability"
                  onClick={() => setShowAvailability(true)}
                  style={{ marginBottom: "10px" }}
                >
                  <Image
                    src={`/img/icon-availability.svg`}
                    height={20}
                    width={20}
                    alt="dekitabi-tour-guide-availability"
                  />
                  {t("viewAvailability")}
                </button>
                {user?.uid && profile?.guide === "true" && (
                  <RequestAvailabilityButton
                    t={t}
                    profile={profile}
                    user={user}
                  />
                )}
              </>
            )} */}
            {profile?.uid === user?.uid ? (
              <button
                className="normal-button edit-profile"
                onClick={() => setEditProfile(true)}
              >
                <Image
                  src={`/img/icon-edit2.svg`}
                  height={20}
                  width={20}
                  alt="edit-dekitabi-tour-guideprofile"
                />
                {t("editProfile")}
              </button>
            ) : (
              <>
                {((user && user?.guide !== "true") || (user && !user?.uid)) && (
                  <button
                    className="normal-button"
                    onClick={() => {
                      if (user?.uid) {
                        createChat(
                          profile?.guide === "true" ? profile?.uid : user?.uid,
                          profile?.guide === "false" ? profile?.uid : user?.uid
                        );
                      } else {
                        dispatch(setShowLogin(true));
                      }
                    }}
                  >
                    <Image
                      src={`/img/icon-send.svg`}
                      height={20}
                      width={20}
                      alt="send-message-to-dekitabi-tour-guide"
                    />
                    {t("sendMessage")}
                  </button>
                )}
              </>
            )}
          </div>
          {profile?.replyTime > 0 && profile?.guide === "true" && (
            <div className="flex-wrapper-five profile-reply-time">
              <Image
                src={`/img/icon-clock.svg`}
                height={15}
                width={15}
                alt="dekitabi-tour-guide-reply-time"
              />
              {t("averageReplyTime")}:{" "}
              {profile?.replyTime < 60 && (
                <>
                  {Math.round(profile?.replyTime)} {t("seconds")}
                </>
              )}
              {profile?.replyTime > 60 && profile?.replyTime < 3600 && (
                <>
                  {Math.round(profile?.replyTime / 60)} {t("minutes")}
                </>
              )}
              {profile?.replyTime > 3600 && profile?.replyTime < 86400 && (
                <>
                  {Math.round(profile?.replyTime / 60 / 60)} {t("hours")}
                </>
              )}
              {profile?.replyTime > 86400 && (
                <>
                  {Math.round(profile?.replyTime / 60 / 60 / 24)} {t("days")}
                </>
              )}
            </div>
          )}
          {/* {guide?.lastVisit && (
            <p className="guide-last-visit">
              {t("lastVisit")}{" "}
              {timeAgo?.format(
                Math.floor(new Date().getTime()) -
                  (new Date().getTime() - guide?.lastVisit)
              )}
            </p>
          )} */}
        </div>
      </div>
    </ProfileGeneralDetailsStyles>
  );
};
export default React.memo(ProfileGeneralDetails);
