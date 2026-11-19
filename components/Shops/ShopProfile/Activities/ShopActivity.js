import { ShopActivityStyles } from "./styles/ShopActivityStyles";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import Price from "../../../UI/Price";
import DeleteActivityButton from "../../Activities/DeleteActivityButton";
import DeleteActivityModal from "../../Activities/DeleteActivityModal";
import { useState } from "react";
const ShopActivity = ({ shopProfile, activity, isOwner, t }) => {
  let currency = useSelector((state) => state?.app?.currency);
  if (isOwner || !activity?.withStripe) {
    currency = { code: "JPY", rate: 1, symbol: "¥" };
  }
  const [showDelete, setShowDelete] = useState();
  return (
    <ShopActivityStyles>
      {showDelete && (
        <DeleteActivityModal
          t={t}
          shopProfile={shopProfile}
          activity={activity}
          setShowModal={setShowDelete}
        />
      )}
      <Link prefetch={false} href={`/book/${activity?.url}`}>
        {activity?.photos?.length > 0 ? (
          <div
            className="activity-image"
            style={{
              background: `url(${activity?.photos[0]})`,
            }}
          ></div>
        ) : (
          <div
            className="activity-image cover"
            style={{
              background: `url(/img/avatar.png)`,
            }}
          ></div>
        )}
        <div className="activity-info">
          <p className="activity-name">
            {!isOwner && activity?.translatedName
              ? activity?.translatedName
              : activity?.name}
          </p>
          <p className="activity-persons">
            <Image
              src="/img/icon-signin.svg"
              height={15}
              width={15}
              alt="edit-shop"
            />{" "}
            {activity?.persons?.from === 1 && activity?.persons?.to === 1
              ? 1
              : t("shops:activityPeople", {
                  from: activity?.persons?.from,
                  to: activity?.persons?.to,
                })}
          </p>
          {activity?.duration && (
            <p className="activity-persons">
              <Image
                src="/img/icon-clock.svg"
                height={15}
                width={15}
                alt="activity-duration"
              />{" "}
              {activity?.duration}
              {t("min")}
            </p>
          )}
          {(activity?.price?.general || activity?.price?.adult) && (
            <div className="activity-price">
              <div className="activity-price-details">
                <p className="activity-price-value">
                  <span>
                    <Price
                      value={
                        activity?.price?.general
                          ? activity?.price?.general
                          : activity?.price?.adult
                      }
                      conversionType={"priceWithoutFee"}
                      currency={currency}
                    />
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </Link>
      <Link
        className="normal-button"
        prefetch={false}
        href={`/book/${activity?.url}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.498.498 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>

        {t("shops:seeActivity")}
      </Link>
      <div className="shop-buttons">
        {isOwner && (
          <>
            <DeleteActivityButton setShowDelete={setShowDelete} />
            <Link prefetch={false} href={`/book/${activity?.url}`}>
              <Image
                src="/img/icon-edit2.svg"
                height={20}
                width={20}
                alt="edit-shop"
              />
            </Link>
          </>
        )}
      </div>
    </ShopActivityStyles>
  );
};
export default ShopActivity;
