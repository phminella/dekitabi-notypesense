import { ShopDetailsStyles } from "./styles/ShopDetailsStyles";
import ShopDetail from "./ShopDetail";
import ShopOpeningHours from "./ShopOpeningHours";
import dynamic from "next/dynamic";
const ShoppingCancellationPolicy = dynamic(
  () => import("./ShopCancellationPolicy"),
  {
    ssr: false,
  }
);
import MapWrapper from "../../../Attraction/Map/MapWrapper";
import { useSelector } from "react-redux";
const ShopDetails = ({ t, shopProfile, setShowEditModal, isOwner }) => {
  const language = useSelector((state) => state?.app?.language);
  return (
    <ShopDetailsStyles>
      <p className="profile-title">{t("shops:shopDetails")}</p>
      {/* Phone Number */}
      {isOwner && (
        <ShopDetail
          shopProfile={shopProfile}
          setShowEditModal={setShowEditModal}
          isOwner={isOwner}
          field={"phoneNumber"}
          t={t}
        />
      )}
      {/* Contact Email */}
      {isOwner && (
        <ShopDetail
          shopProfile={shopProfile}
          setShowEditModal={setShowEditModal}
          isOwner={isOwner}
          field={"contactEmail"}
          t={t}
        />
      )}
      {isOwner && (
        <ShopDetail
          shopProfile={shopProfile}
          setShowEditModal={setShowEditModal}
          isOwner={isOwner}
          field={"website"}
          t={t}
        />
      )}
      {/* Service Languages */}
      <ShopDetail
        shopProfile={shopProfile}
        setShowEditModal={setShowEditModal}
        isOwner={isOwner}
        field={"serviceLanguages"}
        t={t}
      />
      {/* Address */}
      <ShopDetail
        shopProfile={shopProfile}
        setShowEditModal={setShowEditModal}
        isOwner={isOwner}
        field={"address"}
        t={t}
      />
      {shopProfile?._geoloc?.length === 2 && (
        <div className="map">
          <MapWrapper
            attraction={{ _geoloc: shopProfile?._geoloc }}
            language={language}
          />
        </div>
      )}
      {isOwner && (
        <ShoppingCancellationPolicy
          shopProfile={shopProfile}
          setShowEditModal={setShowEditModal}
          isOwner={isOwner}
          t={t}
        />
      )}
      <ShopOpeningHours
        shopProfile={shopProfile}
        setShowEditModal={setShowEditModal}
        isOwner={isOwner}
        t={t}
      />
    </ShopDetailsStyles>
  );
};
export default ShopDetails;
