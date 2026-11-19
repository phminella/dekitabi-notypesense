import Image from "next/image";
import Link from "next/link";
import { HomeStep1BgStyles } from "./styles/HomeStep1BgStyles";

// Priority image for the three most-visited cities; data-driven rather than
// inline ternary to keep the condition readable and easily extensible.
const PRIORITY_PREFECTURES = new Set(["tokyo", "osaka-city", "kyoto-city"]);

interface HomeStep1BgProps {
  prefecture: string;
  promotion?: boolean;
  sizes?: string;
}

const HomeStep1Bg = ({
  prefecture,
  promotion,
  sizes,
}: HomeStep1BgProps): JSX.Element => {
  return (
    <HomeStep1BgStyles>
      {/* NOTE: removed orphaned {prefecture} text node (ERROR-5) */}
      <Image
        style={{ objectFit: "cover" }}
        className="prefecture-bg"
        alt="background"
        fill
        src={"/img/home/" + prefecture + ".webp"}
        quality={70}
        priority={PRIORITY_PREFECTURES.has(prefecture)}
        sizes={sizes ?? "500px"}
      />
    </HomeStep1BgStyles>
  );
};

export default HomeStep1Bg;
