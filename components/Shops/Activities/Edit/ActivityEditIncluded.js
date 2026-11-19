import { ActivityEditIncludedStyles } from "./styles/ActivityEditIncludedStyles";
import NoInformation from "../NoInformation";
import EditInformationButton from "../EditInformationButton";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getFirestore, doc, updateDoc } from "firebase/firestore/lite";
import { ActivityEditStringStyles } from "./styles/ActivityEditStringStyles";
import { ActivityIncludedStyles } from "../ActivityDetails/styles/ActivityIncludedStyles";

const ActivityEditIncluded = ({ activity, t, showModal, setActivity }) => {
  const [edit, setEdit] = useState(showModal === "included");
  const [included, setIncluded] = useState([]);
  const options = ["included", "notIncluded"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempIncluded = { included: [], notIncluded: [] };

    // Categorize included and notIncluded items
    included.forEach((item) => {
      if (item?.type === "included") {
        tempIncluded.included.push(item?.text);
      } else if (item?.type === "notIncluded") {
        tempIncluded.notIncluded.push(item?.text);
      }
    });

    // Update the document in Firestore
    await updateDoc(doc(getFirestore(), "activities", activity?.id), {
      included: tempIncluded.included,
      notIncluded: tempIncluded.notIncluded,
    });

    // Update the local state
    setActivity({
      ...activity,
      included: tempIncluded.included,
      notIncluded: tempIncluded.notIncluded,
    });

    setEdit(false);

    // Sort the included items by type
    const sortedIncluded = [...included].sort((a, b) =>
      a.type < b.type ? -1 : 1
    );
    setIncluded(sortedIncluded);
  };

  const sortIncluded = async () => {
    const tempIncluded = await Promise.all(
      activity?.included?.map((includedItem) => ({
        type: "included",
        text: includedItem,
      }))
    );

    const tempNotIncluded = await Promise.all(
      activity?.notIncluded?.map((notIncludedItem) => ({
        type: "notIncluded",
        text: notIncludedItem,
      }))
    );

    setIncluded([...tempIncluded, ...tempNotIncluded]);
  };

  useEffect(() => {
    sortIncluded();
  }, [activity]);

  return (
    <ActivityEditStringStyles>
      <ActivityEditIncludedStyles>
        <p className="profile-field">
          {t("shops:included")}{" "}
          {!edit && included?.length > 0 && (
            <EditInformationButton setShowModal={setEdit} field={"included"} />
          )}
        </p>

        {!edit && included?.length > 0 && (
          <ActivityIncludedStyles>
            {included?.map((item, i) => (
              <div key={i} className="included">
                <Image
                  height={15}
                  width={15}
                  src={
                    item?.type === "included"
                      ? "/img/icon-check.svg"
                      : "/img/icon-close.svg"
                  }
                  alt={item?.type}
                  className={
                    item?.type === "included"
                      ? "included-icon"
                      : "not-included-icon"
                  }
                />
                {item?.text}
              </div>
            ))}
          </ActivityIncludedStyles>
        )}

        {!edit && included.length === 0 && (
          <NoInformation text={t("shops:noIncluded")} add={setEdit} t={t} />
        )}

        {edit && (
          <form className="edit-access" onSubmit={handleSubmit}>
            {included?.map((category, i) => (
              <div className="mui-input-wrapper" key={i}>
                <select
                  value={category?.type}
                  onChange={(e) => {
                    const updatedIncluded = [...included];
                    updatedIncluded[i].type = e.target.value;
                    setIncluded(updatedIncluded);
                  }}
                >
                  {options.map((option, x) => (
                    <option value={option} key={x}>
                      {t(`shops:${option}`)}
                    </option>
                  ))}
                </select>

                <input
                  name={`${category}${i}`}
                  required
                  id={`${category}${i}`}
                  placeholder={t(
                    category?.type === "included"
                      ? "shops:included"
                      : "shops:notIncluded"
                  )}
                  value={category?.text}
                  maxLength={150}
                  onChange={(e) => {
                    const updatedIncluded = [...included];
                    updatedIncluded[i].text = e.target.value;
                    setIncluded(updatedIncluded);
                  }}
                />

                <button
                  type="button"
                  className="access-button"
                  onClick={() => {
                    const updatedIncluded = [...included];
                    updatedIncluded.splice(i, 1);
                    setIncluded(updatedIncluded);
                  }}
                >
                  <Image
                    src="/img/icon-close.svg"
                    height={15}
                    width={15}
                    alt="remove-included"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <span>{t("remove")}</span>
                </button>
              </div>
            ))}

            {included?.length < 20 && (
              <button
                type="button"
                className="access-button"
                onClick={() => {
                  const updatedIncluded = [...included];
                  updatedIncluded.push({ type: "included", text: "" });
                  setIncluded(updatedIncluded);
                }}
              >
                <Image
                  src="/img/icon-plus.svg"
                  height={15}
                  width={15}
                  alt="add-access"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {t("shops:addMore")}
              </button>
            )}

            <div className="edit-buttons">
              <button
                type="button"
                className="link"
                onClick={() => {
                  sortIncluded();
                  setEdit(false);
                }}
              >
                {t("cancel")}
              </button>
              <button className="normal-button" type="submit">
                {t("save")}
              </button>
            </div>
          </form>
        )}
      </ActivityEditIncludedStyles>
    </ActivityEditStringStyles>
  );
};

export default ActivityEditIncluded;
