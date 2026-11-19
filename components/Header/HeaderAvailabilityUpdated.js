import { HeaderAvailabilityUpdatedStyles } from "./styles/HeaderAvailabilityUpdatedStyles";
import dayjs from "dayjs";
const HeaderAvailabilityUpdated = ({
  t,
  selectAllMonth,
}) => {
  return (
    <HeaderAvailabilityUpdatedStyles>
      <button onClick={selectAllMonth}>{t("selectAllMonth")}</button>
    </HeaderAvailabilityUpdatedStyles>
  );
};
export default HeaderAvailabilityUpdated;
