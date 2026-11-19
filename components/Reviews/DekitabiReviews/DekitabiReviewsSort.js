import { DekitabiReviewsSortStyles } from "./styles/DekitabiReviewsSortStyles";
import React from "react";
const DekitabiReviewsSort = ({
  t,
  sortBy,
  setSortBy,
  setOrder,
  reviewsLength,
  guide,
  activity,
}) => {
  const sortOptions = [
    { value: "newest", label: t("newestFirst") },
    { value: "oldest", label: t("oldestFirst") },
    { value: "highest", label: t("highestFirst") },
    { value: "lowest", label: t("lowestFirst") },
  ];
  return (
    <DekitabiReviewsSortStyles className="dekitabi-reviews-sort">
      <p>
        {reviewsLength} {t("reviews")}
      </p>
      <select
        className="reviews-select"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          if (e?.target?.value === "newest") {
            setOrder({ value: "createdAt", order: "desc" });
          }
          if (e?.target?.value === "oldest") {
            setOrder({ value: "createdAt", order: "asc" });
          }
          if (e?.target?.value === "highest") {
            setOrder({
              value: guide
                ? "guideRating"
                : activity
                ? "activityRating"
                : "tourRating",
              order: "desc",
            });
          }
          if (e?.target?.value === "lowest") {
            setOrder({
              value: guide
                ? "guideRating"
                : activity
                ? "activityRating"
                : "tourRating",
              order: "asc",
            });
          }
        }}
      >
        {sortOptions.map((option, i) => (
          <option value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </select>
    </DekitabiReviewsSortStyles>
  );
};
export default React.memo(DekitabiReviewsSort);
