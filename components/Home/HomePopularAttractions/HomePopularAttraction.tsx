import dynamic from "next/dynamic";
import { HomePopularAttractionStyles } from "./styles/HomePopularAttractionStyles";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@mui/material";
import { TFunction } from "next-i18next";
import { Language, PopularAttraction } from "../../../types/home";

const AttractionImage = dynamic(
  () => import("../../S/Attractions/AttractionImage"),
  {
    ssr: false,
    // Added loading skeleton for consistent UX (WARNING-9)
    loading: () => <Skeleton variant="rounded" width={200} height={200} />,
  }
);

interface AttractionImageProps {
  attraction: string;
  size: number;
  sizes?: string;
  priority?: boolean;
}

// Cast to bypass missing prop types on untyped JS component;
// priority defaults to undefined (falsy) which is safe here.
const AttractionImageComponent = AttractionImage as React.ComponentType<AttractionImageProps>;

interface HomePopularAttractionProps {
  attraction: PopularAttraction;
  language: Language;
  t: TFunction;
}

const HomePopularAttraction = ({
  attraction,
  language,
}: HomePopularAttractionProps): JSX.Element => {
  const translatedName =
    attraction?.translatedName?.[language?.code] ||
    attraction?.translatedName?.en ||
    attraction?.name ||
    "";

  const stateLabel =
    attraction?.translatedState?.[language?.code] ||
    attraction?.translatedState?.en ||
    "";

  const statePrefix = stateLabel ? stateLabel.split(" ")[0] : "";

  return (
    <HomePopularAttractionStyles>
      <Link
        prefetch={false}
        href={`/attraction/${attraction?.url}`}
        target="_blank"
      >
        <div className="attraction-image">
          <AttractionImageComponent
            attraction={attraction?.url}
            size={300}
            sizes={"(max-width:200px) 100vw, 200px"}
            priority={false}
          />
        </div>
        {translatedName}
        <span>{statePrefix ? `@${statePrefix}` : ""}</span>
      </Link>
    </HomePopularAttractionStyles>
  );
};

export default React.memo(HomePopularAttraction);
