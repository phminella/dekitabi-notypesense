import { EditFeeStyles } from "./styles/EditFeeStyles";
import React, { useEffect, useState } from "react";
// import Link from "next/link";
import TextField from "@mui/material/TextField";
const EditTransportFee = ({ profile, setProfile, updateProfile, t }) => {
  const [fee, setFee] = useState(profile?.feeWithTransport);
  const [error, setError] = useState();
  const [editFee, setEditFee] = useState(false);
  const [halfDayFocus, setHalfDayFocus] = useState(false);
  const [fullDayFocus, setFullDayFocus] = useState(false);
  const [saved, setSaved] = useState(false);
  const updateFee = async () => {
    if (
      (profile?.fee?.halfDay && !fee?.halfDay) ||
      (profile?.fee?.fullDay && !fee?.fullDay) ||
      (profile?.fee?.halfDay && fee?.halfDay < 500) ||
      (profile?.fee?.fullDay && fee?.fullDay < 500)
    ) {
      setError(t("minimumChargeError"));
    } else if (
      (profile?.fee?.halfDay && fee?.halfDay > 99999) ||
      (profile?.fee?.fullDay && fee?.fullDay > 99999)
    ) {
      setError(t("maximumChargeError"));
    } else {
      let tempFee = { ...fee };
      if (!tempFee?.fullDay) {
        delete tempFee?.fullDay;
      }
      if (!tempFee?.halfDay) {
        delete tempFee?.halfDay;
      }
      updateProfile({ feeWithTransport: tempFee });
      setProfile({ ...profile, feeWithTransport: tempFee });
      setError();
      setEditFee(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  useEffect(() => {
    setFee(profile?.feeWithTransport);
  }, [profile?.fee]);
  return (
    <EditFeeStyles>
      <div className="title">
        <h3>{t("guideFeeWithTransport")}</h3>
        {profile?.feeWithTransport &&
          (profile?.feeWithTransport?.halfDay ||
            profile?.feeWithTransport?.fullDay) &&
          !editFee && (
            <button onClick={() => setEditFee(true)}>{t("edit")}</button>
          )}
        {(!profile?.feeWithTransport ||
          (!profile?.feeWithTransport?.halfDay &&
            !profile?.feeWithTransport?.fullDay)) &&
          !editFee && (
            <button onClick={() => setEditFee(true)}>{t("add")}</button>
          )}
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
      <p className="sub-title">{t("feeWithTransportMsg")}</p>
      <p className="sub-title">
        <b>{t("guideFeeWithTransportMsg")}</b>
      </p>
      {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
      {!profile?.feeWithTransport ||
        (!profile?.feeWithTransport?.halfDay &&
          !profile?.feeWithTransport?.fullDay &&
          !editFee && <p>{t("guideFeeEmpty")}</p>)}
      {profile?.feeWithTransport &&
        (profile?.feeWithTransport?.halfDay ||
          profile?.feeWithTransport?.fullDay) &&
        !editFee && (
          <div className="fee">
            <ul>
              {profile?.feeWithTransport?.halfDay ? (
                <li>
                  {t("halfDay")}
                  <span>
                    JPY
                    {profile?.feeWithTransport?.halfDay
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </li>
              ) : (
                <li></li>
              )}
              {profile?.feeWithTransport?.fullDay ? (
                <li>
                  {t("fullDay")}
                  <span>
                    JPY
                    {profile?.feeWithTransport?.fullDay
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
              <div
                className={`${
                  profile?.fee?.halfDay && profile?.fee?.fullDay
                    ? "two-columns-wrapper"
                    : ""
                }`}
              >
                {profile?.fee?.halfDay ? (
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
                          e.target.value?.length < 8 &&
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
                {profile?.fee?.fullDay ? (
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
                          e.target.value?.length < 8 &&
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
            {(profile?.fee?.fullDay || profile?.fee?.halfDay) && (
              <div className="edit-buttons">
                <button
                  type="button"
                  onClick={() => {
                    setEditFee(false);
                    setFee(profile?.feeWithTransport);
                  }}
                >
                  {t("cancel")}
                </button>{" "}
                <button type="submit">{t("save")}</button>
              </div>
            )}
          </form>
          {!profile?.fee?.fullDay && !profile?.fee?.halfDay && (
            <p className="error-message">⛔ {t("guideFeeError")}</p>
          )}
        </div>
      )}
    </EditFeeStyles>
  );
};
export default React.memo(EditTransportFee);
