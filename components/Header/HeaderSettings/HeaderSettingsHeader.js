import { HeaderSettingsHeaderStyles } from "./styles/HeaderSettingsHeaderStyles";
import HeaderSettingsBalance from "./HeaderSettingsBalance";
import Avatar from "../../UI/Avatar";
import Link from "next/link";
import Image from "next/image";
import HeaderSettingsGuideBg from "./HeaderSettingsGuideBg";
import dynamic from "next/dynamic";
const StripeLink = dynamic(() => import("../../UI/StripeLink"), { ssr: false });
import React from "react";
import useNetwork from "../../../lib/useNetwork";
import LikeBar from "../../UI/LikeBar";
const HeaderSettingsHeader = ({ user, t, setShowSettings }) => {
  const { isOnline } = useNetwork();
  return (
    <HeaderSettingsHeaderStyles
      className={user?.guide === "true" ? "guide-header" : ""}
    >
      <div className="user-details">
        {user?.guide === "true" && (
          <HeaderSettingsGuideBg
            src={
              user?.bg.length > 4
                ? user?.bg
                : `/img/profile-background/${user?.bg}.webp`
            }
          />
        )}
        <div className="user-details-left">
          <Avatar
            width={100}
            height={100}
            src={
              user?.avatar !== "/img/avatar.png"
                ? user?.avatar
                : user?.photos?.length > 0
                ? user?.photos[0]
                : "/img/avatar.png"
            }
          />
        </div>
        <div className="user-details-right">
          <div className="header-badges">
            {user.verified === "true" && (
              <Image
                className="verified"
                src="/img/icon-verified.svg"
                height={14}
                width={14}
                alt="dekitabi-tour-guide-verified"
                title={t("verifiedId")}
              />
            )}
            {user.licensed === "true" && (
              <Image
                className="licensed"
                src="/img/icon-licensed.svg"
                height={19}
                width={19}
                alt="dekitabi-tour-guide-licensed"
                title={t("licensedGuide")}
              />
            )}
            {user.canDrive === "true" && (
              <Image
                className="driver"
                src="/img/icon-driver.svg"
                height={14}
                width={14}
                alt="dekitabi-tour-guide-can-drive"
                title={t("canDrive")}
              />
            )}
            {user?.guide === "true" && (
              <>
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-star.svg"
                  alt="dekitabi-tour-guide-rating"
                  className="star"
                ></Image>
                {user?.ratingScore ? user?.ratingScore.toFixed(1) : 0}(
                {user?.ratings?.length})
              </>
            )}
          </div>
          <div className="header-username">
            <Link
              prefetch={false}
              onClick={() => setShowSettings(false)}
              href={`/${user.username}`}
            >
              {!user?.firstname
                ? `${user?.username}`
                : `${user?.firstname} ${user?.lastname}`}
            </Link>
            <br />
            {!user?.firstname && !user?.lastname && (
              <Link
                prefetch={false}
                onClick={() => setShowSettings(false)}
                className="add-name"
                href={`/${user.username}`}
              >
                {t("addName")}
              </Link>
            )}
          </div>
          {user.guide === "true" && !user?.stripePayoutsEnabled && (
            <p className={`account-status pending-account`}>
              <span>
                <Image
                  src="/img/icon-clock.svg"
                  height={14}
                  width={14}
                  alt="dekitabi-tour-guide-pending-verification"
                />
                {t("requirementsPending")}
              </span>{" "}
              {/* <Link
                onClick={() => setShowSettings(false)}
                href={`/account/personal-info`}
              >
                {t("viewDetails")}
              </Link> */}
              <StripeLink
                buttonText={t("viewDetails")}
                onClick={() => setShowSettings(false)}
              />
            </p>
          )}
          {user?.guide !== "true" && (
            <LikeBar t={t} likes={user?.likesCounter} />
          )}
        </div>
      </div>
      {user?.couponsLeft > 0 && (
        <div className="coupons-left">
          {t("couponsLeft", { number: user?.couponsLeft })}
        </div>
      )}
      {user?.guide === "true" && isOnline && (
        <HeaderSettingsBalance
          setShowSettings={setShowSettings}
          user={user}
          t={t}
        />
      )}
    </HeaderSettingsHeaderStyles>
  );
};
export default React.memo(HeaderSettingsHeader);
