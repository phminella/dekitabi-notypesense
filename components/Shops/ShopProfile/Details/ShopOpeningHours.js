import { ShopOpeningHoursStyles } from "./styles/ShopOpeningHoursStyles";
import AddInformationButton from "../../Activities/AddInformationButton";
import EditInformationButton from "../../Activities/EditInformationButton";
const ShopOpeningHours = ({ isOwner, shopProfile, setShowEditModal, t }) => {
  const weekdays = [
    "Sundays",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
  ];
  return (
    <ShopOpeningHoursStyles>
      <p className="profile-title">{t("openingHours")}</p>
      {/* Is owner and no information */}
      {isOwner && !shopProfile?.openingHours && (
        <AddInformationButton
          setShowModal={setShowEditModal}
          text={t(`addOpeningHours`)}
          field={"openingHours"}
        />
      )}
      {isOwner && shopProfile?.openingHours && (
        <EditInformationButton
          setShowModal={setShowEditModal}
          field={"openingHours"}
        />
      )}
      <div className="opening-hours-wrapper">
        {shopProfile?.openingHours && (
          <div>
            {[...Array(7)].map((weekday, i) => {
              let day = i === 6 ? 0 : i + 1;
              return (
                <div className="opening-hours" key={i}>
                  <p className="weekday">{t(`shops:${weekdays[day]}`)}</p>
                  <p className="time">
                    {shopProfile?.openingHours[day]?.length === 0 ? (
                      <>{t("closed")}</>
                    ) : (
                      <>
                        {shopProfile?.openingHours[day]?.map((time, i) => (
                          <span key={i}>
                            {time}
                            {i % 2 === 0 ? " - " : <br />}
                          </span>
                        ))}
                      </>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ShopOpeningHoursStyles>
  );
};
export default ShopOpeningHours;
