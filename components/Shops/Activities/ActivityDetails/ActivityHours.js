import { ActivityHoursStyles } from "./styles/ActivityHoursStyles";
import AddInformationButton from "../AddInformationButton";
import EditInformationButton from "../EditInformationButton";
const ActivityHours = ({ isOwner, activity, setShowEditModal, t }) => {
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
    <ActivityHoursStyles>
      <p className="profile-title">{t("shops:activityHours")}</p>
      {/* Is owner and no information */}
      {isOwner && !activity?.activityHours && (
        <AddInformationButton
          setShowModal={setShowEditModal}
          text={t(`shops:addActivityHours`)}
          field={"activityHours"}
        />
      )}
      {isOwner && activity?.activityHours && (
        <EditInformationButton
          setShowModal={setShowEditModal}
          field={"activityHours"}
        />
      )}
      <div className="opening-hours-wrapper">
        {activity?.activityHours && (
          <div>
            {[...Array(7)].map((weekday, i) => {
              let day = i === 6 ? 0 : i + 1;
              return (
                <div className="opening-hours" key={i}>
                  <p className="weekday">{t(`shops:${weekdays[day]}`)}</p>
                  <p className="time">
                    {activity?.activityHours[day]?.length === 0 ? (
                      <>{t("closed")}</>
                    ) : (
                      <>
                        {activity?.activityHours[day]?.map((time, i) => (
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
    </ActivityHoursStyles>
  );
};
export default ActivityHours;
