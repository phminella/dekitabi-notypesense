import styled from "styled-components";
export const ActivityBookStyles = styled.div`
  overflow: hidden;
  position: sticky;
  top: 40px;
  width: 100%;
  border: 1px solid var(--lightGray);
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  .book-labels {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-weight: 600;
    color: var(--darkBlue);
    p {
      margin-left: 5px;
    }
  }
  .activity-slots {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 10px;
    select {
      height: 55px;
      border: 1px solid lightgray;
      border-left: none;
    }
    .SingleDatePickerInput {
      width: 100%;
      height: 55px;
      .DateInput {
        width: 100%;
        height: 55px;
        .DateInput_input {
          height: 55px;
          width: 100% !important;
          color: var(--darkBlue);
        }
        .DateInput_input__focused {
          border-bottom: 2px solid var(--darkBlue);
        }
      }
    }
    select,
    .SingleDatePickerInput {
      border-radius: 0;
      border-color: #333;
    }
    select {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .SingleDatePickerInput {
      overflow: hidden;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    select,
    input {
      &:disabled {
        color: var(--lightGray);
      }
    }
  }
  .book-tickets {
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 120px;
    gap: 10px;
    align-items: center;
    color: var(--darkBlue);
    .book-tickets-category {
      span {
        font-size: 1.3em;
        font-weight: 600;
      }
    }
  }
  .activity-price-categories {
    padding-bottom: 17px;
    margin-bottom: 17px;
    border-bottom: 3px solid #ececec;
  }
  .total-price-wrapper {
    display: grid;
    grid-template-columns: 1fr 100px;
    align-items: center;
    color: var(--darkBlue);
    .total-price-value {
      text-align: right;
      font-size: 1.4em;
      font-weight: 600;
    }
  }
  .pay-on-site {
    font-size: 0.9em;
    color: gray;
  }
  .normal-button {
    margin-top: 15px;
    width: 100%;
    height: 50px;
    font-size: 1.1em;
  }
  @media (max-width: 1000px) {
    .book-labels {
      display: none;
    }
    .activity-slots {
      grid-template-columns: 1fr;
      gap: 10px;
      select,
      .SingleDatePickerInput {
        border: 1px solid var(--darkBlue);
        border-radius: 10px;
      }
    }
  }
`;
