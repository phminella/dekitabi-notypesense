import { SignUpLastStepStyles } from "./styles/SignUpLastStepStyles";
import Select from "react-select";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { getFirestore, doc, updateDoc } from "firebase/firestore/lite";
import { useSelector, shallowEqual } from "react-redux";
import { setShowLogin } from "../../store/appSlice";
import TextField from "@mui/material/TextField";
import Image from "next/image";
// import Link from "next/link";
import SelectStates from "../Misc/SelectStates";
import ItineraryPersonNumber from "../Itinerary/Details/ItineraryPersonNumber";
const SignUpLastStep = ({ dispatch, setAction, t }) => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const router = useRouter();
  const selectLanguagesRef = useRef();
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    languages: [],
    maxPeople: 10,
    fee: {
      halfDay: "",
      fullDay: "",
    },
  });
  const [country, setCountry] = useState(user?.country);
  const [states, setStates] = useState([]);
  const [feeOptions, setFeeOptions] = useState({
    halfDay: true,
    fullDay: true,
  });
  const [halfDayFocus, setHalfDayFocus] = useState(false);
  const [fullDayFocus, setFullDayFocus] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const updatePerson = (amount) => {
    setInputs({
      ...inputs,
      maxPeople: amount.person,
    });
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (states.length === 0) {
      setError(t("selectPrefectureError"));
      setLoading(false);
    } else if (inputs.languages.length === 0) {
      setError(t("selectPrefectureError"));
      setLoading(false);
    } else if (!feeOptions?.halfDay && !feeOptions?.fullDay) {
      setError(t("guideFeeError"));
      setLoading(false);
    } else if (
      (feeOptions.halfDay &&
        (inputs.fee.halfDay.length < 3 ||
          parseInt(inputs.fee.halfDay) < 500)) ||
      (feeOptions.fullDay &&
        (inputs.fee.fullDay.length < 3 || parseInt(inputs.fee.fullDay) < 500))
    ) {
      setError(t("minFeeError"));
      setLoading(false);
    } else if (
      (feeOptions.halfDay && inputs.fee.halfDay.length > 7) ||
      (feeOptions.fullDay && inputs.fee.fullDay.length > 7)
    ) {
      setError(t("maxFeeError"));
      setLoading(false);
    } else {
      let tempStates = await Promise.all(states.map((state) => state.value));
      let tempTranslatedStates = await Promise.all(
        states.map((state) => state.translatedValue)
      );
      const userRef = doc(getFirestore(), "users", user?.uid);
      let tempFee = { ...inputs.fee };
      if (tempFee.fullDay === "") {
        delete tempFee.fullDay;
      }
      if (tempFee.halfDay === "") {
        delete tempFee.halfDay;
      }
      updateDoc(userRef, {
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        languages: inputs.languages,
        fee: tempFee,
        maxPeople: inputs.maxPeople,
        states: tempStates,
        translatedStates: tempTranslatedStates,
        country: country,
      })
        .then(() => {
          dispatch(setShowLogin(false));
          setAction("signin");
          setCountry("");
          setStates([]);
          setInputs({
            firstname: "",
            lastname: "",
            languages: [],
            fee: {
              halfDay: "",
              fullDay: "",
            },
            maxPeople: 10,
          });
          setLoading(false);
          router.push(`/${user.username}`);
        })
        .catch((err) => console.log(err));
    }
  };
  const languagesOptions = [
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
    { value: "zh-HK", label: "繁體中文(香港)" },
    { value: "zh-CN", label: "简体中文" },
    { value: "zh-TW", label: "繁體中文(台湾)" },
    { value: "ko", label: "한국어" },
    { value: "tg", label: "Tagalog" },
    { value: "th", label: "ไทย" },
    { value: "vi", label: "Tiếng Việt" },
    { value: "bu", label: "မြန်မာဘာသာ" },
    { value: "ru", label: "русский" },
    { value: "fr", label: "Français" },
    { value: "es", label: "Español" },
    { value: "it", label: "Italiano" },
    { value: "nl", label: "Dutch" },
    { value: "de", label: "Deutsch" },
    { value: "sv", label: "Svenska" },
    { value: "pt", label: "Português" },
    { value: "hi", label: "हिन्दी" },
    { value: "af", label: "Afrikaans" },
    { value: "sq", label: "Shqip" },
    { value: "am", label: "አማርኛ" },
    { value: "ar", label: "العربية" },
    { value: "an", label: "Aragonés" },
    { value: "ar", label: "հայերեն" },
    { value: "ast", label: "Asturianu" },
    { value: "az", label: "Azərbaycan dili" },
    { value: "eu", label: "Euskara" },
    { value: "be", label: "беларуская" },
    { value: "bn", label: "বাংলা" },
    { value: "bs", label: "Bosanski" },
    { value: "br", label: "brezhoneg" },
    { value: "bg", label: "български" },
    { value: "ca", label: "Català" },
    { value: "ckb", label: "کوردی" },
    { value: "co", label: "Corsican" },
    { value: "hr", label: "Hrvatski" },
    { value: "az", label: "Azərbaycan dili" },
    { value: "cs", label: "čeština" },
    { value: "da", label: "dansk" },
    { value: "eo", label: "Esperanto" },
    { value: "et", label: "eesti" },
    { value: "fo", label: "føroyskt" },
    { value: "fi", label: "Suomi" },
    { value: "gl", label: "Galego" },
    { value: "ka", label: "ქართული" },
    { value: "el", label: "Ελληνικά" },
    { value: "gn", label: "Guarani" },
    { value: "gu", label: "ગુજરાતી" },
    { value: "ha", label: "Hausa" },
    { value: "haw", label: "ʻŌlelo Hawaiʻi" },
    { value: "he", label: "עברית" },
    { value: "hu", label: "Magyar" },
    { value: "is", label: "íslenska" },
    { value: "id", label: "Indonesian" },
    { value: "ga", label: "Gaeilge" },
    { value: "kn", label: "ಕನ್ನಡ" },
    { value: "kk", label: "қазақ тілі" },
    { value: "ka", label: "ქართული" },
    { value: "km", label: "ខ្មែរ" },
    { value: "ha", label: "Hausa" },
    { value: "ku", label: "Kurdî" },
    { value: "ky", label: "кыргызча" },
    { value: "lo", label: "ລາວ" },
    { value: "la", label: "Latin" },
    { value: "lv", label: "latviešu" },
    { value: "ln", label: "lingála" },
    { value: "lt", label: "lietuvių" },
    { value: "mk", label: "македонски" },
    { value: "ms", label: "Bahasa Melayu" },
    { value: "ml", label: "മലയാളം" },
    { value: "mt", label: "Malti" },
    { value: "mr", label: "मराठी" },
    { value: "mn", label: "монгол" },
    { value: "ne", label: "नेपाली" },
    { value: "no", label: "norsk" },
    { value: "oc", label: "Occitan" },
    { value: "or", label: "ଓଡ଼ିଆ" },
    { value: "om", label: "Oromoo" },
    { value: "ps", label: "پښتو" },
    { value: "fa", label: "فارسی" },
    { value: "pl", label: "Polski" },
    { value: "pa", label: "ਪੰਜਾਬੀ" },
    { value: "ml", label: "മലയാളം" },
    { value: "qu", label: "Quechua" },
    { value: "ro", label: "română" },
    { value: "gd", label: "Scottish Gaelic" },
    { value: "sr", label: "српски" },
    { value: "sh", label: "Srpskohrvatski" },
    { value: "sn", label: "chiShona" },
    { value: "sd", label: "Sindhi" },
    { value: "si", label: "සිංහල" },
    { value: "sk", label: "slovenčina" },
    { value: "sl", label: "slovenščina" },
    { value: "so", label: "Soomaali" },
    { value: "st", label: "Southern Sotho" },
    { value: "su", label: "Sundanese" },
    { value: "sw", label: "Swahili - Kiswahili" },
    { value: "tg", label: "тоҷикӣ" },
    { value: "ta", label: "தமிழ்" },
    { value: "tt", label: "Tatar" },
    { value: "te", label: "తెలుగు" },
    { value: "ti", label: "ትግርኛ" },
    { value: "to", label: "lea fakatonga" },
    { value: "tr", label: "Türkçe" },
    { value: "tk", label: "Turkmen" },
    { value: "tw", label: "Twi" },
    { value: "uk", label: "українська" },
    { value: "ur", label: "اردو" },
    { value: "ug", label: "Uyghur" },
    { value: "uz", label: "o‘zbek" },
    { value: "wa", label: "wa" },
    { value: "cy", label: "Cymraeg" },
    { value: "fy", label: "Western Frisian" },
    { value: "xh", label: "Xhosa" },
    { value: "yi", label: "Yiddish" },
    { value: "yo", label: "Èdè Yorùbá" },
    { value: "zu", label: "isiZulu" },
  ];
  const handleLanguages = (data) => {
    let tempLanguages = [];
    data.map((languages) => tempLanguages.push(languages.label));
    setInputs({ ...inputs, languages: tempLanguages });
  };
  return (
    <SignUpLastStepStyles>
      <div className="sign-title-wrapper">
        <div className="sign-title">
          <Image
            src="/img/logo.png"
            height={51}
            width={154}
            alt="logo"
            className="logo"
          />
          <h1 className="last-step-title">...{t("justOneMore")}</h1>
        </div>
      </div>
      <div className="sign-form">
        <p className="last-step-alert">
          <Image
            height={20}
            width={20}
            src="/img/icon-info2.svg"
            alt="info"
          ></Image>
          {t("justOneMoreAlert")}
        </p>
        <form onSubmit={(e) => updateProfile(e)}>
          <div className="two-columns-wrapper">
            {/* First Name romaji / kanji */}
            <div className="mui-input-wrapper">
              <TextField
                required
                name="first-name"
                label={t("firstName")}
                placeholder={`${t("firstName")} (romaji)`}
                variant="filled"
                color="secondary"
                value={inputs.firstname}
                onChange={(e) => {
                  const regex = /[^0-9]/;
                  if (
                    e.target.value.length < 50 &&
                    (regex.test(e.target.value) || e.target.value === "")
                  ) {
                    setInputs({ ...inputs, firstname: e.target.value });
                  }
                }}
              />
            </div>{" "}
            {/* Last Name romaji / kanji */}
            <div className="mui-input-wrapper">
              <TextField
                required
                name="last-name"
                label={t("lastName")}
                placeholder={`${t("lastName")} (romaji)`}
                variant="filled"
                color="secondary"
                value={inputs.lastname}
                onChange={(e) => {
                  const regex = /[^0-9]/;
                  if (
                    e.target.value.length < 50 &&
                    (regex.test(e.target.value) || e.target.value === "")
                  ) {
                    setInputs({ ...inputs, lastname: e.target.value });
                  }
                }}
              />
            </div>
          </div>
          <div className="input-wrapper">
            <p className="sub-title">{t("selectPrefectureGuide")}</p>
            <div className="edit-prefectures">
              <SelectStates
                states={states}
                country={country}
                setCountry={setCountry}
                setStates={setStates}
                t={t}
              />
            </div>
          </div>
          <div className="input-wrapper">
            <p>{t("selectLanguageGuide")}</p>
            <div className="edit-languages">
              <Select
                ref={selectLanguagesRef}
                isMulti
                id="languages"
                instanceId="languages"
                name="languages"
                placeholder={t("selectLanguageGuide")}
                onChange={handleLanguages}
                options={languagesOptions}
                isSearchable={true}
                classNamePrefix="react-select"
                required
              />
            </div>
          </div>
          <div className="input-wrapper person">
            <p>{t("maxPeople")}</p>
            <ItineraryPersonNumber
              updateItineraryHandler={updatePerson}
              itineraryMainPerson={inputs?.maxPeople}
            />
          </div>
          <div className="input-wrapper">
            <p className="fee-description">
              {t("feeMsg1")} <br />
              {t("feeMsg2")}
              <br />
              <span>{t("feeMsg3")}</span>
            </p>
            <div className="fee-edit">
              <div className="two-columns-wrapper fee-edit-options">
                <label htmlFor="half-day" className="checkbox-label">
                  <input
                    type="checkbox"
                    name="half-day"
                    id="half-day"
                    checked={feeOptions.halfDay}
                    onChange={(e) => {
                      setFeeOptions({
                        ...feeOptions,
                        halfDay: !feeOptions.halfDay,
                      });
                      if (!e.target.checked) {
                        inputs.fee.halfDay = "";
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
                    checked={feeOptions.fullDay}
                    onChange={(e) => {
                      setFeeOptions({
                        ...feeOptions,
                        fullDay: !feeOptions.fullDay,
                      });
                      if (!e.target.checked) {
                        inputs.fee.fullDay = "";
                      }
                    }}
                  />
                  {t("fullDay")}
                </label>
              </div>
              <div className="two-columns-wrapper">
                {feeOptions.halfDay ? (
                  <div className="mui-input-wrapper">
                    {(halfDayFocus || inputs.fee.halfDay > 0) && <span>¥</span>}
                    <TextField
                      name="half-day-fee"
                      type="number"
                      inputProps={{
                        min: 3,
                        maxLength: 5,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      label={`¥ ${t("halfDay")}`}
                      placeholder={t("halfDay")}
                      variant="filled"
                      color="secondary"
                      maxLength={5}
                      minLength={3}
                      value={inputs.fee.halfDay}
                      onFocus={() => setHalfDayFocus(true)}
                      onBlur={() => setHalfDayFocus(false)}
                      onChange={(e) => {
                        const regex = /^[0-9]*$/;
                        if (
                          e.target.value.length < 8 &&
                          (regex.test(e.target.value) || e.target.value === "")
                        ) {
                          setInputs({
                            ...inputs,
                            fee: {
                              ...inputs.fee,
                              halfDay: !isNaN(parseInt(e.target.value))
                                ? parseInt(e.target.value)
                                : "",
                            },
                          });
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                {feeOptions.fullDay && (
                  <div className="mui-input-wrapper">
                    {(fullDayFocus || inputs.fee.fullDay > 0) && <span>¥</span>}
                    <TextField
                      name="full-day-fee"
                      type="number"
                      inputProps={{
                        min: 3,
                        maxLength: 5,
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      label={`¥ ${t("fullDay")}`}
                      placeholder={t("fullDay")}
                      variant="filled"
                      color="secondary"
                      maxLength={5}
                      minLength={3}
                      value={inputs.fee.fullDay}
                      onFocus={() => setFullDayFocus(true)}
                      onBlur={() => setFullDayFocus(false)}
                      onChange={(e) => {
                        const regex = /^[0-9]*$/;
                        if (
                          e.target.value.length < 8 &&
                          (regex.test(e.target.value) || e.target.value === "")
                        ) {
                          setInputs({
                            ...inputs,
                            fee: {
                              ...inputs.fee,
                              fullDay: !isNaN(parseInt(e.target.value))
                                ? parseInt(e.target.value)
                                : "",
                            },
                          });
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {error && <p className="error-message">⛔ {error}</p>}
          {!loading && (
            <button className="submit-button normal-button" type="submit">
              {t("signUp")}
            </button>
          )}
          {loading && (
            <div className="submit-spinner normal-button">
              <Image
                src="/img/icon-spinner-white.svg"
                alt="spinner"
                height={40}
                width={40}
              />
            </div>
          )}
        </form>
      </div>
    </SignUpLastStepStyles>
  );
};
export default SignUpLastStep;
