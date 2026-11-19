import styled from "styled-components";
export const CustomYearReactDatesStyles = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 62px;
  justify-content: center;
  align-items: center;
  width: 190px;
  margin: 0 auto;
  select {
    border: none;
    margin: 0 5px;
    text-transform: capitalize;
    padding: 0 !important;
    min-height: 22px !important;
    height: 22px !important;
    font-size: 15px !important;
  }
  .CalendarMonth_caption,
  .CalendarMonth_caption_1 {
    padding: 0 !important;
  }
  .date-wrapper {
    background: var(--darkBlue) !important;
  }
`;
