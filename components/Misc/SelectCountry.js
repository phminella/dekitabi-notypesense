import { useSelector } from "react-redux";
import { SelectStatesStyles } from "./styles/SelectStatesStyles";
import Select from "react-select";
import React, { useEffect, useState, useCallback } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore/lite";
import Image from "next/image";
const SelectCountry = ({
  countryValue,
  setCountryValue,
  country = "Japan",
  setCountry,
  t,
}) => {
  const language = useSelector((state) => state.app.language);
  const [countriesOptions, setCountriesOptions] = useState();
  const [loading, setLoading] = useState(true);
  const handleCountries = (data) => {
    if (setCountry) {
      setCountry(data.value);
    }
    setCountryValue(data);
  };
  const getCountries = useCallback(async () => {
    let tempCountries = [];
    const q = query(collection(getFirestore(), "countries"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const country = doc.data();
      tempCountries.push({
        value: country,
        label: country.translatedName[language?.code],
        isDisabled: country.name !== "Japan",
      });
    });
    if (country) {
      const index = tempCountries.findIndex((e) => e.value.name === country);
      if (index !== -1) {
        setCountryValue(tempCountries[index]);
      }
    }
    setCountriesOptions(tempCountries);
    setLoading(false);
  }, [country, language?.code, setCountryValue]);
  useEffect(() => {
    getCountries();
  }, [getCountries]);
  if (loading)
    return (
      <SelectStatesStyles>
        <div className="spinner">
          <Image
            height={35}
            width={35}
            src="/img/icon-spinner.svg"
            alt="spinner"
          ></Image>
        </div>
      </SelectStatesStyles>
    );
  return (
    <SelectStatesStyles>
      <Select
        id="countries"
        instanceId="countries"
        name="countries"
        onChange={handleCountries}
        isSearchable={true}
        required
        value={countryValue || ""}
        options={countriesOptions}
        className="countries"
        placeholder={t("selectCountryGuide")}
        autoComplete={false}
        classNamePrefix="react-select"
      />
    </SelectStatesStyles>
  );
};
export default React.memo(SelectCountry);
