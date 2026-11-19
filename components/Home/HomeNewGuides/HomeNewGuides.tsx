import { HomeNewGuidesStyles } from "./styles/HomeNewGuidesStyles";
import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import GuideSkeleton from "../../S/Guides/GuideSkeleton";
import { unflatten } from "../../../lib/unflatten";
import ScrollContainer from "react-indiana-drag-scroll";
import ScrollContainerArrows from "../../UI/ScrollContainerArrows";
import { TFunction } from "next-i18next";
import { Language, TypesenseHit } from "../../../types/home";
import type { Currency } from "../../../types/store/appSlice";

// Dynamic imports first, then typed casts below — avoids use-before-declaration
const GuideDynamic = dynamic(() => import("../../S/Guides/Guide"), {
  loading: () => <GuideSkeleton />,
});

interface GuideData {
  [key: string]: any;
}

interface ScrollArrowsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  itemWidth: number;
  tags?: any;
  suggestedAttractions?: any;
}

// Double-cast through unknown to satisfy TS2352 — the JS-inferred type
// (all props required as `any`) doesn't sufficiently overlap our target subset.
const Guide = (GuideDynamic as unknown) as React.ComponentType<{
  currency?: Currency;
  language: Language;
  guide: GuideData;
  t: TFunction;
  fromHome?: boolean;
}>;

// tags and suggestedAttractions are optional styling-only props that are
// inferred as required from the untyped JS source.
const TypedScrollArrows = ScrollContainerArrows as React.ComponentType<ScrollArrowsProps>;

interface HomeNewGuidesProps {
  t: TFunction;
  currency: Currency;
  language: Language;
  guides: TypesenseHit[];
}

const HomeNewGuides = ({
  t,
  currency,
  language,
  guides,
}: HomeNewGuidesProps): JSX.Element => {
  const unflattenedGuides = useMemo(() => {
    return guides?.map((guide) =>
      unflatten(guide.document as Record<string, unknown>)
    ) || [];
  }, [guides]);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <HomeNewGuidesStyles>
      <TypedScrollArrows containerRef={containerRef} itemWidth={280} />
      <ScrollContainer className="scroll-container" innerRef={containerRef}>
        {unflattenedGuides.map((guide, i) => (
          <div className="guide-wrapper" key={i}>
            <Guide
              currency={currency}
              language={language}
              guide={guide as GuideData}
              t={t}
              fromHome={true}
            />
          </div>
        ))}
      </ScrollContainer>
    </HomeNewGuidesStyles>
  );
};

export default React.memo(HomeNewGuides);
