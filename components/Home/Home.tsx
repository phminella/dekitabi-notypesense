import { useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";
import Link from "next/link";
import * as DOMPurify from "isomorphic-dompurify";
import { HomeStyles } from "./styles/HomeStyles";
import { HomeResponsiveStyles } from "./styles/responsive/HomeResponsiveStyles";
import HomeWelcomeItinerary from "./HomeWelcomeItinerary";
import HomeReviews from "./HomeReviews/HomeReviews";
import HomeGuide from "./HomeGuide";
import HomeSteps from "./HomeSteps";
import HomeNewGuidesSkeleton from "./HomeNewGuides/HomeNewGuidesSkeleton";
import HomeItinerariesSkeleton from "./HomeItineraries/HomeItinerariesSkeleton";
import ErrorBoundary from "../UI/ErrorBoundary";
import isPwa from "../../lib/isPwa";
import { Language, LessVisitedPrefecture, ItinerariesData, TypesenseHit } from "../../types/home";
import type { RootState } from "../../store/store";

// Dynamic imports come after all static imports (ERROR-1 fixed)
const HomeNewGuides = dynamic(() => import("./HomeNewGuides/HomeNewGuides"), {
  loading: () => <HomeNewGuidesSkeleton />,
});
const HomeItineraries = dynamic(
  () => import("./HomeItineraries/HomeItineraries"),
  { loading: () => <HomeItinerariesSkeleton /> }
);
const HomePromotion = dynamic(() => import("./HomePromotion"));

interface HomeProps {
  newGuides: TypesenseHit[];
  itineraries: ItinerariesData;
  isMobile: boolean;
  lessVisited: LessVisitedPrefecture[];
  lang: string;
}

const Home = ({
  newGuides,
  itineraries,
  isMobile,
  lessVisited,
  lang,
}: HomeProps): JSX.Element => {
  const language: Language = useMemo(() => (
    lang === "default" ? { code: "en" } : { code: lang }
  ), [lang]);
  const stepsRef = useRef<HTMLElement>(null);
  const currency = useSelector(
    (state: RootState) => state.app.currency,
    shallowEqual
  );
  const { t } = useTranslation();

  // isPwa() reads window.matchMedia — must be evaluated client-side only
  // to avoid SSR/hydration mismatch (WARNING-2)
  const [isPwaApp, setIsPwaApp] = useState(false);
  useEffect(() => {
    setIsPwaApp(isPwa());
  }, []);

  const sanitizedGuidesTitle = useMemo(() => DOMPurify.sanitize(t("topDekitabiGuides"), {
    USE_PROFILES: { html: true },
  }), [t]);

  return (
    <HomeResponsiveStyles>
      <HomeStyles className={"show"}>
        <div className="welcome-scene">
          <div className="welcome-scene-wrapper">
            <h1 className="subtitle">{t("homeTitle")}</h1>
            <HomeGuide t={t} stepsRef={stepsRef} language={language} />
          </div>
          {!isPwaApp && (
            <HomeWelcomeItinerary isMobile={isMobile} />
          )}
        </div>
        <HomeReviews t={t} language={language} />
        <HomeSteps t={t} />
        <section className="home-items-wrapper">
          <h2 className="home-title new-guides-title">
            <b
              dangerouslySetInnerHTML={{
                __html: sanitizedGuidesTitle,
              }}
            ></b>{" "}
            <Link className="see-more" prefetch={false} href={`/guides`}>
              {t("showMore")}
            </Link>
          </h2>
          <ErrorBoundary>
            <HomeNewGuides
              t={t}
              language={language}
              currency={currency}
              guides={newGuides}
            />
          </ErrorBoundary>
        </section>
        <HomePromotion t={t} lessVisited={lessVisited} />
        <section className="home-items-wrapper">
          <ErrorBoundary>
            <HomeItineraries
              t={t}
              language={language}
              itineraries={itineraries}
            />
          </ErrorBoundary>
        </section>
      </HomeStyles>
    </HomeResponsiveStyles>
  );
};

export default Home;
