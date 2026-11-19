import { AttractionsSkeletonStyles } from "./styles/AttractionsSkeletonStyles";
import Skeleton from "@mui/material/Skeleton";
const AttractionsSkeleton = () => {
  return (
    <AttractionsSkeletonStyles>
      <div className="skeleton-filter-wrapper">
        <Skeleton id="attractions-filter" variant="rounded" height={70} />
        <Skeleton className="tags" variant="rounded" height={70} />
      </div>
      <div className="skeleton-attractions-wrapper">
        <div className="skeleton-attractions">
          <Skeleton variant="rounded" width={"calc(100%-20px)"} height={120} />
          <div className="skeleton-attractions-items">
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={250}
              className="skeleton-attraction"
            />
          </div>
          <div className="skeleton-pagination">
            <Skeleton variant="rounded" width={300} height={40} />
          </div>
        </div>
        <div className="skeleton-map">
          <div className="skeleton-map-item">
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={"100dvh"}
            />
          </div>
        </div>
      </div>
    </AttractionsSkeletonStyles>
  );
};
export default AttractionsSkeleton;
