import { useEffect, useState } from "react";
const ActivityEditAvailabilitySelect = ({
  setAvailability,
  availability,
  activity,
  date,
  timeSlot,
}) => {
  const [persons, setPersons] = useState();
  useEffect(() => {
    if (availability[date.format("YYYY-MM-DD")]) {
      setPersons(availability[date.format("YYYY-MM-DD")][timeSlot]);
    } else {
      setPersons(0);
    }
  }, [date]);
  return (
    <select
      value={persons}
      onChange={(e) => {
        setPersons(e.target.value);
        let tempAvailability = { ...availability };
        tempAvailability[date.format("YYYY-MM-DD")] = {
          ...tempAvailability[date.format("YYYY-MM-DD")],
          [timeSlot]: Number(e.target.value),
        };
        setAvailability(tempAvailability);
      }}
    ><option value={0}>0</option>
      {Array.from(
    { length: activity?.persons?.to - activity?.persons?.from + 1 },
    (_, i) => activity?.persons?.from + i
  ).map((person, i) => (
        <option value={person} key={i}>{person}</option>
      ))}
    </select>
  );
};
export default ActivityEditAvailabilitySelect;
