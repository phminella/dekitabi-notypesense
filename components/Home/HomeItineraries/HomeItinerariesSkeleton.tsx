import { HomeItinerariesStyles } from "./styles/HomeItinerariesStyles";
import Skeleton from "@mui/material/Skeleton";

const HomeItinerariesSkeleton = (): JSX.Element => {
  return (
    <HomeItinerariesStyles>
      <div className="scroll-container" style={{ overflow: "hidden" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="itinerary-wrapper" key={i}>
            <Skeleton
              className="tour-skeleton"
              variant="rounded"
              height={350}
              width={280}
            />
          </div>
        ))}
      </div>
    </HomeItinerariesStyles>
  );
};

export default HomeItinerariesSkeleton;
