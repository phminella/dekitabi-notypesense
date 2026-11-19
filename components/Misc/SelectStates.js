import { useSelector } from "react-redux";
import { SelectStatesStyles } from "./styles/SelectStatesStyles";
import Select from "react-select";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import Image from "next/image";
const SelectStates = ({ states = [], translatedStates = [], setStates, t }) => {
  const language = useSelector((state) => state.app.language);
  const selectStatesRef = useRef();
  const [statesValues, setStatesValues] = useState([]);
  const [statesOptions, setStatesOptions] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const handleStates = (data) => {
    setStatesValues(data);
    setStates(data);
  };
  const changeStatesToSelectFormat = useCallback(() => {
    let tempStates = [];
    states.map((state, i) =>
      tempStates.push({
        value: state,
        label: translatedStates[i]
          ? translatedStates[i][language?.code]
          : states[i],
        translatedValue: translatedStates[i]
          ? translatedStates[i][language?.code]
          : states[i],
      })
    );
    setStatesValues(tempStates);
  }, [language?.code, states, translatedStates]);
  useEffect(() => {
    if (states?.length > 0 && translatedStates[states?.length - 1]) {
      changeStatesToSelectFormat();
    }
  }, [changeStatesToSelectFormat, states, translatedStates]);
  const getStates = useCallback(async () => {
    setLoadingStates(true);
    try {
      const statesSnap = await getDoc(doc(getFirestore(), "areas", "Japan"));
      const tempStates = statesSnap.data();
      let tempStatesOptions = [];
      tempStates.areas.map((state, i) => {
        tempStatesOptions.push({
          label: tempStates.translatedAreas[i][language?.code].replace(
            /(^\w{1})|(\s+\w{1})/g,
            (letter) => letter.toUpperCase()
          ),
          value: state,
          translatedValue: tempStates.translatedAreas[i],
        });
      });
      setStatesOptions(tempStatesOptions);
      setLoadingStates(false);
    } catch (err) {
      console.log(err);
      setStatesOptions([]);
      setLoadingStates(false);
    }
  }, [language?.code]);
  useEffect(() => {
    getStates();
  }, [getStates]);
  return (
    <SelectStatesStyles>
      {!loadingStates ? (
        <Select
          ref={selectStatesRef}
          isMulti
          id="states"
          instanceId="states"
          name="states"
          onChange={handleStates}
          options={statesOptions}
          isSearchable={true}
          required
          value={statesValues}
          placeholder={t("selectPrefectureGuide")}
          autoComplete={false}
          classNamePrefix="react-select"
        />
      ) : (
        <div className="spinner">
          <Image
            height={35}
            width={35}
            src="/img/icon-spinner.svg"
            alt="spinner"
          ></Image>
        </div>
      )}
    </SelectStatesStyles>
  );
};
export default React.memo(SelectStates);
