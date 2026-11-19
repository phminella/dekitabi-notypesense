import { CustomYearReactDatesStyles } from "./styles/CustomYearReactDatesStyles";
import moment from "moment";
const CustomYearReactDates = ({ month, onMonthSelect, onYearSelect }) => {
  let i;
  let years = [];
  for (i = moment().year(); i >= moment().year() - 100; i--) {
    years.push(
      <option value={i} key={`year-${i}`}>
        {i}
      </option>
    );
  }
  return (
    <CustomYearReactDatesStyles>
      <div>
        <select
          value={month.month()}
          onChange={(e) => onMonthSelect(month, e.target.value)}
        >
          {moment.months().map((label, value) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="year"
          value={month.year()}
          onChange={(e) => {
            onYearSelect(month, e.target.value);
          }}
        >
          {years}
        </select>
      </div>
    </CustomYearReactDatesStyles>
  );
};
export default CustomYearReactDates;
