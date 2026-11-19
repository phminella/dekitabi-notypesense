import styled from "styled-components";
export const BecomeGuideCompetitionStyles = styled.div`
  margin: 40px 0;
  @media (max-width: 900px) {
    margin: 10px 0 10px 0;
  }
  .table {
    width: 100%;
    display: grid;
    gap: 10px 0;
    background-color: var(--lightGray);
    border: 3px solid var(--darkBlue);
    padding: 10px;
    border-radius: 20px;
    grid-template-columns: 100px 1fr 1fr 1fr 1fr;
    font-size: 1.2em;
    color: var(--darkBlue);
    .column {
      min-width: 80px;
    }
    .label {
      font-size: 0.8em;
      text-align: center;
    }
    .row {
      height: 90px;
      border-bottom: 1px solid lightgray;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      b {
        font-size: 1.2em;
      }
      .get-your-guide {
        max-width: 50px;
      }
      &:last-child {
        border: none;
      }
    }
    @media (max-width: 500px) {
      display: block;
      .column {
        display: grid;
        justify-content: center !important;
        align-items: center !important;
        grid-template-columns: 0.7fr 1.3fr;
        border-bottom: 1px solid lightgray;
        &:last-child {
          border: none;
        }
      }
      .row {
        display: grid;
        justify-content: center !important;
        align-items: center !important;
        height: 80px;
        font-size: 0.9em;
        border: none;
        &.label {
          text-align: center;
        }
      }
    }
  }
`;
