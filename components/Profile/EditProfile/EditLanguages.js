import { EditLanguagesStyles } from "./styles/EditLanguagesStyles";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/legacy/image";
import Select from "react-select";
import { getLanguageFlagSrc } from "../../../lib/languageFlags";
const EditLanguages = ({ profile, setProfile, updateProfile, t }) => {
  const selectLanguagesRef = useRef();
  const [languages, setLanguages] = useState(profile?.languages);
  const [editLanguages, setEditLanguages] = useState(false);
  const [saved, setSaved] = useState(false);
  const languagesOptions = [
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
    { value: "zh-HK", label: "繁體中文(香港)" },
    { value: "zh-CN", label: "简体中文" },
    { value: "zh-TW", label: "繁體中文(台湾)" },
    { value: "ko", label: "한국어" },
    { value: "fil", label: "Filipino" },
    { value: "th", label: "ไทย" },
    { value: "vi", label: "Tiếng Việt" },
    { value: "my", label: "မြန်မာဘာသာ" },
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
  const updateLanguages = async () => {
    let tempLanguages = [];
    languages?.map((languages) => tempLanguages?.push(languages?.label));
    if (updateProfile({ languages: tempLanguages })) {
      setEditLanguages(false);
      setProfile({ ...profile, languages: tempLanguages });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  const handleLanguages = (data) => {
    setLanguages(data);
  };
  const changeToSelectFormat = () => {
    let tempLanguages = [];
    profile?.languages?.map((language) =>
      tempLanguages?.push({ label: language, value: language })
    );
    setLanguages(tempLanguages);
  };
  useEffect(() => {
    changeToSelectFormat();
  }, [profile?.languages]);
  return (
    <EditLanguagesStyles>
      <div className="title">
        <h3>{t("languages")}</h3>
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {profile?.languages?.length > 0 && !editLanguages && (
          <button onClick={() => setEditLanguages(true)}>{t("edit")}</button>
        )}
        {(!profile?.languages || profile?.languages?.length < 1) &&
          !editLanguages && (
            <button onClick={() => setEditLanguages(true)}>{t("add")}</button>
          )}
        {editLanguages && (
          <button onClick={() => setEditLanguages(false)}>{t("cancel")}</button>
        )}
      </div>
      {profile?.languages && !editLanguages && (
        <div className="languages">
          <ul>
            {profile?.languages?.map((language, i) => (
              <li className="badge" key={i}>
                <Image
                  src={getLanguageFlagSrc(language)}
                  height={15}
                  width={20}
                  alt={language}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {language}
              </li>
            ))}
          </ul>
        </div>
      )}
      {(!profile?.languages || profile?.languages?.length < 1) &&
        !editLanguages && <p>{t("languagesEmpty")} </p>}
      {editLanguages && (
        <div className="edit-languages">
          <Select
            ref={selectLanguagesRef}
            isMulti
            id="languages"
            instanceId="languages"
            name="languages"
            onChange={handleLanguages}
            options={languagesOptions}
            isSearchable={true}
            required
            value={languages}
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme?.colors,
                primary25: "var(--lightGray)",
                primary: "lightgray",
              },
            })}
          />
          <div className="edit-buttons">
            <button
              onClick={() => {
                setEditLanguages(false);
                setLanguages(profile?.languages);
              }}
            >
              {t("cancel")}
            </button>{" "}
            <button onClick={() => updateLanguages()}>{t("save")}</button>
          </div>
        </div>
      )}
    </EditLanguagesStyles>
  );
};
export default React.memo(EditLanguages);
