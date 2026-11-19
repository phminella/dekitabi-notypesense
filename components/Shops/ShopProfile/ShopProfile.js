import { useState } from "react";
import Spinner from "../../UI/Spinner";
import dynamic from "next/dynamic";
import ShopProfileTabs from "./ShopProfileTabs";
import { ShopProfileStyles } from "./styles/ShopProfileStyles";
import ShopDetail from "./Details/ShopDetail";
import { Rating } from "@mui/material";
import ShopProfileCarousel from "./ShopProfileCarousel";
const ShopEdit = dynamic(() => import("./Edit/ShopEdit"), {
  ssr: false,
  loading: () => <Spinner />,
});
const AddInformationButton = dynamic(
  () => import("../Activities/AddInformationButton"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
import EditInformationButton from "../Activities/EditInformationButton";
import Link from "next/link";
import { pageview } from "../../../lib/fbpixel";
const ShopAccount = dynamic(() => import("./Account/ShopAccount"), {
  ssr: false,
  loading: () => <Spinner />,
});
const ShopActivities = dynamic(() => import("./Activities/ShopActivities"), {
  ssr: false,
  loading: () => <Spinner />,
});
const ShopDetails = dynamic(() => import("./Details/ShopDetails"), {
  ssr: false,
  loading: () => <Spinner />,
});
const ShopProfile = ({ t, isOwner, shop }) => {
  const [tab, setTab] = useState(
    shop?.description || shop?.activities?.length > 0 || isOwner
      ? "activities"
      : "details"
  );
  const [shopProfile, setShopProfile] = useState({ ...shop });
  const [showEditModal, setShowEditModal] = useState(false);
  const withCarousel = isOwner || shop?.photos?.length > 0;
  return (
    <ShopProfileStyles>
      {showEditModal && (
        <ShopEdit
          setShowModal={setShowEditModal}
          showModal={showEditModal}
          t={t}
          shopProfile={shopProfile}
          setShopProfile={setShopProfile}
        />
      )}
      <div className="profile-wrapper">
        <div className="profile-header">
          {isOwner && !shopProfile["name"] ? (
            <AddInformationButton
              setShowModal={setShowEditModal}
              text={t(`shops:addShopName`)}
              field={"name"}
            />
          ) : (
            <h1>
              {shopProfile?.name}{" "}
              {isOwner && (
                <EditInformationButton
                  setShowModal={setShowEditModal}
                  field={"name"}
                />
              )}
            </h1>
          )}
          {shopProfile?.ratingCounter > 0 && (
            <div className="shop-rating">
              <Rating
                name="half-rating-read"
                defaultValue={shopProfile.ratingScore}
                precision={0.5}
                size={"large"}
                readOnly
              />{" "}
              <a href="#reviews">({shopProfile?.ratingCounter})</a>
            </div>
          )}
          <div className="headline">
            {(isOwner || shopProfile?.headline) && (
              <ShopDetail
                shopProfile={shopProfile}
                setShowEditModal={setShowEditModal}
                isOwner={isOwner}
                field={"headline"}
                t={t}
              />
            )}
          </div>
          {isOwner && shopProfile?.sample && (
            <div className="sample">
              <Link
                prefetch={false}
                href={"/shop/dekitabi"}
                target="_blank"
                onClick={async () => {
                  import("firebase/firestore/lite").then(
                    ({ getFirestore, doc, updateDoc, deleteField }) => {
                      updateDoc(
                        doc(getFirestore(), "shops", shopProfile?.uid),
                        {
                          sample: deleteField(),
                        }
                      );
                    }
                  );
                }}
              >
                {t("shops:sample")}
              </Link>
            </div>
          )}
        </div>
        {withCarousel && (
          <ShopProfileCarousel
            shopProfile={shopProfile}
            isOwner={isOwner}
            t={t}
          />
        )}
        {(shop?.description || shop?.activities?.length > 0 || isOwner) && (
          <ShopProfileTabs t={t} tab={tab} setTab={setTab} isOwner={isOwner} />
        )}
        {tab === "activities" && (
          <ShopActivities
            t={t}
            shopProfile={shopProfile}
            isOwner={isOwner}
            setShowEditModal={setShowEditModal}
          />
        )}
        {tab === "account" && (
          <ShopAccount
            t={t}
            shopProfile={shopProfile}
            setShopProfile={setShopProfile}
          />
        )}
        {tab === "details" && (
          <ShopDetails
            t={t}
            shopProfile={shopProfile}
            setShowEditModal={setShowEditModal}
            isOwner={isOwner}
          />
        )}
      </div>
    </ShopProfileStyles>
  );
};
export default ShopProfile;
