import { BuildStyles } from "./styles/BuildStyles";
import React, { useMemo, useState } from "react";
import Attraction from "../Attractions/Attraction";
import Skeleton from "@mui/material/Skeleton";
import PlaceAutoComplete from "../../Misc/PlaceAutoComplete";
import { useSelector } from "react-redux";
import useForm from "../../../lib/useForm";
import Image from "next/image";
import { getFunctions, httpsCallable } from "firebase/functions";
const Build = ({ city, t, language, firstAttraction }) => {
  const { sendEmail, getAttraction } = useMemo(() => {
    try {
      const functions = getFunctions(undefined, "asia-northeast1");
      return {
        sendEmail: httpsCallable(functions, "sendEmail"),
        getAttraction: httpsCallable(functions, "getAttraction"),
      };
    } catch {
      return { sendEmail: null, getAttraction: null };
    }
  }, []);
  const user = useSelector((state) => state.app.user);
  const [input, setInput] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attraction, setAttraction] = useState("");
  const [duration, setDuration] = useState("");
  const [email, setEmail] = useState("");
  const [paid, setPaid] = useState("dontKnow");
  const { validEmail } = useForm();
  const refresh = () => {
    setAttraction("");
    setSent(false);
    setPaid("dontKnow");
    setDuration("");
    setInput("");
  };
  const addAttraction = async (placeId) => {
    if (!getAttraction) return;
    try {
      const response = await getAttraction({ placeId, language: language?.code });
      const place = response?.data?.result;
      const getClosedDays = (openingHours) => {
        const weekdaysNumber = [0, 1, 2, 3, 4, 5, 6];
        const openingDays = [];
        for (let i = 0; i < openingHours?.length; i++) {
          openingDays.push(openingHours[i]?.close?.day);
        }
        return weekdaysNumber.filter((obj) => openingDays.indexOf(obj) === -1);
      };

      const closedDaysWeekday = [];
      if (place?.opening_hours?.periods?.length > 2) {
        const tempClosedDays = getClosedDays(place.opening_hours?.periods);
        const weekdays = [
          "Sundays",
          "Mondays",
          "Tuesdays",
          "Wednesdays",
          "Thursdays",
          "Fridays",
          "Saturdays",
        ];
        tempClosedDays?.forEach((closedDay) =>
          closedDaysWeekday.push(weekdays[closedDay])
        );
      }
      const tempAttraction = {
        address: place?.formatted_address,
        name: place?.name,
        duration,
        ratingCounter: place?.user_ratings_total || 0,
        openingPeriods: place?.opening_hours
          ? place?.opening_hours?.periods
          : "",
        openingHours: place?.opening_hours?.weekday_text,
        closedDays: closedDaysWeekday?.join(", ") || null,
        website: place?.website || null,
        photoUrl: place?.photos?.[0]?.photo_reference || null,
        rating: place?.rating || null,
      };
      setAttraction(tempAttraction);
      if (error === "attraction") {
        setError("");
      }
    } catch {
      setError("attraction");
    }
  };
  const submitAttraction = async () => {
    setLoading(true);
    if (
      (!user?.email && !validEmail(email)) ||
      (!user?.email && email?.length === 0)
    ) {
      setError("email");
      setLoading(false);
      document.getElementById("email")?.focus();
    } else if (!attraction?.name) {
      setError("attraction");
      setLoading(false);
      document.getElementById("attraction")?.focus();
    } else if (duration?.length === 0) {
      setError("duration");
      setLoading(false);
      document.getElementById("duration")?.focus();
    } else if (!sendEmail) {
      setLoading(false);
      setError("service");
    } else {
      sendEmail({
        to: "contact@dekitabi.com",
        sender: "contact@dekitabi.com",
        subject: `dekitabi | New attraction (${attraction?.name})`,
        body: `${
          user?.uid
            ? `lastname: ${user?.lastname} firstname: ${user?.firstname}`
            : ""
        } email: ${user?.email ? user?.email : email}, attraction: ${
          attraction?.name
        }, website: ${attraction?.website}, address: ${
          attraction?.address
        }, duration: ${duration}, paid?: ${paid}, language: ${language?.code}`,
      })
        .then(() => {
          setError("");
          setLoading(false);
          setSent(true);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  return (
    <BuildStyles>
      <div className="build-wrapper" id="build-wrapper">
        <div className="build-form">
          <div>
            {city ? (
              <h2 className="title">{t("buildWithUs")}</h2>
            ) : (
              <h1 className="title">{t("buildWithUs")}</h1>
            )}
            {city ? (
              <h2 className="subtitle">
                {t("letUsKnowAttraction", {
                  city: firstAttraction?.translatedCity
                    ? firstAttraction?.translatedCity[language?.code]
                    : city?.translatedCity
                    ? city?.translatedCity[language?.code]
                    : "Japan",
                })}
              </h2>
            ) : (
              <h3 className="subtitle">
                {t("letUsKnowAttraction", {
                  city: firstAttraction?.translatedCity
                    ? firstAttraction?.translatedCity[language?.code]
                    : city?.translatedCity
                    ? city?.translatedCity[language?.code]
                    : "Japan",
                })}
              </h3>
            )}
            {!user?.email && (
              <>
                {t("email")}
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  minLength={2}
                  maxLength={30}
                  disabled={loading || sent}
                  required
                />
              </>
            )}
            {error === "email" && (
              <p className="error-message">&#9940;{t("emailInvalid")}</p>
            )}
            <div className="input-wrapper">
              {t("searchAttractionByName")}
              <PlaceAutoComplete
                t={t}
                input={input}
                setInput={setInput}
                inputPlaceholder={"searchAttractionByName"}
                disabled={loading || sent}
                location={firstAttraction ? firstAttraction : city}
                language={language}
                setPlace={addAttraction}
              />
            </div>
            {error === "attraction" && (
              <p className="error-message">&#9940;{t("attractionError")}</p>
            )}
            <div className="mobile-preview">
              <h3>{t("attractionPreview")}</h3>
              {attraction?.name ? (
                <Attraction
                  language={language}
                  attraction={attraction}
                  i={0}
                  selectedAttraction={0}
                  t={t}
                />
              ) : (
                <div>
                  <Skeleton
                    variant="rounded"
                    height={150}
                    style={{
                      borderRadius: "30px",
                      borderBottomLeftRadius: "0",
                      borderBottomRightRadius: "0",
                      marginBottom: "10px",
                    }}
                  />
                  <Skeleton
                    variant="rounded"
                    height={105}
                    style={{
                      borderRadius: "30px",
                      borderTopLeftRadius: "0",
                      borderTopRightRadius: "0",
                    }}
                  />
                </div>
              )}
            </div>
            {t("isItPaid")}
            <ul className="radios">
              <li>
                <input
                  type="radio"
                  id="paid1"
                  value={"paid"}
                  onChange={() => {
                    setPaid("paid");
                  }}
                  checked={paid === "paid"}
                  disabled={loading || sent}
                />
                <label
                  htmlFor="paid1"
                  className={paid === "paid" ? "active" : ""}
                >
                  {t("paid")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="paid2"
                  value="free"
                  onChange={() => {
                    setPaid("free");
                  }}
                  checked={paid === "free"}
                  disabled={loading || sent}
                />
                <label
                  htmlFor="paid2"
                  className={paid === "free" ? "active" : ""}
                >
                  {t("free")}
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="paid3"
                  value="dontKnow"
                  onChange={() => {
                    setPaid("dontKnow");
                  }}
                  checked={paid === "dontKnow"}
                  disabled={loading || sent}
                />
                <label
                  htmlFor="paid3"
                  className={paid === "dontKnow" ? "active" : ""}
                >
                  {t("dontKnow")}
                </label>
              </li>
            </ul>
            {t("howLongDuration")}
            <input
              type="text"
              name="duration"
              id="duration"
              placeholder={t("duration")}
              value={duration}
              autoComplete="off"
              onChange={(e) => {
                if (e.target.value.length < 4) {
                  setDuration(e.target.value);
                  setAttraction({ ...attraction, duration: e.target.value });
                }
              }}
              disabled={loading || sent}
              minLength={2}
              maxLength={4}
              required
            />
            {error === "duration" && (
              <p className="error-message">&#9940;{t("durationError")}</p>
            )}
            {error === "service" && (
              <p className="error-message">&#9940;Unable to send right now.</p>
            )}
            {sent && (
              <div className="sent">
                <p>
                  <Image
                    src="/img/icon-check.svg"
                    height={20}
                    width={20}
                    alt="icon-spinner"
                  />
                  {t("sent")}
                </p>
                <button className="sent-button" onClick={refresh}>
                  {t("addMore")}
                </button>
              </div>
            )}
            {!sent && (
              <>
                {loading ? (
                  <div className="normal-button">
                    <Image
                      src="/img/icon-spinner.svg"
                      height={30}
                      width={30}
                      alt="icon-spinner"
                    />
                  </div>
                ) : (
                  <button onClick={submitAttraction} className="normal-button">
                    {t("send")}
                  </button>
                )}
              </>
            )}
            <p>{t("addAttractionInfo")}</p>
          </div>
        </div>
        <div className="build-preview">
          <div>
            <h3>{t("attractionPreview")}</h3>
            {attraction?.name ? (
              <Attraction
                language={language}
                attraction={attraction}
                i={0}
                selectedAttraction={0}
                t={t}
              />
            ) : (
              <div>
                <Skeleton
                  variant="rounded"
                  height={150}
                  style={{
                    borderRadius: "30px",
                    borderBottomLeftRadius: "0",
                    borderBottomRightRadius: "0",
                    marginBottom: "10px",
                  }}
                />
                <Skeleton
                  variant="rounded"
                  height={105}
                  style={{
                    borderRadius: "30px",
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </BuildStyles>
  );
};
export default Build;
