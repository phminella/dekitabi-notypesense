import { Skeleton } from "@mui/material";
const LazySkeleton = ({ width, height, minHeight }) => {
  return (
    <Skeleton
      width={width ? width : 300}
      height={height}
      variant="rounded"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        minWidth: width ? width : "100%",
        minHeight: minHeight ? minHeight : 0,
      }}
    />
  );
};
export default LazySkeleton;
