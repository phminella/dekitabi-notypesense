import { ShopEditAccessStyles } from "./styles/ShopEditAccessStyles";
import { ShopEditStringStyles } from "./styles/ShopEditStringStyles";
import { ShopOpeningHoursStyles } from "../Details/styles/ShopOpeningHoursStyles";
import NoInformation from "../../Activities/NoInformation";
import EditInformationButton from "../../Activities/EditInformationButton";
import { useState } from "react";
import Image from "next/image";

const ShopEditOpeningHours = ({
  field,
  shopProfile,
  updateProfile,
  t,
  maxChar = 6,
}) => {
  const timeRange = [
    "00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30",
    "05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00",
    "09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30",
    "14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00",
    "18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30",
    "23:00","23:30","24:00",
  ];

  const weekdays = [
    "Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"
  ];

  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(shopProfile?.openingHours || {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(field, input).then(() => setEdit(false));
  };

  const handleTimeChange = (day, index, value) => {
    const updated = { ...input };
    updated[day][index] = value;
    setInput(updated);
  };

  const handleRemoveSlot = (day, index) => {
    const updated = { ...input };
    updated[day].splice(index - 1, 2);
    setInput(updated);
  };

  const handleAddSlot = (day) => {
    const updated = { ...input };
    const lastTime = updated[day][updated[day].length - 1];
    const lastIndex = timeRange.findIndex((t) => t === lastTime);
    const from = lastIndex >= 0 && lastIndex < timeRange.length - 1 ? timeRange[lastIndex + 1] : "09:00";
    updated[day] = [...updated[day], from, "24:00"];
    setInput(updated);
  };

  const handleCancel = () => {
    setInput({ ...shopProfile?.openingHours });
    setEdit(false);
  };

  return (
    <ShopEditStringStyles>
      <ShopEditAccessStyles className="edit-opening-hours">
        <p className="profile-field">
          {t(`shops:${field}`)}{" "}
          {!edit && <EditInformationButton setShowModal={setEdit} field={field} />}
        </p>

        {!edit && shopProfile?.openingHours && (
          <ShopOpeningHoursStyles>
            <div className="opening-hours-wrapper">
              {[...Array(7)].map((_, i) => {
                const day = i === 6 ? 0 : i + 1;
                const schedule = shopProfile?.openingHours[day] || [];
                return (
                  <div className="opening-hours" key={i}>
                    <p className="weekday">{t(`shops:${weekdays[day]}`)}</p>
                    <p className="time">
                      {schedule.length === 0
                        ? t("closed")
                        : schedule.map((time, idx) => (
                            <span key={idx}>
                              {time}
                              {idx % 2 === 0 ? " - " : <br />}
                            </span>
                          ))}
                    </p>
                  </div>
                );
              })}
            </div>
          </ShopOpeningHoursStyles>
        )}

        {!edit && (!shopProfile[field] || shopProfile[field]?.length === 0) && (
          <NoInformation
            text={t(`shops:no${field.charAt(0).toUpperCase() + field.slice(1)}`)}
            add={setEdit}
            t={t}
          />
        )}

        {edit && (
          <div className="edit-access">
            <form onSubmit={handleSubmit}>
              {[...Array(7)].map((_, i) => {
                const day = i === 6 ? 0 : i + 1;
                const slots = input[day] || [];

                return (
                  <div className="weekday-wrapper" key={i}>
                    <p className="weekday-edit">{t(`shops:${weekdays[day]}`)}</p>
                    <div className="mui-input-wrapper opening-hours-input-wrapper">
                      {slots.map((time, idx) => {
                        const prev = slots[idx - 1];
                        const next = slots[idx + 1];

                        return (
                          <div key={idx} style={{ display: "contents" }}>
                            <p className="from">
                              {idx % 2 === 0 ? t("shops:from") : t("shops:to")}
                            </p>
                            <select
                              name={`${weekdays[day]}${idx}`}
                              value={time}
                              onChange={(e) => handleTimeChange(day, idx, e.target.value)}
                            >
                              {timeRange
                                .filter((t) =>
                                  (!prev || new Date(`1970-01-01T${t}:00Z`) > new Date(`1970-01-01T${prev}:00Z`)) &&
                                  (!next || new Date(`1970-01-01T${t}:00Z`) < new Date(`1970-01-01T${next}:00Z`))
                                )
                                .map((t) => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                            {idx % 2 !== 0 && (
                              <button
                                type="button"
                                className="access-button"
                                onClick={() => handleRemoveSlot(day, idx)}
                              >
                                <Image
                                  src="/img/icon-close.svg"
                                  width={15}
                                  height={15}
                                  alt="remove"
                                  onError={(e) => (e.target.style.display = "none")}
                                />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {timeRange.findIndex((x) => x === slots[slots.length - 1]) < 45 && (
                      <button
                        type="button"
                        className="access-button more-schedule"
                        onClick={() => handleAddSlot(day)}
                      >
                        <Image
                          src="/img/icon-plus.svg"
                          height={15}
                          width={15}
                          alt="add"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                        {t("shops:addMore")}
                      </button>
                    )}
                  </div>
                );
              })}
              <div className="edit-buttons">
                <button type="button" className="link" onClick={handleCancel}>
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
    </ShopEditStringStyles>
  );
};

export default ShopEditOpeningHours;
