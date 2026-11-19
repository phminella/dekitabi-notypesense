import { HomePromotionStyles } from "./styles/HomePromotionStyles";
import Link from "next/link";
import HomeStep1Bg from "./HomeStep1Bg";
import { TFunction } from "next-i18next";
import { LessVisitedPrefecture } from "../../types/home";

interface HomePromotionProps {
  t: TFunction;
  lessVisited: LessVisitedPrefecture[];
}

const HomePromotion = ({
  t,
  lessVisited,
}: HomePromotionProps): JSX.Element => {
  const prefectures = Array.isArray(lessVisited) ? lessVisited : [];

  return (
    <HomePromotionStyles>
      <h2 className="home-title">{String(t("moreJapan"))}</h2>
      <h3>{String(t("moreJapanMsg"))}</h3>
      <div className="promotion-wrapper">
        {prefectures.map((prefecture) => (
          // Use a stable key (prefecture.name) instead of array index (IMPROVEMENT-4)
          <Link
            prefetch={false}
            href={`/s/${prefecture?.search}`}
            className="promotion"
            key={prefecture.name}
          >
            <HomeStep1Bg
              prefecture={`promotion/${prefecture.name.toLowerCase()}`}
              promotion={true}
              sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 25vw"
            />
            <h3 className="name">{String(t(prefecture.name))}</h3>
          </Link>
        ))}
      </div>
    </HomePromotionStyles>
  );
};

export default HomePromotion;
