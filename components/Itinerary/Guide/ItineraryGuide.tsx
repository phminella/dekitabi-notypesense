import { ItineraryGuideStyles } from "./styles/ItineraryGuideStyles";
import Image from "next/image";
import GuideBackground from "../../S/Guides/GuideBackground";
import Link from "next/link";
import { setShowLogin } from "../../../store/appSlice";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../../store/store";
import useChat from "../../../lib/useChat";
import React, { useState } from "react";
import Price from "../../UI/Price";
import dynamic from "next/dynamic";
import { getLanguageFlagSrc } from "../../../lib/languageFlags";
import { LanguageOption } from "../../../types/user";
import { ItineraryGuide as IGuide } from "../../../types/itineraryGuide";

const GuideChat = dynamic(() => import("./GuideChat"));

interface ItineraryGuideProps {
  guide: IGuide;
  t: (key: string, options?: any) => string;
  guideHandler?: (guide: IGuide) => void;
  setShowGuideList?: (show: boolean) => void;
  creator?: string;
  includeTransport?: boolean;
  fromHome?: boolean;
  showToolTip?: boolean;
  language?: LanguageOption;
  currency?: any;
}

const ItineraryGuide = ({
  guide,
  t,
  guideHandler,
  setShowGuideList,
  creator,
  includeTransport,
  fromHome,
  showToolTip,
}: ItineraryGuideProps) => {
  const user = useSelector((state: RootState) => state.app.user, shallowEqual);
  const currency = useSelector((state: RootState) => state.app.currency, shallowEqual);
  const { createChat } = useChat();
  const [loadingChat, setLoadingChat] = useState(false);
  const dispatch = useDispatch();

  return (
    <ItineraryGuideStyles
      className={`guide ${guideHandler ? "itinerary-guide" : ""} ${
        creator === (guide?.uid || (guide as any)?.id) ? "creator" : ""
      }`}
    >
      <Link
        prefetch={false}
        href={`/${guide?.username}`}
        target="_blank"
        rel="noreferrer"
        className="profile-pic-link"
      >
        <div className="guide-background-wrapper">
          <GuideBackground
            fromHome={fromHome}
            src={
              guide?.avatar !== "/img/avatar.png"
                ? guide?.avatar
                : (guide?.photos?.length ?? 0) > 0
                ? guide?.photos![0]
                : "/img/avatar.png"
            }
          />
        </div>
      </Link>
      <div className="guide-details">
        <button
          aria-label={`${guide?.firstname} ${guide?.lastname}`}
          onClick={() => {
            guideHandler?.(guide);
          }}
          className="guide-link"
        />
        {creator === (guide?.uid || (guide as any)?.id) && (
          <div className="itinerary-creator">
            {t("createdThisItinerary", { name: guide?.lastname })}
          </div>
        )}
        <div className="guide-name">
          {guide?.firstname || guide?.lastname ? (
            <span>
              {guide?.firstname} {guide?.lastname}
            </span>
          ) : (
            <span>{guide?.username}</span>
          )}
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
          </div>
        </div>
        {(guide?.languages?.length ?? 0) > 0 && (
          <div className="guide-languages">
            <ul className="flex-wrapper-five">
              {(guide?.languages as string[])?.map((lang, idx) => {
                return (
                  <li className="language flex-wrapper-five" key={idx}>
                    <Image
                      src={getLanguageFlagSrc(lang)}
                      height={15}
                      width={20}
                      alt={`Flag representing ${lang}`}
                      onError={(e: any) => {
                        e.target.style.display = "none";
                      }}
                    />
                    {lang}
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
          {t("maxMsg", { people: guide?.maxPeople })}
          {guide?.transportIncluded === "true" &&
            ((guide?.feeWithTransport as any)?.halfDay ||
              (guide?.feeWithTransport as any)?.fullDay) && (
              <div className="transport-p">
                (
                <Image
                  height={14}
                  width={14}
                  src="/img/icon-car.svg"
                  alt="With transport icon"
                  className="car"
                />
                {guide?.maxPeopleTransport})
              </div>
            )}
        </div>
        {guide?.transportIncluded === "true" &&
          ((guide?.feeWithTransport as any)?.halfDay ||
            (guide?.feeWithTransport as any)?.fullDay) && (
            <div className="transport-p">
              <Image
                height={16}
                width={16}
                src="/img/icon-car.svg"
                alt="Guide fee with transport icon"
              />
              {t("priceWithTransport")}
            </div>
          )}
        {includeTransport &&
        ((guide?.feeWithTransport as any)?.halfDay ||
          (guide?.feeWithTransport as any)?.fullDay) ? (
          <ul className="guide-fees flex-wrapper-five">
            {(guide?.feeWithTransport as any)?.halfDay ? (
              <li>
                <Image
                  src={`/img/icon-half.svg`}
                  height={22}
                  width={22}
                  alt="Half-day guide fee with transport icon"
                />
                <span>
                  <Price
                    {...{
                      currency: currency,
                      value: (guide?.feeWithTransport as any)?.halfDay,
                      conversionType: "priceWithoutFee"
                    } as any}
                  />
                </span>
              </li>
            ) : null}
            {(guide?.feeWithTransport as any)?.fullDay ? (
              <li>
                <Image
                  src={`/img/icon-full.svg`}
                  height={22}
                  width={22}
                  alt="Full-day guide fee with transport icon"
                />
                <span>
                  <Price
                    {...{
                      currency: currency,
                      value: (guide?.feeWithTransport as any)?.fullDay,
                      conversionType: "priceWithoutFee"
                    } as any}
                  />
                </span>
              </li>
            ) : null}
          </ul>
        ) : (
          <ul className="guide-fees flex-wrapper-five">
            {(guide?.fee as any)?.halfDay ? (
              <li>
                <Image
                  src={`/img/icon-half.svg`}
                  height={22}
                  width={22}
                  alt="Half-day guide fee icon"
                />
                <span>
                  <Price
                    {...{
                      currency: currency,
                      value: (guide?.fee as any)?.halfDay,
                      conversionType: "priceWithoutFee"
                    } as any}
                  />
                </span>
              </li>
            ) : null}
            {(guide?.fee as any)?.fullDay ? (
              <li>
                <Image
                  src={`/img/icon-full.svg`}
                  height={22}
                  width={22}
                  alt="Full-day guide fee icon"
                />
                <span>
                  <Price
                    {...{
                      currency: currency,
                      value: (guide?.fee as any)?.fullDay,
                      conversionType: "priceWithoutFee"
                    } as any}
                  />
                </span>
              </li>
            ) : null}
          </ul>
        )}
      </div>
      {guideHandler && (
        <button
          className="guide-button choose-button"
          onClick={() => {
            guideHandler(guide);
          }}
        >
          <Image
            src={`/img/icon-plus.svg`}
            height={18}
            width={18}
            alt="Select guide icon"
          />
        </button>
      )}
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
          {showToolTip && <GuideChat t={t} />}
          <div className="guide-chat-button">
            {!loadingChat ? (
              <button
                className="guide-button message-button"
                onClick={() => {
                  if (user?.uid) {
                    setLoadingChat(true);
                    createChat(guide?.uid || (guide as any)?.id, user?.uid)
                      .then(() => {
                        setLoadingChat(false);
                        if (setShowGuideList) {
                          setShowGuideList(false);
                        }
                      })
                      .catch((err: any) => console.error(err));
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
                  height={18}
                  width={18}
                  alt="Message loading icon"
                />
              </div>
            )}
          </div>
        </>
      )}
    </ItineraryGuideStyles>
  );
};
export default React.memo(ItineraryGuide);
