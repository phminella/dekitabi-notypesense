import { ActivityEditPriceStyles } from "./styles/ActivityEditPriceStyles";
import NoInformation from "../NoInformation";
import EditInformationButton from "../EditInformationButton";
import { useEffect, useState, useCallback } from "react";
import Price from "../../../UI/Price";
import Image from "next/image";

const ActivityEditPrice = ({ activity, updateProfile, t, showModal }) => {
  const priceOptions = [
    "general",
    "adult",
    "universityStudent",
    "highSchoolStudent",
    "elementarySchoolStudent",
    "preSchooler",
    "infant",
    "senior",
    "disabledPerson",
  ];

  const [edit, setEdit] = useState(showModal === "price");
  const [values, setValues] = useState([]);
  const [keys, setKeys] = useState([]);

  // Handles submitting the updated prices
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const updatedPrices = keys.reduce((acc, key, i) => {
        acc[key] = values[i];
        return acc;
      }, {});

      const sortedPrices = Object.keys(updatedPrices)
        .sort()
        .reduce((acc, key) => {
          acc[key] = updatedPrices[key];
          return acc;
        }, {});

      await updateProfile("price", sortedPrices);
      setEdit(false);
    },
    [keys, values, updateProfile]
  );

  // Sets initial prices when the component mounts
  const getPrices = useCallback(() => {
    if (activity?.price) {
      const tempKeys = Object.keys(activity.price);
      const tempValues = tempKeys.map((key) => activity.price[key]);

      setKeys(tempKeys);
      setValues(tempValues);
    }
  }, [activity]);

  useEffect(() => {
    getPrices();
  }, [getPrices]);

  // Handles adding a new price category
  const addNewPriceCategory = () => {
    const availableOptions = priceOptions.filter(
      (option) => !keys.includes(option)
    );
    if (availableOptions.length) {
      const newKey = availableOptions[0];
      setKeys((prevKeys) => [...prevKeys, newKey]);
      setValues((prevValues) => [...prevValues, ""]);
    }
  };

  // Handles removing a price category
  const removePriceCategory = (index) => {
    setKeys((prevKeys) => prevKeys.filter((_, i) => i !== index));
    setValues((prevValues) => prevValues.filter((_, i) => i !== index));
  };

  // Handles updating price values
  const handlePriceChange = (index, value) => {
    if (!isNaN(value) || value === "") {
      const updatedValues = [...values];
      updatedValues[index] = value === "" ? value : Number(value);
      setValues(updatedValues);
    }
  };

  return (
    <ActivityEditPriceStyles>
      <p className="profile-field">
        {t("price")}
        {!edit && keys?.length > 0 && (
          <EditInformationButton setShowModal={setEdit} field={"price"} />
        )}
      </p>

      {!edit && keys?.length > 0 ? (
        <>
          {priceOptions.map((category, i) => {
            if (activity?.price[category]) {
              return (
                <div key={i} className="price">
                  <p className="price-details">{t(`shops:${category}`)}</p>
                  <p className="price-value">
                    <b style={{ fontSize: "1.1em", color: "var(--pink)" }}>
                      <Price
                        value={activity?.price[category]}
                        conversionType={"priceWithoutFee"}
                        currency={{
                          currency: "Japanese Yen",
                          code: "JPY",
                          symbol: "¥",
                          rate: 1,
                        }}
                      />
                    </b>
                  </p>
                </div>
              );
            }
            return null;
          })}
        </>
      ) : keys.length === 0 && !edit ? (
        <NoInformation text={t("shops:noPrice")} add={setEdit} t={t} />
      ) : (
        <form className="edit-access" onSubmit={handleSubmit}>
          {keys.map((category, i) => (
            <div className="mui-input-wrapper" key={i}>
              <select
                value={keys[i]}
                onChange={(e) => {
                  const newKeys = [...keys];
                  newKeys[i] = e.target.value;
                  setKeys(newKeys);
                }}
              >
                {priceOptions.map((option, x) => {
                  if (!keys.includes(option) || option === keys[i]) {
                    return (
                      <option value={option} key={x}>
                        {t(`shops:${option}`)}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
              <input
                name={`${category}${i}`}
                required
                id={`${category}${i}`}
                placeholder={t("price")}
                value={values[i]}
                maxLength={6}
                onChange={(e) => handlePriceChange(i, e.target.value)}
              />
              <button
                type="button"
                className="access-button"
                onClick={() => removePriceCategory(i)}
              >
                <Image
                  src={`/img/icon-close.svg`}
                  height={15}
                  width={15}
                  alt="remove-price"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </button>
            </div>
          ))}
          {keys.length < 9 && (
            <button
              type="button"
              className="access-button"
              onClick={addNewPriceCategory}
            >
              <Image
                src={`/img/icon-plus.svg`}
                height={15}
                width={15}
                alt="add-access"
                onError={(e) => (e.target.style.display = "none")}
              />
              {t("shops:addMore")}
            </button>
          )}
          <div className="edit-buttons">
            <button
              type="button"
              className="link"
              onClick={() => {
                getPrices();
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
    </ActivityEditPriceStyles>
  );
};

export default ActivityEditPrice;
