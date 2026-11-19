import Skeleton from "@mui/material/Skeleton";
import { ToursStyles } from "./styles/ToursStyles";
const ToursSkeleton = ({ topRef }) => {
  return (
    <>
      <div className="tours-filter-wrapper" style={{ border: "none" }}>
        <div className="tours-filter" id="tours-filter">
          <Skeleton
            id="attractions-filter"
            variant="rounded"
            height={70}
            width={"100%"}
          />
          <Skeleton variant="rounded" height={70} />
        </div>
        <Skeleton
          id="attractions-filter"
          variant="rounded"
          height={70}
          className="tags"
        />
      </div>
      <div className="tours-wrapper">
        <div>
          <Skeleton
            id="attractions-filter"
            variant="rounded"
            height={110}
            className="tags"
          />
          <div className="tours-list" ref={topRef}>
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="tour"
            />
          </div>
          <div className="pagination">
            <Skeleton variant="rounded" width={300} height={40} />
          </div>
        </div>
      </div>
    </>
  );
};
export default ToursSkeleton;
