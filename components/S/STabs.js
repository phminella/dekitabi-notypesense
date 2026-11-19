import { STabsStyles } from "./styles/STabsStyles";
import Image from "next/legacy/image";
import * as Scroll from "react-scroll";
import { useEffect, useState } from "react";
import STutorialButtons from "./STutorialButtons";
import Link from "next/link";
const STabs = ({ t, tab, setTab, router, city, language, user }) => {
  const [tutorialSteps, setTutorialSteps] = useState(-1);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem("tutorialRead")) {
      window.localStorage.setItem("tutorialRead", "true");
      setTutorialSteps(0);
      const scroller = Scroll.scroller;
      scroller.scrollTo("results-tabs", {
        delay: 0,
        duration: 500,
        offset: -150,
        smooth: false,
      });
    }
  }, []);
  return (
    <STabsStyles>
      {tutorialSteps > -1 && <div className="tutorial-bg"></div>}
      <ul className="results-tabs" id="results-tabs">
        <li className={`${tutorialSteps === 0 ? "tutorial" : ""}`}>
          <Link
            prefetch={false}
            href={`${city?.translatedCity["en"]
              .split(" ")
              .join("-")}/attractions`}
            className={`tab-buttons ${
              tab === "attractions" && tutorialSteps === -1 ? "active" : ""
            }`}
          >
            <Image
              height={30}
              width={30}
              alt="itinerary"
              src="/img/icon-marker2.svg"
            />
          </Link>
          {tutorialSteps === 0 && (
            <div className="tutorial-message">
              <h3>{t("createYourOwn")}</h3>
              {t("createYourOwnTutorial1")}
              <div className="tutorial-sub-message">
                <div className="tutorial-image">
                  <Image
                    height={20}
                    width={20}
                    src="/img/icon-map-pin2.svg"
                    alt="plus"
                  ></Image>
                </div>
                {t("createYourOwnTutorial2")}
              </div>
              <STutorialButtons
                setTutorialSteps={setTutorialSteps}
                tutorialSteps={tutorialSteps}
                t={t}
              />
            </div>
          )}
        </li>
        <li className={`${tutorialSteps === 1 ? "tutorial" : ""}`}>
          <Link
            prefetch={false}
            href={`${city?.translatedCity["en"]
              .split(" ")
              .join("-")}/itineraries`}
            className={`tab-buttons ${
              tab === "itineraries" && tutorialSteps === -1 ? "active" : ""
            }`}
          >
            <Image
              height={30}
              width={30}
              alt="itinerary"
              src="/img/icon-itinerary2.svg"
            />
            {/* <span className="tab-text">{t("toursSightseeing")}</span> */}
          </Link>
          {tutorialSteps === 1 && (
            <div className="tutorial-message">
              <h3>{t("itineraries")}</h3>
              {t("itinerariesTutorial1")}
              <br />
              <b>
                {t(
                  user?.guide === "true"
                    ? "completedGuideItem1"
                    : "itinerariesTutorial2"
                )}
              </b>
              <STutorialButtons
                setTutorialSteps={setTutorialSteps}
                tutorialSteps={tutorialSteps}
                t={t}
              />
            </div>
          )}
        </li>
        <li className={`${tutorialSteps === 2 ? "tutorial" : ""}`}>
          <Link
            prefetch={false}
            href={`${city?.translatedCity["en"]?.split(" ")?.join("-")}/guides`}
            className={`tab-buttons ${
              tab === "guides" && tutorialSteps === -1 ? "active" : ""
            }`}
          >
            <Image
              height={26}
              width={26}
              alt="guide"
              src="/img/icon-signin.svg"
            />
            {/* <span className="tab-text">{t("guides")}</span> */}
          </Link>
          {tutorialSteps === 2 && (
            <div className="tutorial-message">
              <h3>
                {t("guidesIn", {
                  state: city?.translatedCity[language?.code]?.replace(
                    /(^\w{1})|(\s+\w{1})/g,
                    (letter) => letter?.toUpperCase()
                  ),
                })}
              </h3>
              {t(
                user?.guide === "true"
                  ? "guidesTutorial1Guides"
                  : "guidesTutorial1"
              )}
              <div className="tutorial-sub-message">
                {t(
                  user?.guide === "true"
                    ? "guidesTutorial2Guides"
                    : "guidesTutorial2"
                )}
              </div>
              <STutorialButtons
                setTutorialSteps={setTutorialSteps}
                tutorialSteps={tutorialSteps}
                t={t}
              />
            </div>
          )}
        </li>
        {/* <li className={`${tutorialSteps === 3 ? "tutorial" : ""}`}>
          <Link
            href={`${city?.translatedCity["en"]?.split(" ")?.join("-")}/build`}
            className={`tab-buttons ${
              tab === "build" && tutorialSteps === -1 ? "active" : ""
            }`}
          >
            <Image
              height={32}
              width={32}
              alt="build"
              src="/img/icon-build.svg"
            />
          </Link>
          {tutorialSteps === 3 && (
            <div className="tutorial-message">
              <h3>{t("buildWithUs")}</h3>
              {t("buildTutorial1")}
              <div className="tutorial-sub-message">{t("buildTutorial2")}</div>
              <STutorialButtons
                setTutorialSteps={setTutorialSteps}
                tutorialSteps={tutorialSteps}
                t={t}
              />
            </div>
          )}
        </li> */}
      </ul>
    </STabsStyles>
  );
};
export default STabs;
