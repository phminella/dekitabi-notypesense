import { HomeNewGuidesStyles } from "./styles/HomeNewGuidesStyles";
import Skeleton from "@mui/material/Skeleton";

const HomeNewGuidesSkeleton = (): JSX.Element => {
  return (
    <HomeNewGuidesStyles>
      <div className="scroll-container" style={{ overflow: "hidden" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="guide" variant="rounded" height={350} />
        ))}
      </div>
    </HomeNewGuidesStyles>
  );
};

export default HomeNewGuidesSkeleton;
