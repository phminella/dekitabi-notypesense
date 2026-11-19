import AddInformationButton from "../../Activities/AddInformationButton";
import NoInformation from "../../Activities/NoInformation";
import EditInformationButton from "../../Activities/EditInformationButton";
import { ShopNotificationStyles } from "./styles/ShopNotificationStyles";
const ShopNotification = ({
  isOwner,
  shopProfile,
  setShowEditModal,
  field,
  t,
}) => {
  return (
    <ShopNotificationStyles>
      {/* Is owner and no information */}
      {isOwner && !shopProfile[field] && (
        <AddInformationButton
          setShowModal={setShowEditModal}
          text={t("shops:addShopNotification")}
          field={field}
        />
      )}
      {(shopProfile[field] || !isOwner) && (
        <div>
          {/* Is owner and information is added */}
          {isOwner && (
            <EditInformationButton
              setShowModal={setShowEditModal}
              field={field}
            />
          )}
          {/* Not owner */}
          <div className="notification-label">{t("shops:notification")}</div>
          <div className="notification-value">
            {/* Not owner and no information */}
            {!shopProfile[field] && (
              <NoInformation text={t("shops:noShopNotification")} t={t} />
            )}
            <p>
              {!isOwner &&
              shopProfile?.translatedNotification &&
              typeof shopProfile?.translatedNotification === "string"
                ? shopProfile?.translatedNotification
                : shopProfile?.notification}
            </p>
          </div>
        </div>
      )}
    </ShopNotificationStyles>
  );
};
export default ShopNotification;
