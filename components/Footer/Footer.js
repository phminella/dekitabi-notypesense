import { FooterStyles } from "./styles/FooterStyles";
import { FooterResponsiveStyles } from "./styles/responsive/FooterResponsiveStyles";
import Image from "next/image";
import dynamic from "next/dynamic";
const SelectCurrency = dynamic(() => import("../Header/SelectCurrency"), {
  ssr: false,
});
const SelectLanguage = dynamic(() => import("../Header/SelectLanguage"), {
  ssr: false,
});
import { useTranslation } from "next-i18next";
import { useMemo } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import isPwa from "../../lib/isPwa";
import { useRouter } from "next/router";
const Footer = () => {
  const isMobile = useMemo(() => {
    () => {
      if (typeof window === "undefined" || typeof navigator === "undefined") {
        return false;
      } else if ("maxTouchPoints" in navigator) {
        return navigator.maxTouchPoints > 0;
      } else if ("msMaxTouchPoints" in navigator) {
        return navigator.msMaxTouchPoints > 0;
      } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
          return !!mQ.matches;
        } else if ("orientation" in window) {
          return true;
        } else {
          // Only as a last resort, fall back to user agent sniffing
          var UA = navigator?.userAgentData?.brands;
          return (
            /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
            /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
          );
        }
      }
    };
  }, []);
  const { t } = useTranslation();
  const language = useSelector((state) => state.app.language);
  const user = useSelector((state) => state.app.user);
  const router = useRouter();
  const appStore = useMemo(() => {
    if (typeof navigator === "undefined" || typeof window === "undefined") {
      return false;
    } else {
      let userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/huawei/i.test(userAgent)) {
        return "huaweiGallery";
      }
      if (/android/i.test(userAgent)) {
        return "playStore";
      }
      return null;
    }
  }, []);
  const jntoLink =
    language?.code === "es"
      ? "https://www.japan.travel/es/es/"
      : language?.code === "fil"
        ? "https://www.japan.travel/en/ph/"
        : language?.code === "fr"
          ? "https://www.japan.travel/fr/fr/"
          : language?.code === "id"
            ? "https://www.japan.travel/id/id/"
            : language?.code === "it"
              ? "https://www.japan.travel/it/it/"
              : language?.code === "ja"
                ? "https://www.japan.travel/jp/"
                : language?.code === "ko"
                  ? "https://www.japan.travel/ko/kr/"
                  : language?.code === "ms"
                    ? "https://www.japan.travel/en/my/"
                    : language?.code === "pt"
                      ? "https://www.japan.travel/pt/br/"
                      : language?.code === "th"
                        ? "https://www.jnto.or.th/"
                        : language?.code === "vi"
                          ? "https://www.japan.travel/vi/vn/"
                          : language?.code === "zh-CN"
                            ? "https://www.japan-travel.cn/"
                            : language?.language === "繁體中文(香港)"
                              ? "https://www.japan.travel/hk/hk/"
                              : language?.language === "繁體中文(台湾)"
                                ? "https://www.japan.travel/tw/tw/"
                                : "https://www.japan.travel/en/";
  const goTokyoLink =
    language?.code === "es"
      ? "https://www.gotokyo.org/es/"
      : language?.code === "fr"
        ? "https://www.gotokyo.org/fr/"
        : language?.code === "it"
          ? "https://www.gotokyo.org/it/"
          : language?.code === "ja"
            ? "https://www.gotokyo.org/jp/"
            : language?.code === "ko"
              ? "https://www.gotokyo.org/th/"
              : language?.code === "th"
                ? "https://www.japan.travel/vi/vn/"
                : language?.code === "zh-CN"
                  ? "https://www.gotokyo.org/cn/"
                  : language?.language === "繁體中文(香港)"
                    ? "https://www.gotokyo.org/tc/"
                    : language?.language === "繁體中文(台湾)"
                      ? "https://www.gotokyo.org/tc/"
                      : "https://www.gotokyo.org/";
  const tokyoTokyoLink =
    language?.code === "ja"
      ? "https://tokyotokyo.jp/ja/home/"
      : "https://tokyotokyo.jp/home/";
  return (
    <FooterResponsiveStyles>
      <FooterStyles
        className={`footer ${isPwa() ? "pwa" : ""} ${router?.asPath === "/affiliate-program" ||
            router?.pathname === "/affiliate-program/[page]"
            ? "affiliates-footer"
            : ""
          }`}
      >
        <div className="footer-wrapper">
          <div className="footer-lists">
            <ul className="footer-column footer-options">
              <li>
                <p className="footer-title">{t("language")}</p>
              </li>
              <li>
                <SelectLanguage t={t} user={user} />
              </li>
              <li>
                <p className="footer-title">{t("currency")}</p>
              </li>
              <li>
                <SelectCurrency t={t} user={user} />
              </li>
            </ul>{" "}
            <ul className="footer-column footer-normal-list">
              <li>
                <p className="dekitabi footer-title">dekitabi</p>
              </li>
              <li>
                <Link href="/about" prefetch={false}>
                  {t("about")}
                </Link>
              </li>
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
                <Link href="/careers" prefetch={false}>
                  {t("careers")}
                </Link>
              </li>
            </ul>
            {router?.asPath !== "/affiliate-program" &&
              router?.pathname !== "/affiliate-program/[page]" && (
                <ul className="footer-column footer-normal-list">
                  <li>
                    <p className="footer-title">{t("support")}</p>
                  </li>
                  <li>
                    <Link href="/contact-us" prefetch={false}>
                      {t("contactFooter")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/cancelation-policy" prefetch={false}>
                      {t("cancelationPolicy")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions" prefetch={false}>
                      {t("termsAndConditions")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy" prefetch={false}>
                      {t("privacyPolicy")}
                    </Link>
                  </li>
                </ul>
              )}
            {router?.asPath !== "/affiliate-program" &&
              router?.pathname !== "/affiliate-program/[page]" && (
                <ul className="footer-column">
                  <li>
                    <p className="footer-title">{t("waysYouCanPay")}</p>
                  </li>
                  <li className="payment-methods">
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-visa.svg"
                        alt="dekitabi-payment-method-visa"
                        height={13}
                        width={39}
                        loading="lazy"
                      />
                    </div>
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-mastercard.svg"
                        alt="dekitabi-payment-method-mastercard"
                        height={30}
                        width={30}
                        loading="lazy"
                      />
                    </div>
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-diners.svg"
                        alt="dekitabi-payment-method-diners"
                        height={30}
                        width={30}
                        loading="lazy"
                      />
                    </div>
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-discover.svg"
                        alt="dekitabi-payment-method-discover"
                        height={30}
                        width={30}
                        loading="lazy"
                      />
                    </div>
                  </li>
                  <li className="payment-methods">
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-jcb.svg"
                        alt="dekitabi-payment-method-jcb"
                        height={30}
                        width={30}
                        loading="lazy"
                      />
                    </div>
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-applepay.svg"
                        alt="dekitabi-payment-method-applepay"
                        height={13}
                        width={35}
                        loading="lazy"
                      />
                    </div>
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-googlepay.svg"
                        alt="dekitabi-payment-method-googlepay"
                        height={28}
                        width={35}
                        loading="lazy"
                      />
                    </div>
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-alipay.svg"
                        alt="dekitabi-payment-method-alipay"
                        height={23}
                        width={23}
                        loading="lazy"
                      />
                    </div>
                    <div className="payment-method">
                      <Image
                        src="/img/payment-methods/icon-wechat.svg"
                        alt="dekitabi-payment-method-wechat"
                        height={23}
                        width={23}
                        loading="lazy"
                      />
                    </div>
                  </li>
                </ul>
              )}
            <div className="app">
              <div className="app-wrapper">
                {!isMobile ? (
                  <div className="app-wrapper-desktop">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.dekitabi"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src="/img/icon-googleplay.svg"
                        alt="dekitabi-app-google-play"
                        width={128}
                        height={38}
                        className="app-store-image"
                        loading="lazy"
                      />
                    </a>
                    <br />
                    <a
                      href="https://appgallery.huawei.com/#/app/C110443229"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src="/img/icon-huawei.svg"
                        alt="dekitabi-app-huawei"
                        width={129}
                        height={39}
                        loading="lazy"
                      />
                    </a>
                  </div>
                ) : (
                  <div className="app-wrapper-mobile">
                    {appStore === "playStore" && (
                      <a
                        href="https://play.google.com/store/apps/details?id=com.dekitabi"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="/img/icon-googleplay.svg"
                          alt="dekitabi-app-google-play"
                          width={128}
                          height={38}
                          className="app-store-image"
                          loading="lazy"
                        />
                      </a>
                    )}
                    {appStore === "huaweiGallery" && (
                      <a
                        href="https://appgallery.huawei.com/#/app/C110443229"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="/img/icon-huawei.svg"
                          alt="dekitabi-app-huawei"
                          width={129}
                          height={39}
                          className="app-store-image"
                          loading="lazy"
                        />
                      </a>
                    )}
                    <Image
                      src="/img/logo.png"
                      height={45}
                      width={141}
                      alt="logo"
                      className="dekitabi-logo"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <h3 style={{ width: "1000px", margin: "0 auto 20px auto", color:"white" }}>もっと日本</h3> */}
          <div className="footer-links">
            <a href={jntoLink} target="_blank" rel="noreferrer">
              <Image
                src="/img/links/icon-jnto.png"
                alt="dekitabi-resource-jnto"
                className="jnto"
                height={50}
                width={130}
                loading="lazy"
              />
            </a>
            <a href={goTokyoLink} target="_blank" rel="noreferrer">
              <Image
                src="/img/links/icon-gotokyo.png"
                alt="dekitabi-resource-gotokyo"
                className="gotokyo"
                height={50}
                width={70}
                loading="lazy"
              />
            </a>
            <a href={tokyoTokyoLink} target="_blank" rel="noreferrer">
              <Image
                src="/img/links/icon-tokyotokyo.png"
                alt="dekitabi-resource-tokyotokyo"
                className="gotokyo"
                height={50}
                width={210}
                loading="lazy"
              />
            </a>
          </div>
          <div className="footer-end">
            <p>
              ©{new Date().getFullYear()} <span>合同会社dekitabi</span>. {t("madeInTokyo")}.
              メード・イン・トーキョー
            </p>
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
                    loading="lazy"
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
                    loading="lazy"
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
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://www.tiktok.com/@dekitabi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    className="tiktok"
                    src="/img/icon-tiktok.svg"
                    alt="tiktok"
                    height={25}
                    width={25}
                    loading="lazy"
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://www.youtube.com/@dekitabi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-youtube.svg"
                    alt="youtube"
                    height={30}
                    width={30}
                    loading="lazy"
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
                    loading="lazy"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </FooterStyles>
    </FooterResponsiveStyles>
  );
};
export default Footer;
