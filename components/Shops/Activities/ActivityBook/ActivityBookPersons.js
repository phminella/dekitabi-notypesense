import { ActivityBookPersonsStyles } from "./styles/ActivityBookPersonsStyles";
import { useEffect, useState } from "react";
const ActivityBookPersons = ({
  activity,
  timeSlot,
  date,
  tickets,
  setTickets,
  category,
  totalPersons,
}) => {
  const [persons, setPersons] = useState(0);
  useEffect(() => {
    setPersons(0);
  }, [timeSlot, date]);
  const personsOptions =
    (activity?.withAvailability && !activity?.availability[date]) ||
    !timeSlot ||
    (activity?.withAvailability && !activity?.availability[date][timeSlot])
      ? [0]
      : activity?.withAvailability && activity?.availability[date][timeSlot]
      ? Array.from(
          { length: activity?.availability[date][timeSlot] + 1 },
          (_, i) => 0 + i
        )
      : Array.from({ length: activity?.persons?.to + 1 }, (_, i) => 0 + i);
  return (
    <ActivityBookPersonsStyles>
      <select
        value={persons}
        onChange={(e) => {
          setPersons(Number(e.target.value));
          setTickets({ ...tickets, [category]: Number(e.target.value) });
        }}
      >
        {personsOptions.map((option, i) => {
          return (
            <option value={option} key={i}>
              {option}
            </option>
          );
        })}
      </select>
    </ActivityBookPersonsStyles>
  );
};
export default ActivityBookPersons;
