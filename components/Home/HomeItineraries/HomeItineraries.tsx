import { HomeItinerariesStyles } from "./styles/HomeItinerariesStyles";
import React, { useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import TourSkeleton from "../../S/Tours/TourSkeleton";
import HomeItinerariesSkeleton from "./HomeItinerariesSkeleton";
import Link from "next/link";
import ShowOriginal from "../../UI/ShowOriginal";
import Image from "next/image";
import { unflatten } from "../../../lib/unflatten";
import ScrollContainer from "react-indiana-drag-scroll";
import ScrollContainerArrows from "../../UI/ScrollContainerArrows";
import { TFunction } from "next-i18next";
import { Language, ItinerariesData } from "../../../types/home";

// Dynamic import declared first, then typed casts below
const TourDynamic = dynamic(() => import("../../S/Tours/Tour"), {
  loading: () => <TourSkeleton />,
});

interface TourData {
  [key: string]: any;
}

interface ScrollArrowsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  itemWidth: number;
  tags?: any;
  suggestedAttractions?: any;
}

// Tour's full prop set is in an untyped JS file; cast to the subset used here
const Tour = TourDynamic as React.ComponentType<{
  language: Language;
  tour: TourData;
  t: TFunction;
  showOriginal: boolean;
  fromHome?: boolean;
}>;

// tags and suggestedAttractions are optional styling props inferred as
// required from the untyped JS source — cast to mark them optional.
const TypedScrollArrows = ScrollContainerArrows as React.ComponentType<ScrollArrowsProps>;

interface HomeItinerariesProps {
  t: TFunction;
  language: Language;
  itineraries: ItinerariesData;
  itineraryId?: string;
  fromItinerary?: boolean;
}

const HomeItineraries = ({
  t,
  language,
  itineraries,
  itineraryId,
  fromItinerary,
}: HomeItinerariesProps): JSX.Element | null => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOriginal, setShowOriginal] = useState(false);

  const unflattenedTours = useMemo(() => {
    return itineraries?.itineraries?.map((tour) =>
      unflatten(tour.document as Record<string, unknown>)
    ) || [];
  }, [itineraries?.itineraries]);

  if (!itineraries?.city) return null;

  return (
    <HomeItinerariesStyles>
      <h2 className="home-title itineraries">
        {String(t("checkItineraries", { city: itineraries?.city[language?.code] }))}{" "}
        {!itineraryId && (
          <Link
            className="see-more"
            prefetch={false}
            href={`/s/${itineraries?.prefecture?.city}/itineraries`}
          >
            {String(t("showMore"))}
          </Link>
        )}
      </h2>
      {/* Fixed: length < 1 doesn't handle undefined correctly (IMPROVEMENT-7) */}
      {!itineraries?.itineraries?.length ? (
        <HomeItinerariesSkeleton />
      ) : (
        <div style={{ position: "relative" }}>
          <ShowOriginal
            t={t}
            showOriginal={showOriginal}
            setShowOriginal={setShowOriginal}
          />
          <TypedScrollArrows
            containerRef={containerRef}
            itemWidth={fromItinerary ? 220 : 280}
          />
          <ScrollContainer className="scroll-container" innerRef={containerRef}>
            {unflattenedTours.map((tour, i) => (
              <div
                className={`itinerary-wrapper ${
                  fromItinerary ? "from-itinerary" : ""
                }`}
                key={i}
              >
                <Tour
                  language={language}
                  tour={tour as TourData}
                  t={t}
                  showOriginal={showOriginal}
                  fromHome={true}
                />
              </div>
            ))}
            {fromItinerary && (
              <div className="show-more">
                <Link
                  prefetch={false}
                  href={`/s/${
                    itineraries?.city?.en === "Tokyo" ? "Tokyo" : "Kyoto-City"
                  }/itineraries`}
                >
                  <Image
                    src="/img/icon-plus.svg"
                    alt="see-more-itineraries"
                    height={20}
                    width={20}
                  />
                </Link>
              </div>
            )}
          </ScrollContainer>
        </div>
      )}
    </HomeItinerariesStyles>
  );
};

export default React.memo(HomeItineraries);
