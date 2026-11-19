import { GuideStyles } from "./styles/GuideStyles";
import Image from "next/image";
import GuideBackground from "./GuideBackground";
import Link from "next/link";
import { setShowLogin } from "../../../store/appSlice";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import useChat from "../../../lib/useChat";
import React, { useState } from "react";
import Price from "../../UI/Price";
import { getLanguageFlagSrc } from "../../../lib/languageFlags";
const Guide = ({
  guide,
  t,
  guideHandler,
  setShowGuideList,
  creator,
  includeTransport,
  fromHome,
  showToolTip,
}) => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const { createChat } = useChat();
  const [loadingChat, setLoadingChat] = useState(false);
  const dispatch = useDispatch();
  return (
    <GuideStyles className={`guide ${guideHandler ? "itinerary-guide" : ""}`}>
      <GuideBackground
        fromHome={fromHome}
        src={
          guide?.avatar !== "/img/avatar.png"
            ? guide?.avatar
            : guide?.photos?.length > 0
            ? guide?.photos[0]
            : "/img/avatar.png"
        }
      />
      <Link
        aria-label={`${guide?.firstname} ${guide?.lastname}`}
        prefetch={false}
        href={`/${guide?.username}`}
        target={"_blank"}
        rel="noreferrer"
        className="guide-link"
      ></Link>
      {creator === guide?.uid && (
        <div className="itinerary-creator">
          {t("createdThisItinerary", { name: guide?.lastname })}
        </div>
      )}
      <div className="guide-wrapper">
        <Link
          prefetch={false}
          href={`/${guide?.username}`}
          target="_blank"
          rel="noreferrer"
        >
          <>
            <div className="guide-name">
              <div className="guide-name-badges">
                {guide?.verified === "true" && (
                  <Image
                    className="verified"
                    src="/img/icon-verified.svg"
                    height={15}
                    width={15}
                    alt="Verified guide icon"
                    title={t("verifiedId")}
                  />
                )}
                {guide?.licensed === "true" && (
                  <Image
                    className="licensed"
                    src="/img/icon-licensed.svg"
                    height={20}
                    width={20}
                    alt="Licensed guide icon"
                    title={t("licensedGuide")}
                  />
                )}
                {guide?.canDrive === "true" && (
                  <Image
                    className="driver"
                    src="/img/icon-driver.svg"
                    height={13}
                    width={13}
                    alt="Guide can drive icon"
                    title={t("canDrive")}
                  />
                )}
                {/* <div className="guide-rating flex-wrapper-five">
                  <Image
                    height={14}
                    width={14}
                    src="/img/icon-star.svg"
                    alt="star"
                    className="star"
                  ></Image>
                  {guide?.ratingScore?.toFixed(1) || 0} (
                  {guide?.ratingCounter || 0})
                </div> */}
              </div>
              {guide?.firstname || guide?.lastname ? (
                <span>
                  {guide?.firstname} {guide?.lastname}
                </span>
              ) : (
                <span>{guide?.username}</span>
              )}
            </div>
            {guide?.languages?.length > 0 && (
              <div className="guide-languages">
                <ul className="flex-wrapper-five">
                  {guide?.languages?.map((language, i) => {
                    return (
                      <li className="language flex-wrapper-five" key={i}>
                        <Image
                          src={getLanguageFlagSrc(language)}
                          height={15}
                          width={20}
                          alt={`Flag representing ${language}`}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        {language}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="flex-wrapper-five max-people">
              <Image
                height={15}
                width={15}
                src="/img/icon-signin.svg"
                alt="Max people icon"
              />
              {t("maxMsg", { people: guide?.maxPeople })}{" "}
              {guide?.transportIncluded === "true" &&
                (guide?.feeWithTransport?.halfDay ||
                  guide?.feeWithTransport?.fullDay) && (
                  <p className="transport">
                    (
                    <Image
                      height={14}
                      width={14}
                      src="/img/icon-car.svg"
                      alt="With transport icon"
                      className="car"
                    ></Image>
                    {guide?.maxPeopleTransport})
                  </p>
                )}
            </div>
            {includeTransport &&
            (guide?.feeWithTransport?.halfDay ||
              guide?.feeWithTransport?.fullDay) ? (
              <ul className="guide-fees flex-wrapper-five">
                {guide?.feeWithTransport?.halfDay ? (
                  <li>
                    <Image
                      src={`/img/icon-half.svg`}
                      height={22}
                      width={22}
                      alt="Half-day guide fee with transport icon"
                    />
                    <span>
                      <Price
                        currency={currency}
                        value={guide?.feeWithTransport?.halfDay}
                        conversionType={"priceWithoutFee"}
                      />
                    </span>
                  </li>
                ) : (
                  <></>
                )}
                {guide?.feeWithTransport?.fullDay ? (
                  <li>
                    <Image
                      src={`/img/icon-full.svg`}
                      height={22}
                      width={22}
                      alt="Full-day guide fee with transport icon"
                    />
                    <span>
                      <Price
                        currency={currency}
                        value={guide?.feeWithTransport?.fullDay}
                        conversionType={"priceWithoutFee"}
                      />
                    </span>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            ) : (
              <ul className="guide-fees flex-wrapper-five">
                {guide?.fee?.halfDay ? (
                  <li>
                    <Image
                      src={`/img/icon-half.svg`}
                      height={22}
                      width={22}
                      alt="Half-day guide fee icon"
                    />
                    <span>
                      <Price
                        currency={currency}
                        value={guide?.fee?.halfDay}
                        conversionType={"priceWithoutFee"}
                      />
                    </span>
                  </li>
                ) : (
                  <></>
                )}
                {guide?.fee?.fullDay ? (
                  <li>
                    <Image
                      src={`/img/icon-full.svg`}
                      height={22}
                      width={22}
                      alt="Full-day guide fee icon"
                    />
                    <span>
                      <Price
                        currency={currency}
                        value={guide?.fee?.fullDay}
                        conversionType={"priceWithoutFee"}
                      />
                    </span>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            )}
            {guide?.transportIncluded === "true" &&
              (guide?.feeWithTransport?.halfDay ||
                guide?.feeWithTransport?.fullDay) && (
                <p className="transport">
                  <Image
                    height={14}
                    width={14}
                    src="/img/icon-car.svg"
                    alt="Guide fee with transport icon"
                  ></Image>
                  {t("priceWithTransport")}
                </p>
              )}
          </>
        </Link>
        {guideHandler && (
          <button
            className="normal-button choose-guide-button"
            onClick={() => {
              guideHandler(guide);
            }}
          >
            <Image
              src={`/img/icon-check.svg`}
              height={15}
              width={15}
              alt="Select guide icon"
            />
            {t("choose")}
          </button>
        )}
      </div>
      <Link
        prefetch={false}
        className="guide-button profile-button"
        href={`/${guide?.username}`}
        target={"_blank"}
        rel="noreferrer"
      >
        <Image
          src={`/img/icon-profile-filled.svg`}
          height={18}
          width={18}
          alt="Profile icon"
        />
      </Link>
      {((user && user?.guide !== "true") || (user && !user?.uid)) && (
        <>
          <div className="guide-chat-button">
            {!loadingChat ? (
              <button
                className="guide-button message-button"
                onClick={() => {
                  if (user?.uid) {
                    setLoadingChat(true);
                    createChat(guide?.uid, user?.uid)
                      .then(() => {
                        setLoadingChat(false);
                        if (setShowGuideList) {
                          setShowGuideList(false);
                        }
                      })
                      .catch(() => {
                        setLoadingChat(false);
                      });
                  } else {
                    if (setShowGuideList) {
                      setShowGuideList(false);
                    }
                    dispatch(setShowLogin(true));
                  }
                }}
              >
                <Image
                  src={`/img/icon-send.svg`}
                  height={18}
                  width={18}
                  alt="Send message icon"
                />
              </button>
            ) : (
              <div className="guide-button message-button">
                <Image
                  src="/img/icon-spinner.svg"
                  height={35}
                  width={35}
                  alt="Message loading icon"
                />
              </div>
            )}
          </div>
        </>
      )}
    </GuideStyles>
  );
};
export default React.memo(Guide);
