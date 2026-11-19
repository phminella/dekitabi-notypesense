import { ActivityDetailsStyles } from "./styles/ActivityDetailsStyles";
const ActivityDetails = ({ t, booking, language }) => {
  return (
    <ActivityDetailsStyles>
      <li>
        <div className="label">{t("shops:activity")}</div>
        <div className="value">
          {booking?.activity?.translatedName
            ? booking?.activity?.translatedName[language?.code]
            : booking?.activity?.name}
        </div>
      </li>
      <li>
        <div className="label">{t("shops:date")}</div>
        <div className="value">{booking?.date}</div>
      </li>
      <li>
        <div className="label">{t("time")}</div>
        <div className="value">{booking?.time}</div>
      </li>
    </ActivityDetailsStyles>
  );
};
export default ActivityDetails;
