import { HomePopularAttractionsStyles } from "./styles/HomePopularAttractionsStyles";
import Skeleton from "@mui/material/Skeleton";

const HomePopularAttractionsSkeleton = (): JSX.Element => {
  return (
    <HomePopularAttractionsStyles className="home-popular-attractions">
      <div className="scroll-container" style={{ overflow: "hidden" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            style={{ flexShrink: 0 }}
            width={200}
            height={200}
            variant="rounded"
          />
        ))}
      </div>
    </HomePopularAttractionsStyles>
  );
};

export default HomePopularAttractionsSkeleton;
