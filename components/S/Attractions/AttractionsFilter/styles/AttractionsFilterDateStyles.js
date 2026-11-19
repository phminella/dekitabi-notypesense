import styled from "styled-components";
export const AttractionsFilterDateStyles = styled.div`
  .DayPicker_transitionContainer {
    border-radius: 10px !important;
  }
  .SingleDatePicker {
    width: 100%;
    .SingleDatePickerInput {
      width: 100%;
      text-align: center;
      border-radius: 10px;
      padding: 2px;
      .DateInput {
        width: 100% !important;
        .DateInput_input {
          width: 100% !important;
          font-size: 1.1em !important;
          text-align: center;
        }
        .DateInput_input__focused {
          width: 100%;
          border-bottom: 2px solid var(--darkBlue) !important;
        }
        .DateInput_input__disabled {
          background: #e0e0e0;
          color: #a3a3a3 !important;
          font-style: normal;
        }
      }
    }
  }
  .DateRangePicker {
    width: 100%;
    .DateRangePickerInput {
      width: 100%;
      text-align: center;
      border-radius: 10px;
      padding: 2px;
      .DateInput {
        width: 45%;
        .DateInput_input {
          font-size: 1.1em !important;
          text-align: center;
        }
        .DateInput_input__focused {
          width: 100%;
          border-bottom: 2px solid var(--darkBlue) !important;
        }
      }
    }
  }
`;
