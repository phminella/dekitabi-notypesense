import { BuildStyles } from "./styles/BuildStyles";
import Skeleton from "@mui/material/Skeleton";
const BuildSkeleton = () => {
  return (
    <BuildStyles>
      <div className="build-wrapper" id="build-wrapper">
        <div className="build-form">
          <Skeleton
            variant="rounded"
            height={460}
            style={{
              borderRadius: "20px",
            }}
          />
        </div>
        <div className="build-preview">
          <Skeleton
            variant="rounded"
            height={460}
            style={{
              borderRadius: "20px",
            }}
          />
        </div>
      </div>
    </BuildStyles>
  );
};
export default BuildSkeleton;
