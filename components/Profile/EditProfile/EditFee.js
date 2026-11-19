import { EditFeeStyles } from "./styles/EditFeeStyles";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
import TextField from "@mui/material/TextField";
import Image from "next/image";
const EditFee = ({ profile, setProfile, updateProfile, t }) => {
  const [fee, setFee] = useState(profile?.fee);
  const [error, setError] = useState();
  const [editFee, setEditFee] = useState(false);
  const [alert, setAlert] = useState();
  const [halfDayFocus, setHalfDayFocus] = useState(false);
  const [fullDayFocus, setFullDayFocus] = useState(false);
  const [feeOptions, setFeeOptions] = useState({
    halfDay: profile?.fee?.halfDay ? true : false,
    fullDay: profile?.fee?.fullDay ? true : false,
  });
  const [saved, setSaved] = useState(false);
  const updateFee = async () => {
    if (
      (feeOptions?.halfDay && fee?.halfDay === "") ||
      (feeOptions?.fullDay && fee?.fullDay === "") ||
      (feeOptions?.halfDay && fee?.halfDay < 500) ||
      (feeOptions?.fullDay && fee?.fullDay < 500)
    ) {
      setError(t("minimumChargeError"));
    } else if (
      (feeOptions?.halfDay && fee?.halfDay > 99999) ||
      (feeOptions?.fullDay && fee?.fullDay > 99999)
    ) {
      setError(t("maximumChargeError"));
    } else {
      let tempTransportFee = { ...profile?.feeWithTransport };
      let tempFee = { ...fee };
      if (tempFee?.fullDay === "") {
        delete tempFee?.fullDay;
        delete tempTransportFee?.fullDay;
      }
      if (tempFee?.halfDay === "") {
        delete tempFee?.halfDay;
        delete tempTransportFee?.halfDay;
      }
      if (tempFee?.halfDay && !tempTransportFee?.halfDay) {
        tempTransportFee.halfDay = tempFee?.halfDay;
      }
      if (tempFee?.fullDay && !tempTransportFee?.fullDay) {
        tempTransportFee.fullDay = tempFee?.fullDay;
      }
      updateProfile({ fee: tempFee, feeWithTransport: tempTransportFee });
      setProfile({
        ...profile,
        fee: tempFee,
        feeWithTransport: tempTransportFee,
      });
      setError();
      setEditFee(false);
      setSaved(true);
      setAlert(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  return (
    <EditFeeStyles>
      <div className="title">
        <h3>{t("guideFee")}</h3>
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {(alert ||
          (profile?.transportIncluded === "true" &&
            ((profile?.fee?.fullDay && !profile?.feeWithTransport?.fullDay) ||
              (profile?.fee?.halfDay && !profile?.feeWithTransport?.halfDay) ||
              (profile?.fee?.fullDay &&
                profile?.feeWithTransport?.fullDay &&
                profile?.fee?.fullDay === profile?.feeWithTransport?.fullDay) ||
              (profile?.fee?.halfDay &&
                profile?.feeWithTransport?.halfDay &&
                profile?.fee?.halfDay ===
                  profile?.feeWithTransport?.halfDay)))) && (
          <p className="error-message">
            <Image
              height={17}
              width={17}
              src="/img/icon-alert.svg"
              alt="alert"
            />{" "}
            {t("updateTransportFee")}
          </p>
        )}
        {profile?.fee &&
          (profile?.fee?.halfDay || profile?.fee?.fullDay) &&
          !editFee && (
            <button onClick={() => setEditFee(true)}>{t("edit")}</button>
          )}
        {!profile?.fee ||
          (!profile?.fee?.halfDay && !profile?.fee?.fullDay && !editFee && (
            <button onClick={() => setEditFee(true)}>{t("add")}</button>
          ))}
        {editFee && (
          <button
            onClick={() => {
              setEditFee(false);
              setFee();
            }}
          >
            {t("cancel")}
          </button>
        )}
      </div>
      {editFee && (
        <p className="sub-title">
          {t("guideFeeInfo")}
          <br />
          {t("guideFeeInfo2")}
          <br />
          {t("guideFeeInfo3")}
          <br />
        </p>
      )}
      {!profile?.fee ||
        (!profile?.fee?.halfDay && !profile?.fee?.fullDay && !editFee && (
          <p>{t("guideFeeEmpty")}</p>
        ))}
      {profile?.fee &&
        (profile?.fee?.halfDay || profile?.fee?.fullDay) &&
        !editFee && (
          <div className="fee">
            <ul>
              {profile?.fee?.halfDay ? (
                <li>
                  {t("halfDay")}
                  <span>
                    JPY
                    {profile?.fee?.halfDay
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </li>
              ) : (
                <li></li>
              )}
              {profile?.fee?.fullDay ? (
                <li>
                  {t("fullDay")}
                  <span>
                    JPY
                    {profile?.fee?.fullDay
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </li>
              ) : (
                <li></li>
              )}
            </ul>
          </div>
        )}
      {editFee && (
        <div className="fee-edit">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateFee();
            }}
          >
            <div className="fee-edit">
              <div className="two-columns-wrapper fee-edit-options">
                <label htmlFor="half-day" className="checkbox-label">
                  <input
                    type="checkbox"
                    name="half-day"
                    id="half-day"
                    checked={feeOptions?.halfDay}
                    onChange={(e) => {
                      setFeeOptions({
                        ...feeOptions,
                        halfDay: !feeOptions?.halfDay,
                      });
                      if (!e.target.checked) {
                        fee.halfDay = "";
                      }
                    }}
                  />
                  {t("halfDay")}
                </label>
                <label htmlFor="full-day" className="checkbox-label">
                  <input
                    type="checkbox"
                    name="full-day"
                    id="full-day"
                    checked={feeOptions?.fullDay}
                    onChange={(e) => {
                      setFeeOptions({
                        ...feeOptions,
                        fullDay: !feeOptions?.fullDay,
                      });
                      if (!e.target.checked) {
                        fee.fullDay = "";
                      }
                    }}
                  />
                  {t("fullDay")}
                </label>
              </div>
              <div className="two-columns-wrapper">
                {feeOptions?.halfDay ? (
                  <div className="mui-input-wrapper">
                    {(halfDayFocus || fee?.halfDay > 0) && <span>¥</span>}
                    <TextField
                      name="half-day-fee"
                      type="number"
                      inputProps={{
                        min: 3,
                        maxLength: 5,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      label={t("halfDay")}
                      placeholder={t("halfDay")}
                      variant="filled"
                      color="secondary"
                      maxLength={5}
                      minLength={3}
                      value={fee?.halfDay || ""}
                      onFocus={() => setHalfDayFocus(true)}
                      onBlur={() => setHalfDayFocus(false)}
                      onChange={(e) => {
                        const regex = /^[0-9]*$/;
                        if (
                          e.target.value.length < 8 &&
                          (regex.test(e.target.value) || e.target.value === "")
                        ) {
                          setFee({
                            ...fee,
                            halfDay: !isNaN(parseInt(e.target.value))
                              ? parseInt(e.target.value)
                              : "",
                          });
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                {feeOptions?.fullDay ? (
                  <div className="mui-input-wrapper">
                    {(fullDayFocus || fee?.fullDay > 0) && <span>¥</span>}
                    <TextField
                      name="full-day-fee"
                      label={t("fullDay")}
                      placeholder={t("fullDay")}
                      variant="filled"
                      color="secondary"
                      type="number"
                      inputProps={{
                        min: 3,
                        maxLength: 5,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      maxLength={5}
                      minLength={3}
                      value={fee?.fullDay || ""}
                      onFocus={() => setFullDayFocus(true)}
                      onBlur={() => setFullDayFocus(false)}
                      onChange={(e) => {
                        const regex = /^[0-9]*$/;
                        if (
                          e.target.value.length < 8 &&
                          (regex.test(e.target.value) || e.target.value === "")
                        ) {
                          setFee({
                            ...fee,
                            fullDay: !isNaN(parseInt(e.target.value))
                              ? parseInt(e.target.value)
                              : "",
                          });
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            {error && <p className="error-message">⛔ {error}</p>}
            {(feeOptions?.fullDay || feeOptions?.halfDay) && (
              <div className="edit-buttons">
                <button
                  type="button"
                  onClick={() => {
                    setEditFee(false);
                    setFee(profile?.fee);
                  }}
                >
                  {t("cancel")}
                </button>{" "}
                <button type="submit">{t("save")}</button>
              </div>
            )}
          </form>
          {!feeOptions?.fullDay && !feeOptions?.halfDay && (
            <p className="error-message">⛔ {t("guideFeeError")}</p>
          )}
        </div>
      )}
    </EditFeeStyles>
  );
};
export default React.memo(EditFee);
