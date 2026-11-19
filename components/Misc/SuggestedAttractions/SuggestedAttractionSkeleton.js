import { useTranslation } from "next-i18next";
import { SuggestedAttractionsStyles } from "./styles/SuggestedAttractionsStyles";
import Skeleton from "@mui/material/Skeleton";
const SuggestedAttractionSkeleton = () => {
  const { t } = useTranslation();
  return (
    <SuggestedAttractionsStyles>
      <h2>{t("nearbyAttractions")}</h2>
      <div
        className="scroll-container"
        style={{
          overflow: "hidden",
          display: "flex",
          position: "relative",
          gap: "15px",
          minHeight: "200px",
        }}
      >
        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />
        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />
        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />
        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />
        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />
        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />

        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />

        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />

        <Skeleton
          style={{ flexShrink: "0" }}
          width={"200px"}
          height={"200px"}
          variant="rounded"
        />
      </div>
    </SuggestedAttractionsStyles>
  );
};
export default SuggestedAttractionSkeleton;
