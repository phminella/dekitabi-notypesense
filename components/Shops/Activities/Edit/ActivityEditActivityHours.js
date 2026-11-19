import { ShopEditAccessStyles } from "../../ShopProfile/Edit/styles/ShopEditAccessStyles";
import { ActivityEditStringStyles } from "./styles/ActivityEditStringStyles";
import NoInformation from "../NoInformation";
import EditInformationButton from "../EditInformationButton";
import { useState } from "react";
import Image from "next/image";
import { ActivityHoursStyles } from "../ActivityDetails/styles/ActivityHoursStyles";
const ActivityEditActivityHours = ({
  field,
  activity,
  updateProfile,
  t,
  maxChar = 6,
}) => {
  const timeRange = [
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "24:00",
  ];
  const weekdays = [
    "Sundays",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
  ];
  const [edit, setEdit] = useState();
  const [input, setInput] = useState(activity?.activityHours);
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(field, input).then(() => {
      setEdit(false);
    });
  };
  return (
    <ActivityEditStringStyles>
      <ShopEditAccessStyles className="edit-opening-hours">
        <p className="profile-field">
          {t("shops:activityHours")}{" "}
          {!edit && (
            <EditInformationButton setShowModal={setEdit} field={field} />
          )}
        </p>
        <p className="profile-subtitle">
          {t("shops:editActivityHoursSubtitle")}
        </p>
        {!edit && (
          <ActivityHoursStyles>
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
        )}
        {!edit && !activity["activityHours"] && (
          <NoInformation
            text={t(`shops:noActivityHours`)}
            add={setEdit}
            t={t}
          />
        )}
        {edit && (
          <div className="edit-access">
            <form onSubmit={handleSubmit}>
              {[...Array(7)].map((weekday, i) => {
                let day = i === 6 ? 0 : i + 1;
                return (
                  <div className="weekday-wrapper" key={i}>
                    <p className="weekday-edit">
                      {t(`shops:${weekdays[day]}`)}
                    </p>
                    <div
                      className={`mui-input-wrapper opening-hours-input-wrapper`}
                      key={i}
                    >
                      {input[day]?.map((schedule, x) => {
                        return (
                          <>
                            {x % 2 === 0 ? (
                              <p className="from">{t("from")}</p>
                            ) : (
                              <p className="from">{t("to")}</p>
                            )}
                            <select
                              name={`${weekdays[day]}${x}`}
                              required
                              value={schedule}
                              id={`${weekdays[day]}${x}`}
                              autoFocus
                              onChange={(e) => {
                                if (e.target.value?.length < maxChar) {
                                  let tempInput = { ...input };
                                  tempInput[day][x] = e.target.value;
                                  setInput(tempInput);
                                }
                              }}
                            >
                              {timeRange?.map((time, i) => {
                                if (
                                  (new Date(`01/01/2025 ${time}`)?.getTime() >
                                    new Date(
                                      `01/01/2025 ${input[day][x - 1]}`
                                    )?.getTime() ||
                                    !input[day][x - 1]) &&
                                  (new Date(`01/01/2025 ${time}`)?.getTime() <
                                    new Date(
                                      `01/01/2025 ${input[day][x + 1]}`
                                    )?.getTime() ||
                                    !input[day][x + 1])
                                ) {
                                  return (
                                    <option key={i} value={time}>
                                      {time}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                            {x % 2 !== 0 && (
                              <button
                                type="button"
                                className="access-button"
                                onClick={() => {
                                  let tempInput = { ...input };
                                  tempInput[day].splice(x - 1, 2);
                                  setInput(tempInput);
                                }}
                              >
                                <Image
                                  src={`/img/icon-close.svg`}
                                  height={15}
                                  width={15}
                                  alt={"remove-access"}
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              </button>
                            )}
                          </>
                        );
                      })}
                    </div>
                    {timeRange.findIndex(
                      (x) => x === input[day][input[day]?.length - 1]
                    ) < 45 && (
                      <button
                        type="button"
                        className="access-button more-schedule"
                        onClick={() => {
                          let tempInput = { ...input };
                          const lastTimeIndex = timeRange.findIndex(
                            (x) =>
                              x === tempInput[day][tempInput[day]?.length - 1]
                          );
                          const from =
                            lastTimeIndex === -1
                              ? "09:00"
                              : timeRange[lastTimeIndex + 1];
                          const to = "24:00";
                          tempInput[day] = [...tempInput[day], from, to];
                          setInput(tempInput);
                        }}
                      >
                        <Image
                          src={`/img/icon-plus.svg`}
                          height={15}
                          width={15}
                          alt={"add-access"}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        {t("shops:addMore")}
                      </button>
                    )}
                  </div>
                );
              })}
              <div className="edit-buttons">
                <button
                  type="button"
                  className="link"
                  onClick={() => {
                    setInput({ ...activity?.activityHours });
                    setEdit(false);
                  }}
                >
                  {t("cancel")}
                </button>{" "}
                <button type="submit" className="normal-button">
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        )}
      </ShopEditAccessStyles>
    </ActivityEditStringStyles>
  );
};
export default ActivityEditActivityHours;
