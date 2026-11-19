import { ActivityEditAvailabilityStyles } from "./styles/ActivityEditAvailabilityStyles";
import ActivitySlots from "../ActivityDetails/ActivitySlots";
import moment from "moment";
import { useState } from "react";
import EditInformationButton from "../EditInformationButton";
import ActivityEditAvailabilitySelect from "./ActivityEditAvailabilitySelect";
import { ActivityEditStringStyles } from "./styles/ActivityEditStringStyles";
import { ActivityBookStyles } from "../ActivityBook/styles/ActivityBookStyles";

const ActivityEditAvailability = ({
  activity,
  t,
  showModal,
  updateProfile,
}) => {
  const [edit, setEdit] = useState(showModal === "availability");
  const [date, setDate] = useState(moment(new Date()).add(1, "days"));
  const [timeOptions, setTimeOptions] = useState([]);
  const [availability, setAvailability] = useState(
    activity?.availability || {}
  );

  const handleSubmit = () => {
    let tempAvailability = { ...availability };

    Object.keys(tempAvailability).forEach((key) => {
      // Use moment for date comparison
      if (moment(key).isBefore(moment())) {
        delete tempAvailability[key];
      }
    });

    // Call updateProfile after modifying availability
    updateProfile("availability", tempAvailability).then(() => {
      setEdit(false);
    });
  };

  return (
    <ActivityEditStringStyles>
      <ActivityEditAvailabilityStyles>
        <p className="profile-field">
          {t("availability")}{" "}
          {!edit && activity?.availability && (
            <EditInformationButton
              setShowModal={setEdit}
              field={"availability"}
            />
          )}
        </p>
        <p className="profile-subtitle">{t("shops:availabilityMsg")}</p>

        {!edit && activity?.availability && (
          <div className="availability-preview">
            <p className="availability-preview-title">
              <span>{t("shops:availabilityPreview")}</span>{" "}
              <button onClick={() => setEdit(true)} className="link">
                {t("edit")}
              </button>
            </p>
            <ActivityBookStyles>
              <ActivitySlots
                timeOptions={timeOptions}
                setTimeOptions={setTimeOptions}
                activity={activity}
                date={date}
                setDate={setDate}
                t={t}
              />
            </ActivityBookStyles>
          </div>
        )}

        {edit && (
          <div className="edit-availability">
            <ActivitySlots
              timeOptions={timeOptions}
              setTimeOptions={setTimeOptions}
              activity={activity}
              date={date}
              setDate={setDate}
              t={t}
            />
            <ul>
              {timeOptions.length === 0 && <li>{t("closed")}</li>}
              {timeOptions.map((option, i) => (
                <li key={i}>
                  <p className="label">{option}</p>
                  <ActivityEditAvailabilitySelect
                    setAvailability={setAvailability}
                    availability={availability}
                    activity={activity}
                    timeSlot={option}
                    date={date}
                  />
                </li>
              ))}
            </ul>
            <div className="edit-buttons">
              <button
                type="button"
                className="link"
                onClick={() => {
                  setAvailability(activity?.availability);
                  setEdit(false);
                }}
              >
                {t("cancel")}
              </button>{" "}
              <button
                className="normal-button"
                type="button"
                onClick={handleSubmit}
              >
                {t("save")}
              </button>
            </div>
          </div>
        )}
      </ActivityEditAvailabilityStyles>
    </ActivityEditStringStyles>
  );
};

export default ActivityEditAvailability;
