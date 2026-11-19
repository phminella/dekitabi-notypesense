import React, { useRef } from "react";
import { HomeStep1Styles } from "./styles/HomeStep1Styles";
import dynamic from "next/dynamic";
import LazySkeleton from "../UI/LazySkeleton";
import ScrollContainerArrows from "../UI/ScrollContainerArrows";
import ScrollContainer from "react-indiana-drag-scroll";
import { TFunction } from "next-i18next";
import { Language } from "../../types/home";
import { PREFECTURES } from "./data/prefectures";

const Step1Item = dynamic(() => import("./Step1Item"), {
  loading: () => (
    <LazySkeleton height={"100%"} width={"300px"} minHeight={"450px"} />
  ),
});

// tags and suggestedAttractions are optional styling props inferred as
// required from the untyped JS source — cast to mark them optional.
const TypedScrollArrows = ScrollContainerArrows as React.ComponentType<{
  containerRef: React.RefObject<HTMLDivElement>;
  itemWidth: number;
  tags?: unknown;
  suggestedAttractions?: unknown;
}>;

interface HomeStep1Props {
  t: TFunction;
  language: Language;
}



const HomeStep1 = ({ t, language }: HomeStep1Props): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <HomeStep1Styles className="home-step1">
      <TypedScrollArrows containerRef={containerRef} itemWidth={300} />
      <ScrollContainer className="scroll-container" innerRef={containerRef}>
        {PREFECTURES.map((prefecture) => (
          // Use stable url key instead of array index (IMPROVEMENT-4)
          <Step1Item
            key={prefecture.url}
            t={t}
            prefecture={prefecture}
            language={language}
          />
        ))}
      </ScrollContainer>
    </HomeStep1Styles>
  );
};

export default React.memo(HomeStep1);
