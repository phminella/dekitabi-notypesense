import { CartTourStyles } from "./styles/CartTourStyles";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
// import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
// import useDate from "../../lib/useDate";
import isMobile from "../../lib/isMobile";
import Price from "../UI/Price";
import { setShowCart } from "../../store/appSlice";
import AttractionImage from "../S/Attractions/AttractionImage";
import { getLanguageFlagSrc } from "../../lib/languageFlags";
const CartTour = ({ item, removeFromCart, t, coupon, order }) => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.app.language, shallowEqual);
  const user = useSelector((state) => state.app.user, shallowEqual);
  // const { isGuideAvailable } = useDate();
  // const db = getFirestore();
  // const [guideAvailable, setGuideAvailable] = useState(true);
  const [dateError, setDateError] = useState(false);
  // const checkGuideAvailability = async () => {
  //   const docRef = doc(db, "users", item?.guide);
  //   const docSnap = await getDoc(docRef);
  //   const guide = docSnap.data();
  //   setGuideAvailable(isGuideAvailable(guide.availability, item.date));
  // };
  useEffect(() => {
    if (item?.guide) {
      // checkGuideAvailability();
    } else {
      removeFromCart(item?.id);
    }
    if (
      dayjs(item?.date).startOf("day").valueOf() <
      dayjs().startOf("day").add(1, "day").valueOf()
    ) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }, [item?.date]);
  if (!item) return <></>;
  return (
    <CartTourStyles>
      <div className="cart-item-wrapper">
        <div className="cart-item-icon">
          <AttractionImage
            attraction={
              item?.attractions[0]?.attractionUrl
                ? item?.attractions[0]?.attractionUrl
                : item?.attractions[0]?.url
            }
            size={300}
            sizes={"(max-width:460px) 100vw, 200px"}
          />
        </div>
        <div className="cart-item-details">
          <Link
            prefetch={false}
            href={`/itinerary/${item.url ? item.url : item.id}`}
            onClick={() => dispatch(setShowCart(false))}
          >
            <p className="cart-item-name">
              {item?.translatedName &&
              item?.createdBy !== "Guest" &&
              item?.createdBy !== user?.uid
                ? item?.translatedName[language?.code]
                : item?.name}
            </p>
          </Link>
          <div className="cart-item-guide">
            {t("guide")}:
            <Link
              prefetch={false}
              href={`/${item.guideData?.username}`}
              target={isMobile() ? "_self" : "_blank"}
              rel="noreferrer"
              onClick={() => dispatch(setShowCart(false))}
              // className={!guideAvailable ? "date-error" : ""}
            >
              {item.guideData?.firstname ? (
                <>
                  {item.guideData?.firstname} {item.guideData?.lastname}
                </>
              ) : (
                <>{item.guideData?.username}</>
              )}
            </Link>
          </div>
          <div className="cart-item-language-format">
            <div className="cart-item-time">
              <Image
                height={13}
                width={13}
                src="/img/icon-clock.svg"
                alt="dekitabi-tour-start-time"
              ></Image>
              {item.startTime}
            </div>
            <div className={`cart-item-time ${dateError ? "date-error" : ""}`}>
              <Image
                height={13}
                width={13}
                src="/img/icon-calendar.svg"
                alt="dekitabi-tour-date"
              ></Image>
              {dayjs(item.date).format("MM/DD/YYYY")}
            </div>
            <div className="cart-item-time">
              <Image
                height={13}
                width={13}
                src="/img/icon-login.svg"
                alt="dekitabi-tour-person-amount"
              ></Image>
              <p>{item.person}</p>
            </div>
            <div className="cart-item-time language">
              <Image
                src={getLanguageFlagSrc(item?.primaryLanguage)}
                height={10}
                width={15}
                alt={`dekitabi-tour-language-${item?.primaryLanguage}`}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {item?.primaryLanguage}
            </div>
          </div>
          <div className="cart-item-meeting-place">
            {t("meetingPlace")}:{" "}
            <b>
              {item.meetingPlace
                ? item?.meetingPlace?.translatedName
                  ? item?.meetingPlace?.translatedName[language?.code]
                  : item?.meetingPlace?.name
                : item.attractions[0].translatedName
                ? item.attractions[0].translatedName[language.code]
                : item.attractions[0].name}
            </b>
          </div>
          {item?.transportIncluded ? (
            <div className="cart-item-time">
              <Image
                height={14}
                width={14}
                src="/img/icon-car.svg"
                alt="dekitabi-tour-transportation-included"
              ></Image>
              {t("transportationIncluded")}
            </div>
          ) : (
            <></>
          )}
          <div className="cart-item-price">
            <Price
              value={item?.price}
              conversionType={order ? "priceWithFee" : "priceWithoutFee"}
              currency={item?.currency}
              coupon={coupon}
              likesCounter={order ? user?.likesCounter : 0}
            />
          </div>
          <div className="cart-item-remove">
            <Link
              prefetch={false}
              href={`/itinerary/${item.url ? item.url : item.id}`}
              onClick={() => dispatch(setShowCart(false))}
            >
              {t("makeChanges")}
            </Link>
            <button onClick={() => removeFromCart(item?.id)}>
              {t("remove").toLowerCase()}
            </button>
          </div>
        </div>
      </div>
    </CartTourStyles>
  );
};
export default React.memo(CartTour);
