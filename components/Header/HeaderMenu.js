import { HeaderMenuStyles } from "./styles/HeaderMenuStyles";
import Image from "next/image";
import Link from "next/link";
import SelectLanguage from "./SelectLanguage";
import SelectCurrency from "./SelectCurrency";
import { useRef, useEffect } from "react";
const HeaderMenu = ({ setShowMenu, t, isPwa, store, user }) => {
  const menuRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowMenu]);
  return (
    <HeaderMenuStyles>
      <div className="header-menu-wrapper" ref={menuRef}>
        <button className="close-icon-menu" onClick={() => setShowMenu(false)}>
          <Image src="/img/icon-close.svg" height={25} width={25} alt="close" />
        </button>
        <div className="header-menu">
          <Link href="/" prefetch={false} onClick={() => setShowMenu(false)}>
            <Image
              src="/img/logo.png"
              height={45}
              width={141}
              alt="dekitabi-logo"
              priority={true}
              className="logo"
            />
          </Link>
          <ul className="menu-ul">
            <li style={{ textTransform: "none" }}>
              <Link href="/guide-at-dekitabi" prefetch={false}>
                {t("becomeGuide")}
              </Link>
            </li>{" "}
            <li>
              <Link href="/affiliate-program" prefetch={false}>
                {t("affiliateProgram")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                prefetch={false}
                onClick={() => setShowMenu(false)}
              >
                {t("about")}
              </Link>
            </li>
          </ul>
          <ul className="settings-ul">
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
              <SelectCurrency user={user} t={t} />
            </li>
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
              <SelectLanguage user={user} t={t} />
            </li>
          </ul>
          {!isPwa() && (
            <div className="apps">
              {(store === "playStore" || !store) && (
                <a
                  href="https://play.google.com/store/apps/details?id=com.dekitabi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-googleplay.svg"
                    alt="dekitabi-app-google-play"
                    width={120}
                    height={35}
                  />
                </a>
              )}
            </div>
          )}
        </div>
        <ul className="footer-social-media">
          <li>
            <a
              href="https://www.instagram.com/dekitabi"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/img/icon-instagram.svg"
                alt="dekitabi-instagram"
                height={25}
                width={25}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@dekitabi"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="tiktok"
                src="/img/icon-tiktok.svg"
                alt="tiktok"
                height={25}
                width={25}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/dekitabi"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/img/icon-facebook.svg"
                alt="dekitabi-facebook"
                height={25}
                width={25}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.threads.net/@dekitabi"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="threads"
                src="/img/icon-threads.svg"
                alt="dekitabi-threads"
                height={25}
                width={25}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@dekitabi"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/img/icon-youtube.svg"
                alt="youtube"
                height={30}
                width={30}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/dekitabi"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/img/icon-twitter.svg"
                alt="dekitabi-twitter"
                className="twitter"
                height={30}
                width={30}
              />
            </a>
          </li>
        </ul>
      </div>
    </HeaderMenuStyles>
  );
};
export default HeaderMenu;
