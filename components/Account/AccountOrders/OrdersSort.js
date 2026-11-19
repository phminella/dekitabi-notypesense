import { OrdersSortStyles } from "./styles/OrdersSortStyles";
import React from "react";
const OrdersSort = ({ t, sortBy, setSortBy, setOrder, ordersLength }) => {
  const sortOptions = [
    { value: "newest", label: t("newestFirst") },
    { value: "oldest", label: t("oldestFirst") },
  ];
  return (
    <OrdersSortStyles>
      {/* <p>
        {ordersLength} {t("orders")}
      </p> */}
      <div className="select-wrapper">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            if (e?.target?.value === "newest") {
              setOrder({ value: "createdAt", order: "desc" });
            }
            if (e?.target?.value === "oldest") {
              setOrder({ value: "createdAt", order: "asc" });
            }
          }}
        >
          {sortOptions.map((option, i) => (
            <option value={option.value} key={i}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </OrdersSortStyles>
  );
};
export default React.memo(OrdersSort);
