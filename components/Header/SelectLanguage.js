import { useSelector, shallowEqual } from "react-redux";
import { useState } from "react";
import Image from "next/legacy/image";
import { SelectCurrencyStyles } from "./styles/SelectCurrencyStyles";
import { SelectCurrencyResponsiveStyles } from "./styles/responsive/SelectCurrencyResponsiveStyles";
import dynamic from "next/dynamic";
import { getLanguageFlagSrc } from "../../lib/languageFlags";
const SelectLanguageOptions = dynamic(() => import("./SelectLanguageOptions"));
const SelectLanguage = ({ user, t, setShowSettings }) => {
  const language = useSelector((state) => state.app.language, shallowEqual);
  const [show, setShow] = useState(false);
  const popularLanguageList = [
    { code: "en", language: "English" },
    { code: "ja", language: "日本語" },
    { code: "zh-CN", language: "简体中文" },
    { code: "zh-TW", language: "繁體中文(台湾)" },
    { code: "zh-TW", language: "繁體中文(香港)" },
    { code: "ko", language: "한국어" },
    { code: "fil", language: "Filipino" },
    { code: "id", language: "Bahasa Indonesia" },
    { code: "th", language: "ไทย" },
    { code: "vi", language: "Tiếng Việt" },
    { code: "ms", language: "Bahasa Melayu" },
    { code: "fr", language: "Français" },
    { code: "es", language: "Español" },
    { code: "it", language: "Italiano" },
    { code: "pt", language: "Português" },
  ];
  return (
    <SelectCurrencyStyles>
      <SelectCurrencyResponsiveStyles>
        <button className="currency-button" onClick={() => setShow(true)}>
          <Image
            src={getLanguageFlagSrc(language?.language, language?.code)}
            height={15}
            width={20}
            alt={`dekitabi-language-${language?.code}`}
            loading="lazy"
          />
          <span className="button-text">{language?.language}</span>
          <span className="arrow">&#9662;</span>
        </button>
        {show && (
          <SelectLanguageOptions
            setShow={setShow}
            show={show}
            setShowSettings={setShowSettings}
            t={t}
            popularLanguageList={popularLanguageList}
            language={language}
            user={user}
          />
        )}
      </SelectCurrencyResponsiveStyles>
    </SelectCurrencyStyles>
  );
};
export default SelectLanguage;
