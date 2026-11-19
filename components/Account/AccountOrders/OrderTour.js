import { OrderTourStyles } from "./styles/OrderTourStyles";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import Price from "../../UI/Price";
import AttractionImage from "../../S/Attractions/AttractionImage";
import { getLanguageFlagSrc } from "../../../lib/languageFlags";
const OrderTour = ({ tour, t }) => {
  const language = useSelector((state) => state.app.language);
  const [tourData, setTourData] = useState();
  const getTour = useCallback(async () => {
    try {
      const tourRef = doc(getFirestore(), "itineraries", tour?.item);
      const tempTour = await getDoc(tourRef);
      const attractionRef = doc(
        getFirestore(),
        "attractions",
        tempTour?.data()?.attractions[0]
      );
      const attractionSnap = await getDoc(attractionRef);
      setTourData({
        ...tempTour.data(),
        attractions: [attractionSnap?.data()],
      });
    } catch (error) {
      setTourData(undefined);
    }
  }, [tour?.item]);
  useEffect(() => {
    getTour();
  }, [getTour]);
  if (!tourData?.startTime)
    return (
      <div
        className="flex-wrapper-five"
        style={{ justifyContent: "center", margin: "50px" }}
      >
        <Image
          height={45}
          width={45}
          src="/img/icon-spinner.svg"
          alt="spinner"
        ></Image>
      </div>
    );
  return (
    <OrderTourStyles>
      <div className="order-image">
        <AttractionImage
          attraction={
            tourData?.attractions[0]?.attractionUrl
              ? tourData?.attractions[0]?.attractionUrl
              : tourData?.attractions[0]?.url
          }
          size={500}
          sizes={"(max-width:460px) 100vw, 200px"}
        />
      </div>
      <div className="order-item">
        <Link prefetch={false} href={`/itinerary/${tourData?.id}`}>
          {tourData?.name}
        </Link>
        {tourData?.transportIncluded ? (
          <p className="order-details">
            <Image
              height={15}
              width={15}
              src="/img/icon-car.svg"
              alt="include-transport"
              className="icons"
            ></Image>
            {t("transportationIncluded")}
          </p>
        ) : (
          <></>
        )}
        <p className="order-details">
          <Image
            height={15}
            width={15}
            src="/img/icon-calendar.svg"
            alt="date"
            className="icons"
          ></Image>
          <b>{dayjs(tourData?.date).format("MM/DD/YYYY")}</b>
          <Image
            height={15}
            width={15}
            src="/img/icon-clock.svg"
            alt="start-time"
            className="icons"
          ></Image>{" "}
          <b>{tourData?.startTime}</b>
          <Image
            height={15}
            width={15}
            src="/img/icon-login.svg"
            alt="clock"
            className="icons"
          ></Image>{" "}
          <b>{tourData?.person}</b>
          <Image
            src={getLanguageFlagSrc(tourData?.primaryLanguage)}
            height={10}
            width={15}
            className="language"
            alt={tourData?.primaryLanguage}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <b>{tourData?.primaryLanguage}</b>
        </p>
        <p>
          {t("meetingPlace")}:{" "}
          <b>
            {tourData?.meetingPlace
              ? tourData?.meetingPlace?.translatedName
                ? tourData?.meetingPlace?.translatedName[language?.code]
                : tourData?.meetingPlace?.name
              : tourData?.attractions[0]?.translatedName[language?.code]}
          </b>
        </p>
        <div className="price">
          <Price
            currency={tour?.currency}
            value={
              tour?.priceWithDiscount
                ? tour?.priceWithDiscount
                : tour?.priceBeforeFee
            }
            conversionType={"priceWithFee"}
          />
        </div>
        {tour?.cancelationFee === 0 || tour?.cancelationFee > 0 ? (
          <div className="cancelation-fee">
            <p>
              {t("cancelationFee")}:{" "}
              <b>
                <Price
                  value={
                    tour?.priceWithDiscount
                      ? tour?.priceWithDiscount
                      : tour?.priceBeforeFee
                  }
                  conversionType={"cancelationFee"}
                  currency={tour?.currency}
                  cancelationFee={tour?.cancelationFee}
                />
              </b>{" "}
              ({tour?.cancelationFee}%)
            </p>
            <p>
              {t("serviceFee")}:{" "}
              <b>
                <Price
                  value={
                    tour?.priceWithDiscount
                      ? tour?.priceWithDiscount
                      : tour?.priceBeforeFee
                  }
                  conversionType={"priceFee"}
                  currency={tour?.currency}
                />
              </b>
            </p>
            <p>
              {t("refund")}:{" "}
              <b>
                <Price
                  value={
                    tour?.priceWithDiscount
                      ? tour?.priceWithDiscount
                      : tour?.priceBeforeFee
                  }
                  conversionType={"refund"}
                  currency={tour?.currency}
                  cancelationFee={tour?.cancelationFee}
                />
              </b>
            </p>
          </div>
        ) : (
          <></>
        )}
        <p
          className={`order-status ${
            tour?.status === "pending" || tour?.status === "waitingPay"
              ? "pending"
              : ""
          }${tour?.status === "paid" ? "paid" : ""} ${
            tour?.status === "canceled" ? "canceled" : ""
          }`}
        >
          {tour?.status === "paid" && (
            <Image
              height={15}
              width={15}
              src="/img/icon-check.svg"
              alt="paid"
            ></Image>
          )}
          {(tour?.status === "pending" || tour?.status === "waitingPay") && (
            <Image
              height={15}
              width={15}
              src="/img/icon-clock.svg"
              alt="pending"
            ></Image>
          )}
          {tour?.status === "canceled" && (
            <Image
              height={15}
              width={15}
              src="/img/icon-close.svg"
              alt="canceled"
            ></Image>
          )}
          {t(tour.status).charAt(0).toUpperCase() + t(tour.status).slice(1)}
        </p>
        {tour?.receipt && (
          <div className="receipt">
            <a href={tour?.receipt} target="_blank" rel="noreferrer">
              {t("viewReceipt")}
            </a>
          </div>
        )}
      </div>
    </OrderTourStyles>
  );
};
export default OrderTour;
