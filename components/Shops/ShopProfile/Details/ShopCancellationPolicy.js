import { ShopOpeningHoursStyles } from "./styles/ShopOpeningHoursStyles";
import AddInformationButton from "../../Activities/AddInformationButton";
import EditInformationButton from "../../Activities/EditInformationButton";

const ShopCancellationPolicy = ({
  isOwner,
  shopProfile,
  setShowEditModal,
  t,
}) => {
  const cancellationPolicy = shopProfile?.cancellationPolicy || [];

  return (
    <ShopOpeningHoursStyles className="cancellation-policy">
      <p className="profile-title">{t("cancelationPolicy")}</p>

      {/* Add or edit button */}
      {isOwner && cancellationPolicy.length === 0 && (
        <AddInformationButton
          setShowModal={setShowEditModal}
          text={t("shops:addCancellationPolicy")}
          field="cancellationPolicy"
        />
      )}
      {isOwner && cancellationPolicy.length > 0 && (
        <EditInformationButton
          setShowModal={setShowEditModal}
          field="cancellationPolicy"
        />
      )}

      {/* No information for visitors */}
      {!isOwner && cancellationPolicy.length === 0 && (
        <p className="no-cancellation-policy">
          {t("shops:noCancellationPolicy")}
        </p>
      )}

      {/* Policy list */}
      {cancellationPolicy.length > 0 && (
        <ul className="opening-hours-wrapper cancellation-policy">
          {cancellationPolicy.map((policy, i) => {
            const prev = cancellationPolicy[i - 1];
            const range =
              i === 0 && policy?.days > 0
                ? `0 ~ ${policy?.days}`
                : i > 0 && prev?.days + 1 !== policy?.days
                ? `${prev?.days + 1} ~ ${policy?.days}`
                : policy?.days;

            return (
              <li className="opening-hours" key={i}>
                <div className="days">
                  {t("shops:cancellationPolicyDays", { days: range })}
                </div>
                <div className="fee">{policy?.fee}%</div>
              </li>
            );
          })}

          {/* Final range: x days or more = 0% */}
          <li className="opening-hours">
            <div className="days">
              {t("shops:cancellationPolicyDaysOrMore", {
                days:
                  cancellationPolicy[cancellationPolicy.length - 1]?.days + 1,
              })}
            </div>
            <div className="fee">0%</div>
          </li>
        </ul>
      )}
    </ShopOpeningHoursStyles>
  );
};

export default ShopCancellationPolicy;
