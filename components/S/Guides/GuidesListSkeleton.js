import Skeleton from "@mui/material/Skeleton";
const GuidesListSkeleton = () => {
  return (
    <>
      <div className="guides-wrapper" style={{ width: "100%" }}>
        <Skeleton variant="rounded" width={"100%"} height={400} />
        <Skeleton variant="rounded" width={"100%"} height={400} />
        <Skeleton variant="rounded" width={"100%"} height={400} />
        <Skeleton variant="rounded" width={"100%"} height={400} />
      </div>
    </>
  );
};
export default GuidesListSkeleton;
