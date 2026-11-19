import Image from "next/image";
import useChangeLanguage from "../../lib/useChangeLanguage";
import { getLanguageFlagSrc } from "../../lib/languageFlags";
const SelectLanguageOptions = ({
  show,
  setShow,
  setShowSettings,
  t,
  popularLanguageList,
  language,
}) => {
  const { changeLanguage } = useChangeLanguage();
  const setLanguageHandler = async (language) => {
    changeLanguage(language);
  };
  return (
    <div className={`currency-wrapper ${show ? "show-currency" : ""}`}>
      <div
        className={`currency-background`}
        onClick={() => {
          setShow(false);
          if (setShowSettings) {
            setShowSettings(false);
          }
        }}
      ></div>

      <div className="currency-flex">
        <div className={`currency-list`}>
          <button
            className="close-icon"
            onClick={() => {
              setShow(false);
              if (setShowSettings) {
                setShowSettings(false);
              }
            }}
          >
            <Image
              src="/img/icon-close.svg"
              height={20}
              width={20}
              alt="dekitabi-select-language-close"
            />
          </button>
          <h2>{t("chooseLanguage")}</h2>
          <div className="currency-list-wrapper">
            <h3>{t("languages")}</h3>
            <ul>
              {popularLanguageList.map((item, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={() => setLanguageHandler(item)}
                      className={
                        language?.language === item?.language ? "active" : 0
                      }
                    >
                      <Image
                        src={getLanguageFlagSrc(item?.language, item?.code)}
                        height={15}
                        width={20}
                        alt={`dekitabi-language-${item?.code}`}
                      />
                      <p>{item?.language}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectLanguageOptions;
