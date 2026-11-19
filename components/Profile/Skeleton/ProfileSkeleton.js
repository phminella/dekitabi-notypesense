import { ProfileSkeletonStyles } from "./styles/ProfileSkeletonStyles";
import Skeleton from "@mui/material/Skeleton";
const ProfileSkeleton = () => {
  return (
    <ProfileSkeletonStyles>
      <Skeleton variant="rectangular" width={"100%"} height={320} />
      <div className="skeleton-main-profile">
        <div className="skeleton-general-details">
          <Skeleton
            variant="circular"
            width={140}
            height={140}
            animation="wave"
            sx={{ margin: "0 auto 0 auto" }}
          />
          <Skeleton
            variant="rounded"
            width={130}
            height={15}
            animation="wave"
            sx={{ margin: "10px auto" }}
          />
          <Skeleton
            variant="rounded"
            width={250}
            height={280}
            animation="wave"
            sx={{ margin: "10px auto" }}
          />
        </div>
        <div className="skeleton-info">
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={360}
            animation="wave"
          />
        </div>
      </div>
    </ProfileSkeletonStyles>
  );
};
export default ProfileSkeleton;
