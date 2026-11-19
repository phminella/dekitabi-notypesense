import { SStyles } from "./styles/SStyles";
import { SResponsiveStyles } from "./styles/responsive/SResponsiveStyles";
import STabs from "./STabs";
import dynamic from "next/dynamic";
import AttractionsSkeleton from "./Attractions/AttractionsSkeleton";
import ToursSkeleton from "./Tours/ToursSkeleton";
import GuidesSkeleton from "./Guides/GuidesSkeleton";
import BuildSkeleton from "./Build/BuildSkeleton";
const Attractions = dynamic(() => import("./Attractions/Attractions"), {
  loading: () => <AttractionsSkeleton />,
});
const Tours = dynamic(() => import("./Tours/Tours"), {
  loading: () => <ToursSkeleton />,
});
const Guides = dynamic(() => import("./Guides/Guides"), {
  loading: () => <GuidesSkeleton />,
});
const Build = dynamic(() => import("./Build/Build"), {
  loading: () => <BuildSkeleton />,
});
import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
const SBackground = dynamic(() => import("./SBackground"), { ssr: false });
const S = ({ city, ssrData, section, background, locale }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [tab, setTab] = useState(
    section?.length > 1 &&
      (section[1] === "itineraries" ||
        section[1] === "attractions" ||
        section[1] === "guides" ||
        section[1] === "build")
      ? section[1]
      : "attractions"
  );
  const language = useSelector((state) => state.app.language, shallowEqual);
  const user = useSelector((state) => state.app.user, shallowEqual);
  const [firstAttraction, setFirstAttraction] = useState();
  useEffect(() => {
    setTab(
      section?.length > 1 &&
        (section[1] === "itineraries" ||
          section[1] === "attractions" ||
          section[1] === "guides" ||
          section[1] === "build")
        ? section[1]
        : "attractions"
    );
  }, [section]);
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      process.env.NODE_ENV === "production" ||
      window.__removeChildPatched
    ) {
      return;
    }

    window.__removeChildPatched = true;
    const originalRemoveChild = Node.prototype.removeChild;

    Node.prototype.removeChild = function (child) {
      if (!this.contains(child)) {
        return child;
      }
      return originalRemoveChild.call(this, child);
    };

    return () => {
      Node.prototype.removeChild = originalRemoveChild;
      window.__removeChildPatched = false;
    };
  }, []);
  return (
    <SResponsiveStyles>
      <SStyles>
        <div className="results-wrapper">
          <div className={`attractions-city`}>
            <SBackground bg={background} />
            <div className="city-wrapper">
              <h1>
                {firstAttraction?.translatedCity
                  ? firstAttraction?.translatedCity[locale]
                  : city?.translatedCity[locale]}
              </h1>
              <p className="subtitle">{city?.translatedCountry[locale]}</p>
            </div>
          </div>
          <div className="results">
            <STabs
              tab={tab}
              t={t}
              city={city}
              language={language}
              user={user}
            />
          </div>
        </div>
        {tab === "guides" && (
          <Guides
            state={city}
            language={language}
            t={t}
            firstAttraction={firstAttraction}
            router={router}
            data={ssrData}
          />
        )}
        {tab === "attractions" && (
          <Attractions
            city={city}
            language={language}
            t={t}
            tab={tab}
            setFirstAttraction={setFirstAttraction}
            firstAttraction={firstAttraction}
            router={router}
            user={user}
            data={ssrData}
            locale={locale}
          />
        )}
        {tab === "itineraries" && (
          <Tours
            city={city}
            language={language}
            t={t}
            firstAttraction={firstAttraction}
            router={router}
            user={user}
            data={ssrData}
          />
        )}
        {tab === "build" && (
          <Build
            city={city}
            language={language}
            t={t}
            firstAttraction={firstAttraction}
          />
        )}
      </SStyles>
    </SResponsiveStyles>
  );
};
export default React.memo(S);
