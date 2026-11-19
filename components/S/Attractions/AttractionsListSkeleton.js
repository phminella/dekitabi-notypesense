import { AttractionsSkeletonStyles } from "./styles/AttractionsSkeletonStyles";
import Skeleton from "@mui/material/Skeleton";
const AttractionsListSkeleton = () => {
  return (
    <AttractionsSkeletonStyles>
      <div className="skeleton-attractions-wrapper">
        <div className="skeleton-attractions">
          <Skeleton variant="rounded" width={"calc(100%-20px)"} height={80} />
          <div className="skeleton-attractions-items">
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={140}
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={140}
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={140}
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={140}
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={140}
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={140}
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={140}
            />
            <Skeleton
              variant="rounded"
              width={"calc(100%-20px)"}
              height={140}
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
export default AttractionsListSkeleton;
