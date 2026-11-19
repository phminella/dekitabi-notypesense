import { HomePopularAttractionsStyles } from "./styles/HomePopularAttractionsStyles";
import ScrollContainer from "react-indiana-drag-scroll";
import dynamic from "next/dynamic";
import ScrollContainerArrows from "../../UI/ScrollContainerArrows";
import HomePopularAttractionsSkeleton from "./HomePopularAttractionsSkeleton";
import { useRef } from "react";
import { TFunction } from "next-i18next";
import { Language, PopularAttraction } from "../../../types/home";

const HomePopularAttraction = dynamic(
  () => import("./HomePopularAttraction"),
  // Added loading skeleton for consistent UX (WARNING-9)
  { loading: () => <HomePopularAttractionsSkeleton /> }
);

// tags and suggestedAttractions are optional styling props inferred as
// required from the untyped JS source — cast to mark them optional.
const TypedScrollArrows = ScrollContainerArrows as React.ComponentType<{
  containerRef: React.RefObject<HTMLDivElement>;
  itemWidth: number;
  tags?: unknown;
  suggestedAttractions?: unknown;
}>;

interface HomePopularAttractionsProps {
  t: TFunction;
  language: Language;
  popularAttractions: PopularAttraction[];
}

const HomePopularAttractions = ({
  t,
  language,
  popularAttractions,
}: HomePopularAttractionsProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <HomePopularAttractionsStyles>
      <div className="attractions-wrapper">
        <TypedScrollArrows containerRef={containerRef} itemWidth={200} />
        <ScrollContainer className="scroll-container" innerRef={containerRef}>
          {popularAttractions?.map((attraction, i) => (
            <HomePopularAttraction
              key={attraction.url ?? i}
              attraction={attraction}
              t={t}
              language={language}
            />
          ))}
        </ScrollContainer>
      </div>
    </HomePopularAttractionsStyles>
  );
};

export default HomePopularAttractions;
