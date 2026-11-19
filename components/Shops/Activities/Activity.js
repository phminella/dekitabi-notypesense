import { ActivityStyles } from "./styles/ActivityStyles";
import Spinner from "../../UI/Spinner";
import Link from "next/link";
import { Rating } from "@mui/material";
import dynamic from "next/dynamic";
const ActivityPhotos = dynamic(() => import("./ActivityPhotos"), {
  ssr: false,
  loading: () => <Spinner />,
});
const DekitabiReviews = dynamic(
  () => import("../../Reviews/DekitabiReviews/DekitabiReviews"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
import ActivityShopDetails from "./ActivityShopDetails";
import ActivityBookingDetails from "./ActivityBookingDetails";
import ActivityDetails from "./ActivityDetails/ActivityDetails";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
const ActivityEdit = dynamic(() => import("./Edit/ActivityEdit"), {
  ssr: false,
  loading: () => <Spinner />,
});
import { useSelector } from "react-redux";
const DeleteActivityButton = dynamic(() => import("./DeleteActivityButton"), {
  ssr: false,
  loading: () => <Spinner />,
});
const DeleteActivityModal = dynamic(() => import("./DeleteActivityModal"), {
  ssr: false,
  loading: () => <Spinner />,
});
const EditInformationButton = dynamic(() => import("./EditInformationButton"), {
  ssr: false,
  loading: () => <Spinner />,
});
const AddInformationButton = dynamic(() => import("./AddInformationButton"), {
  ssr: false,
  loading: () => <Spinner />,
});
const NoInformation = dynamic(() => import("./NoInformation"), {
  ssr: false,
  loading: () => <Spinner />,
});
const EditAvailabilityButton = dynamic(
  () => import("./EditAvailabilityButton"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
const ActivityBook = dynamic(() => import("./ActivityBook/ActivityBook"), {
  ssr: false,
  loading: () => <Spinner />,
});
const ActivityCheckboxes = dynamic(() => import("./ActivityCheckboxes"), {
  ssr: false,
  loading: () => <Spinner />,
});
const Activity = ({ dbActivity }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState();
  const [activity, setActivity] = useState(dbActivity);
  const [isOwner, setIsOwner] = useState();
  const user = useSelector((state) => state?.app?.user);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  useEffect(() => {
    setDescriptionHeight(
      document.getElementById("description-p")?.scrollHeight
    );
  }, [activity?.description, loading]);
  useEffect(() => {
    if (user) {
      if (user?.shopId) {
        setIsOwner(user?.uid === dbActivity?.shopId);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [user]);
  if (loading) return <Spinner />;
  return (
    <>
      {showEditModal && (
        <ActivityEdit
          setShowModal={setShowEditModal}
          showModal={showEditModal}
          t={t}
          activity={activity}
          setActivity={setActivity}
          setShowDelete={setShowDelete}
        />
      )}
      {showDelete && (
        <DeleteActivityModal
          t={t}
          shopProfile={activity?.shop}
          activity={activity}
          setShowModal={setShowDelete}
        />
      )}
      <ActivityStyles className={isOwner || user?.shopId ? "owner" : ""}>
        {isOwner && activity?.duration && activity?.withAvailability && (
          <EditAvailabilityButton setShowModal={setShowEditModal} />
        )}
        <div className="activity-name">
          <h1>
            {activity?.translatedName && !isOwner
              ? activity?.translatedName
              : activity?.name}
            {isOwner && (
              <EditInformationButton
                setShowModal={setShowEditModal}
                field={"name"}
              />
            )}
          </h1>
          {activity?.ratingCounter > 0 && (
            <div className="activity-rating">
              <Rating
                name="half-rating-read"
                defaultValue={activity.ratingScore}
                precision={0.5}
                size={"small"}
                readOnly
              />{" "}
              <a href="#reviews">({activity?.ratingCounter})</a>
            </div>
          )}
          <Link href={`../shop/${activity?.shop?.url}`} prefetch={false}>
            <Image
              height={22}
              width={22}
              src="/img/icon-shop.svg"
              alt="date"
              className="icons"
            ></Image>
            {activity?.shop?.name}
          </Link>
        </div>
        {isOwner && (
          <ActivityCheckboxes
            t={t}
            activity={activity}
            setActivity={setActivity}
            user={user}
            setShowModal={setShowEditModal}
          />
        )}
        {activity?.name && (
          <div className="activity-photos">
            <ActivityPhotos activity={activity} isOwner={isOwner} t={t} />
          </div>
        )}
        <div
          className={`activity-wrapper ${
            isOwner || user?.shopId ? "owner" : "not-owner"
          }`}
        >
          <div className="activity-details">
            {!activity?.description && !isOwner ? (
              <NoInformation text={t(`shops:noActivityDescription`)} t={t} />
            ) : !activity?.description && isOwner ? (
              <AddInformationButton
                setShowModal={setShowEditModal}
                text={t(`shops:addActivityDescription`)}
                field={"description"}
              />
            ) : (
              <div
                className={`activity-description-wrapper ${
                  showDescription ? "show" : "hide"
                }`}
              >
                {descriptionHeight > 21 && (
                  <button
                    className="show-description activity-button"
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    {showDescription ? (
                      <>{t(`shops:hide`)}</>
                    ) : (
                      <>{t(`shops:showMore`)}</>
                    )}
                  </button>
                )}
                <p id="description-p" className="activity-description">
                  {activity?.translatedDescription && !isOwner
                    ? activity?.translatedDescription
                    : activity?.description}{" "}
                  {isOwner && (
                    <EditInformationButton
                      setShowModal={setShowEditModal}
                      field={"description"}
                    />
                  )}
                </p>
              </div>
            )}
            {!activity?.withStripe && (
              <p className="activity-pay-onsite">
                <Image
                  src="/img/icon-info2.svg"
                  alt="payment on site"
                  height={25}
                  width={25}
                />
                {t(`shops:payOnSiteMsg`)}
              </p>
            )}
            <p className="activity-title activity-title-details">
              {t(`shops:packageDetails`)}
            </p>
            <ActivityDetails
              activity={activity}
              t={t}
              isOwner={isOwner}
              setShowEditModal={setShowEditModal}
            />
            <p className="activity-title activity-title-details">
              {t(`shops:bookingDetails`)}
            </p>
            <ActivityBookingDetails
              activity={activity}
              t={t}
              isOwner={isOwner}
              setShowEditModal={setShowEditModal}
            />
            <p className="activity-title activity-title-details">
              {t(`shops:shopDetails`)}
            </p>
            <ActivityShopDetails
              activity={activity}
              shop={activity?.shop}
              t={t}
              isOwner={isOwner}
            />
            {activity?.ratingCounter > 0 && (
              <div className="activity-title-details" id="reviews">
                <p className="profile-title">{t("reviewsTitle")}</p>
                <DekitabiReviews
                  profile={activity}
                  user={user}
                  t={t}
                  id={activity?.id}
                  reviewsLength={activity?.ratingCounter}
                  activity={true}
                />
              </div>
            )}
            <div className="activity-contact">
              <Image
                src="/img/icon-email.svg"
                alt="contact-us"
                height={15}
                width={22}
              />{" "}
              <p>
                {t(`shops:contactUs`)}{" "}
                <Link href="/contact-us" prefetch={false}>
                  contact@dekitabi.com
                </Link>
              </p>
            </div>
          </div>
          {!isOwner &&
            !user?.shopId &&
            Object.keys(activity?.price).length > 0 && (
              <div className="activity-book-wrapper">
                <ActivityBook activity={activity} t={t} user={user} />
              </div>
            )}
          {isOwner && (
            <DeleteActivityButton
              t={t}
              text={"deleteActivity"}
              setShowDelete={setShowDelete}
              activity={activity}
            />
          )}
        </div>
      </ActivityStyles>
    </>
  );
};
export default Activity;
