import { GuidesGeneralInformationStyles } from "./styles/GuidesGeneralInformationStyles";
import DOMPurify from "isomorphic-dompurify";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import Image from "next/image";
import PoweredByStripe from "./PoweredByStripe";
// import ItineraryVideo from "../Misc/ItineraryVideo";
import { useRouter } from "next/router";
const GuidesGeneralInformation = ({ isMobile }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [videoLanguage, setVideoLanguage] = useState(
    router?.locale === "ja" ||
      router?.locale === "th" ||
      router?.locale === "vi" ||
      router?.locale === "ko" ||
      router?.locale === "zh-CN" ||
      router?.locale === "zh-TW" ||
      router?.locale === "zh-HK" ||
      router?.locale === "th"
      ? "ja"
      : "en"
  );
  return (
    <GuidesGeneralInformationStyles>
      <h1>
        {t("becomeGuide")} <span>@dekitabi</span>
      </h1>
      <h2>{t("itsFree")}</h2>
      <div className="manuals-wrapper">
        <h3>{t("manuals")}</h3>
        <ul>
          <li>
            {t("signUp")}{" "}
            <div>
              <Image
                height={20}
                width={20}
                src="/img/icon-pdf.svg"
                alt="pdf"
              ></Image>
              <a
                href={"/files/dekitabi-account-manual-ja.pdf"}
                download="dekitabi-account-manual-ja"
                target="_blank"
                rel={"noreferrer"}
              >
                日本語
              </a>
              <a
                href={"/files/dekitabi-account-manual-en.pdf"}
                download="dekitabi-account-manual-en"
                target="_blank"
                rel={"noreferrer"}
              >
                English
              </a>
            </div>
          </li>
          <li>
            {t("customizeProfile")}
            <div>
              <Image
                height={20}
                width={20}
                src="/img/icon-pdf.svg"
                alt="pdf"
              ></Image>
              <a
                href={"/files/dekitabi-profile-manual-ja.pdf"}
                download="dekitabi-profile-manual-ja"
                target="_blank"
                rel={"noreferrer"}
              >
                日本語
              </a>
              <a
                href={"/files/dekitabi-profile-manual-en.pdf"}
                download="dekitabi-profile-manual-en"
                target="_blank"
                rel={"noreferrer"}
              >
                English
              </a>
            </div>
          </li>
          <li>
            {t("createAndPublish")}
            <div>
              <Image
                height={20}
                width={20}
                src="/img/icon-pdf.svg"
                alt="pdf"
              ></Image>
              <a
                href={"/files/dekitabi-itinerary-manual-ja.pdf"}
                download="dekitabi-itinerary-manual-ja"
                target="_blank"
                rel={"noreferrer"}
              >
                日本語
              </a>
              <a
                href={"/files/dekitabi-itinerary-manual-en.pdf"}
                download="dekitabi-itinerary-manual-en"
                target="_blank"
                rel={"noreferrer"}
              >
                English
              </a>
            </div>
          </li>
          {/* <li>
            {t("suggestAttraction")}
            <div>
              <Image
                height={20}
                width={20}
                src="/img/icon-pdf.svg"
                alt="pdf"
              ></Image>{" "}
              <a
                href={"/files/dekitabi-suggest-attractions-manual-ja.pdf"}
                download="dekitabi-suggest-attractions-manual-ja"
                target="_blank"
                rel={"noreferrer"}
              >
                日本語
              </a>
              <a
                href={"/files/dekitabi-suggest-attractions-manual-en.pdf"}
                download="dekitabi-suggest-attractions-manual-en"
                target="_blank"
                rel={"noreferrer"}
              >
                English
              </a>
            </div>
          </li> */}
          <li>
            {t("afterBooking")}
            <div>
              <Image
                height={20}
                width={20}
                src="/img/icon-pdf.svg"
                alt="pdf"
              ></Image>{" "}
              <a
                href={"/files/dekitabi-booking-manual-ja.pdf"}
                download="dekitabi-booking-manual-ja"
                target="_blank"
                rel={"noreferrer"}
              >
                日本語
              </a>
              <a
                href={"/files/dekitabi-booking-manual-en.pdf"}
                download="dekitabi-booking-manual-en"
                target="_blank"
                rel={"noreferrer"}
              >
                English
              </a>
            </div>
          </li>
        </ul>
      </div>
      <section className="sign-up">
        <div className="video-wrapper">
          <iframe
            title="sign-up"
            className="iframes"
            width="100%"
            height="450"
            src={
              isMobile && videoLanguage === "ja"
                ? "https://www.youtube.com/embed/vhHDu1JzUR4?si=QRUMaV3ZREFoZxns&rel=0"
                : isMobile && videoLanguage === "en"
                ? "https://www.youtube.com/embed/rgZ-Z8R63vs?si=nGmW2n8rBdV1IXUU&rel=0"
                : !isMobile && videoLanguage === "ja"
                ? "https://www.youtube.com/embed/z_yq0rlq2R0?si=mr4yqrloYkS8u4H3&rel=0"
                : "https://www.youtube.com/embed/ipcHNqUi1Rk?si=YGWG-SN1-y0CQgVr&rel=0"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <button
          onClick={() => {
            setVideoLanguage(videoLanguage === "ja" ? "en" : "ja");
          }}
          className="video-language-button"
        >
          {t("viewVideoIn", {
            language: videoLanguage === "ja" ? "English" : "日本語",
          })}
        </button>
        <h3>
          <span>{t("step1")}:</span> {t("signUp")}!
        </h3>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(`${t("signUp1")}<br />${t("signUp2")}`, {
              USE_PROFILES: { html: true },
            }),
          }}
        ></p>
        <ul>
          <li>
            <div className="circle"></div>
            <p>{t("signUp3")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p>{t("signUp4")}</p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("signUp5"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("signUp6"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("signUp7"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("signUp8"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("signUp9"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("signUp10"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
        </ul>
      </section>
      <section className="promote-yourself">
        <div className="video-wrapper">
          <iframe
            title="promote-yourself"
            className="iframes"
            width="100%"
            height="450"
            src={
              isMobile && videoLanguage === "ja"
                ? "https://www.youtube.com/embed/V70Dc6c6EM4?si=oHamXmjZb2JtT8Gp&rel=0"
                : isMobile && videoLanguage === "en"
                ? "https://www.youtube.com/embed/nsMly0cItv4?si=9ycO8u0vM9h234Zc&rel=0"
                : !isMobile && videoLanguage === "ja"
                ? "https://www.youtube.com/embed/s080iNxOkVo?si=ET3u56fR-EroQOGm&rel=0"
                : "https://www.youtube.com/embed/_31o9w7HjAc?si=8iCTSapWjPrMLuYu&rel=0"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>{" "}
        </div>
        <button
          onClick={() => {
            setVideoLanguage(videoLanguage === "ja" ? "en" : "ja");
          }}
          className="video-language-button"
        >
          {t("viewVideoIn", {
            language: videoLanguage === "ja" ? "English" : "日本語",
          })}
        </button>
        <h3>
          <span>{t("step2")}:</span> {t("promoteYourself")}
        </h3>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(t("promoteYourself1"), {
              USE_PROFILES: { html: true },
            }),
          }}
        ></p>
        <ul>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("promoteYourself2"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("promoteYourself3"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("promoteYourself4"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
        </ul>
      </section>
      <section className="payments">
        <div className="video-wrapper">
          <iframe
            title="payments"
            className="iframes"
            width="100%"
            height="450"
            src={
              isMobile && videoLanguage === "ja"
                ? "https://www.youtube.com/embed/6HfAQQZZoQQ?si=0tjqXILr2cy52G_j&rel=0"
                : isMobile && videoLanguage === "en"
                ? "https://www.youtube.com/embed/_OJvhkCVgh0?si=jI0N5ApR8tuFgAl-&rel=0"
                : !isMobile && videoLanguage === "ja"
                ? "https://www.youtube.com/embed/ZsbsEW3N4b4?si=tEuIRmnAJj053Udq&rel=0"
                : "https://www.youtube.com/embed/GvE5ZrjEk6w?si=OBlNRWVi8bAC8qlJ&rel=0"
            }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <button
          onClick={() => {
            setVideoLanguage(videoLanguage === "ja" ? "en" : "ja");
          }}
          className="video-language-button"
        >
          {t("viewVideoIn", {
            language: videoLanguage === "ja" ? "English" : "日本語",
          })}
        </button>
        <h3>
          <span>{t("step3")}:</span> {t("paymentsAndPayouts")}
        </h3>
        <PoweredByStripe />
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(t("paymentsAndPayouts1"), {
              USE_PROFILES: { html: true },
            }),
          }}
        ></p>
        <ul>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("paymentsAndPayouts2"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
          <li>
            <div className="circle"></div>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("paymentsAndPayouts3"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </li>
        </ul>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(t("paymentsAndPayouts4"), {
              USE_PROFILES: { html: true },
            }),
          }}
        ></p>
      </section>
      {/* <section className="itinerary">
        <h3>{t("twoMinuteVideo")}</h3>
        <ItineraryVideo t={t} isMobile={isMobile} />
      </section> */}
      <p
        style={{ marginTop: "30px" }}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(t("contactFormMsg"), {
            USE_PROFILES: { html: true },
          }),
        }}
      ></p>
    </GuidesGeneralInformationStyles>
  );
};
export default GuidesGeneralInformation;
