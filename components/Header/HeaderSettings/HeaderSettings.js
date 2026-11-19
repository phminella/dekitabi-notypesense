import { HeaderSettingsStyles } from "./styles/HeaderSettingsStyles";
import HeaderSettingsHeader from "./HeaderSettingsHeader";
import HeaderSettingsMenu from "./HeaderSettingsMenu";
import Image from "next/image";
import SelectCurrency from "../SelectCurrency";
import SelectLanguage from "../SelectLanguage";
import React from "react";
import HeaderSettingsTitle from "./HeaderSettingsTitle";
const HeaderSettings = ({ user, t, setShowSettings }) => {
  return (
    <HeaderSettingsStyles className="header-settings">
      <div className={`settings`}>
        <button
          className={`close-icon ${user?.uid ? "logged" : ""}`}
          onClick={() => setShowSettings(false)}
        >
          <Image
            src="/img/icon-close.svg"
            height={20}
            width={20}
            alt="close-dekitabi-profile-settings"
          />
        </button>
        {user?.uid && (
          <>
            <HeaderSettingsHeader
              user={user}
              t={t}
              setShowSettings={setShowSettings}
            />
            <HeaderSettingsMenu
              user={user}
              t={t}
              setShowSettings={setShowSettings}
            />
          </>
        )}
        {/* <ul className={`settings-ul ${user?.uid ? "" : "no-user"}`}>
          {!user?.uid && <HeaderSettingsTitle t={t} />}
          {user?.guide !== "true" && (
            <li className="settings-li language-currency">
              <p>
                <Image
                  src="/img/icon-currency.svg"
                  height={20}
                  width={20}
                  alt="dekitabi-currency"
                />{" "}
                {t("currency")}:
              </p>
              <SelectCurrency
                user={user}
                t={t}
                setShowSettings={setShowSettings}
              />
            </li>
          )}
          <li className="settings-li language-currency">
            <p>
              <Image
                src="/img/icon-language.svg"
                height={17}
                width={17}
                alt={`dekitabi-language`}
              />{" "}
              {t("language")}:
            </p>
            <SelectLanguage
              user={user}
              t={t}
              setShowSettings={setShowSettings}
            />
          </li> */}
        {/* {user?.uid && (
            <li>
              <InstallPWAButton t={t} />
            </li>
          )} */}
        {/* </ul> */}
      </div>
    </HeaderSettingsStyles>
  );
};
export default React.memo(HeaderSettings);
