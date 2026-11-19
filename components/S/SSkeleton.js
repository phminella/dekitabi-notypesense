import Skeleton from "@mui/material/Skeleton";
import { SStyles } from "./styles/SStyles";
const SSkeleton = () => {
  return (
    <SStyles>
      {" "}
      <div className="results-wrapper">
        <Skeleton
          variant="rectangular"
          width={"calc(100%-20px)"}
          height={330}
          style={{ marginBottom: "20px" }}
        />
      </div>
    </SStyles>
  );
};
export default SSkeleton;
