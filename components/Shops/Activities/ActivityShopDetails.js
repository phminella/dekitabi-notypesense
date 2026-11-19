import ShopDetail from "../ShopProfile/Details/ShopDetail";
import { ShopDetailsStyles } from "../ShopProfile/Details/styles/ShopDetailsStyles";
import ShopCancellationPolicy from "../ShopProfile/Details/ShopCancellationPolicy";
import ShopNotification from "../ShopProfile/Activities/ShopNotification";
import ShopEdit from "../ShopProfile/Edit/ShopEdit";
import { useState } from "react";
const ActivityShopDetails = ({ shop, t, isOwner, activity }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [shopProfile, setShopProfile] = useState({ ...shop });
  return (
    <>
      {showEditModal && (
        <ShopEdit
          setShowModal={setShowEditModal}
          showModal={showEditModal}
          t={t}
          shopProfile={shopProfile}
          setShopProfile={setShopProfile}
          activity={true}
        />
      )}
      <ShopDetailsStyles>
        {isOwner &&
        <ShopDetail
          field={"phoneNumber"}
          shopProfile={shopProfile}
          t={t}
          isOwner={isOwner}
          setShowEditModal={setShowEditModal}
        />}
        {isOwner &&
        <ShopDetail
          field={"contactEmail"}
          shopProfile={shopProfile}
          t={t}
          isOwner={isOwner}
          setShowEditModal={setShowEditModal}
        />}
        {isOwner && (
          <ShopDetail
            field={"website"}
            shopProfile={shopProfile}
            t={t}
            isOwner={isOwner}
            setShowEditModal={setShowEditModal}
          />
        )}
        <ShopDetail
          field={"serviceLanguages"}
          shopProfile={shopProfile}
          t={t}
          isOwner={isOwner}
          setShowEditModal={setShowEditModal}
        />
        {(activity?.withStripe || isOwner) && (
          <ShopCancellationPolicy
            isOwner={isOwner}
            shopProfile={shopProfile}
            t={t}
            setShowEditModal={setShowEditModal}
          />
        )}
        <ShopNotification
          shopProfile={shopProfile}
          setShowEditModal={setShowEditModal}
          isOwner={isOwner}
          field={"notification"}
          t={t}
        />
      </ShopDetailsStyles>
    </>
  );
};
export default ActivityShopDetails;
