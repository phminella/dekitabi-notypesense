import styled from "styled-components";
export const ItineraryDateStyles = styled.div`
  margin-bottom: 10px;
  h2 {
    display: none;
    &.guide-title {
      display: block;
      margin-bottom: 10px;
    }
  }
  .date-labels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 1.2em;
    font-weight: 600;
    color: var(--darkBlue);
    margin-bottom: 5px;
  }
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 10px;
    &.guide-time {
      grid-template-columns: 1fr;
      margin-bottom: 15px;
    }
    .DateInput_fang {
      display: none;
    }
    .DayPicker_transitionContainer {
      border-radius: 10px !important;
    }
    .SingleDatePicker {
      width: 100%;
      .SingleDatePicker_picker {
        top: -116px !important;
        left: -40px !important;
      }
      .SingleDatePickerInput {
        width: 100%;
        border-radius: 5px;
        padding: 2px;
        .DateInput {
          width: 100%;
          .DateInput_input {
            font-size: 1.1em !important;
            padding: 5px 10px;
            width: 100% !important;
          }
          .DateInput_input__focused {
            border-bottom: 2px solid var(--darkBlue);
          }
        }
      }
    }
    select {
      height: 50px;
      padding: 10px;
      font-size: 1.1em !important;
      border-radius: 5px;
      border: 1px solid lightgray;
    }
  }
  .booked-date {
    display: grid !important;
    grid-template-columns: 1fr !important;
    align-items: center;
    color: var(--darkBlue);
    p:first-child {
      margin-bottom: 5px !important;
    }
  }
  .edit-buttons {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    button {
      color: white;
      background: var(--blue);
      border-radius: 10px;
      padding: 10px;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--darkBlue);
        }
      }
    }
  }
`;
