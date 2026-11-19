import Skeleton from "@mui/material/Skeleton";
import { GuidesStyles } from "./styles/GuidesStyles";
import { GuidesResponsiveStyles } from "./styles/responsive/GuidesResponsiveStyles";
const GuidesSkeleton = () => {
  return (
    <GuidesResponsiveStyles>
      <GuidesStyles>
        <div className="guides-filter-wrapper" id="guides-filter">
          <div className="guides-filter">
            <Skeleton variant="rounded" width={"100%"} height={65} />
            <div className="guides-filter-two">
              <div className="filter-date">
                <Skeleton variant="rounded" width={"100%"} height={65} />
              </div>
              <Skeleton variant="rounded" width={"100%"} height={65} />
            </div>
          </div>
          <Skeleton
            variant="rounded"
            height={75}
            style={{ margin: "20px 0 0 0" }}
          />
        </div>
        <div className="guides-wrapper">
          <div>
            <Skeleton variant="rectangular" width={"100%"} height={400} />
          </div>
          <div>
            <Skeleton variant="rectangular" width={"100%"} height={400} />
          </div>
          <div>
            <Skeleton variant="rectangular" width={"100%"} height={400} />
          </div>
          <div>
            <Skeleton variant="rectangular" width={"100%"} height={400} />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <Skeleton
            variant="rounded"
            width={300}
            height={40}
            style={{ margin: "0 auto", marginTop: "20px" }}
          />
        </div>
      </GuidesStyles>
    </GuidesResponsiveStyles>
  );
};
export default GuidesSkeleton;
