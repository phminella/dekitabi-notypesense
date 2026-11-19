import ShopActivity from "./ShopActivity";
import ShopNotification from "./ShopNotification";
import { useRouter } from "next/router";
import { ShopActivitiesStyles } from "./styles/ShopActivitiesStyles";
import ShopDescription from "./ShopDescription";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const ShopAddActivity = dynamic(() => import("./ShopAddActivity"), {
  ssr: false,
});
const DekitabiReviews = dynamic(() =>
  import("../../../Reviews/DekitabiReviews/DekitabiReviews")
);
const ShopActivities = ({ t, isOwner, shopProfile, setShowEditModal }) => {
  const router = useRouter();
  return (
    <ShopActivitiesStyles>
      <ShopDescription
        t={t}
        isOwner={isOwner}
        shopProfile={shopProfile}
        setShowEditModal={setShowEditModal}
      />
      {(shopProfile?.activities?.length > 0 || isOwner) && (
        <p className="profile-title">{t("shops:activities")}</p>
      )}
      <ul className="activities-wrapper">
        {shopProfile?.activities?.map?.((activity, i) => (
          <ShopActivity
            key={i}
            activity={activity}
            t={t}
            router={router}
            shopProfile={shopProfile}
            isOwner={isOwner}
          />
        ))}
        {isOwner && (
          <li>
            <ShopAddActivity t={t} shopProfile={shopProfile} />
          </li>
        )}
      </ul>
      <ShopNotification
        shopProfile={shopProfile}
        setShowEditModal={setShowEditModal}
        isOwner={isOwner}
        field={"notification"}
        t={t}
      />
      {shopProfile?.ratingCounter > 0 && !isOwner && (
        <div className="activity-title-details" id="reviews">
          <p className="profile-title">
            <Image
              height={18}
              width={18}
              src="/img/icon-google.svg"
              alt="google"
            ></Image>
            {t("reviewsTitle")}
          </p>
          <DekitabiReviews
            profile={shopProfile}
            user={false}
            t={t}
            id={false}
            reviewsLength={shopProfile?.ratingCounter}
            shop={true}
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
          {t("shops:contactUs")}{" "}
          <Link prefetch={false} href="/contact-us">
            contact@dekitabi.com
          </Link>
        </p>
      </div>
    </ShopActivitiesStyles>
  );
};
export default ShopActivities;
