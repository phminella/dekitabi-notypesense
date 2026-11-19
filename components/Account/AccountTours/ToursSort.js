import { ToursSortStyles } from "./styles/ToursSortStyles";
import React, { useEffect, useState } from "react";
const ToursSort = ({ t, sortBy, setSortBy, setOrder, tab }) => {
  const [sortOptions, setSortOptions] = useState([
    { value: "newest", label: t("newestFirst") },
    { value: "oldest", label: t("oldestFirst") },
  ]);
  useEffect(() => {
    setSortBy("newest");
    if (tab === "pending" || tab === "waitingPay") {
      setOrder({
        value: "createdAt",
        order: "asc",
      });
      setSortOptions([
        {
          value: "autoCancel",
          label: t("autoCancel"),
        },
        { value: "newest", label: t("newestFirst") },
        { value: "oldest", label: t("oldestFirst") },
      ]);
    } else {
      setOrder({
        value: "date",
        order: tab === "completed" ? "desc" : "asc",
      });
      setSortOptions([
        { value: "newest", label: t("newestFirst") },
        { value: "oldest", label: t("oldestFirst") },
      ]);
    }
  }, [setOrder, setSortBy, t, tab]);
  return (
    <ToursSortStyles>
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          if (e?.target?.value === "newest") {
            setOrder({
              value: "date",
              order: tab === "completed" ? "desc" : "asc",
            });
          }
          if (e?.target?.value === "oldest") {
            setOrder({
              value: "date",
              order: tab === "completed" ? "asc" : "desc",
            });
          }
          if (e?.target?.value === "autoCancel") {
            setOrder({
              value: "createdAt",
              order: "asc",
            });
          }
        }}
      >
        {sortOptions?.map((option, i) => (
          <option value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </select>
    </ToursSortStyles>
  );
};
export default React.memo(ToursSort);
