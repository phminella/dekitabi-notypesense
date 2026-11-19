import { ActivityEditStringStyles } from "./styles/ActivityEditStringStyles";
import React, { useState } from "react";
import NoInformation from "../NoInformation";
import EditInformationButton from "../EditInformationButton";
const ActivityEditPersons = ({
  field,
  activity,
  updateProfile,
  t,
  showModal,
}) => {
  const personsOptions = Array(100)
    .fill(1)
    .map((n, i) => n + i);
  const [edit, setEdit] = useState(showModal === field ? true : false);
  const [input, setInput] = useState(activity?.persons);
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(field, input).then(() => {
      setEdit(false);
    });
  };
  return (
    <ActivityEditStringStyles id={field} className="edit-persons">
      <p className="profile-field">
        {t("shops:persons")}{" "}
        {!edit && Number.isInteger(input?.from) && (
          <EditInformationButton setShowModal={setEdit} field={field} />
        )}
      </p>
      {!edit && Number.isInteger(input?.from) && (
        <div className="value">
          {input?.from === 1 && input?.to===1 ? 1 : t("shops:activityPeople", { from: input?.from, to:input?.to })}
        </div>
      )}
      {!edit && !Number.isInteger(input?.from) && (
        <NoInformation text={t(`shops:noPersons`)} add={setEdit} t={t} />
      )}
      {edit && (
        <form className="edit-persons-form" onSubmit={handleSubmit}>
          <label>
            {t("shops:minPeople")}
          <select
            value={input?.from}
            onChange={(e) => {
              setInput({...input, from:Number(e.target.value)});
            }}
          >
            {personsOptions.map((option, i) => (
              <option value={option} key={i}>
                {option}
              </option>
            ))}
          </select></label>
          <label>
            {t("shops:maxPeople")}
          <select
            value={input?.to}
            onChange={(e) => {
              setInput({...input, to:Number(e.target.value)});
            }}
          >
            {personsOptions.map((option, i) => (
              <option value={option} key={i}>
                {option}
              </option>
            ))}
          </select></label>
          <div className="edit-buttons">
            <button
              type="button"
              className="link"
              onClick={() => {
                setInput(activity?.persons);
                setEdit(false);
              }}
            >
              {t("cancel")}
            </button>{" "}
            <button className="normal-button" type="submit" disabled={input?.from > input?.to}>
              {t("save")}
            </button>
          </div>
        </form>
      )}
    </ActivityEditStringStyles>
  );
};
export default ActivityEditPersons;
