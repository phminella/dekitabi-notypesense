import styled from "styled-components";
export const ActivityHoursStyles = styled.div`
  position: relative;
  margin-bottom: 15px;
  overflow: hidden;
  .opening-hours-wrapper {
    position: relative;
    border-radius: 15px;
    border: 1px solid lightgray;
    overflow: hidden;
    .opening-hours {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 10px;
      align-items: center;
      border-bottom: 1px solid lightgray;
      font-size: 1.1em;
      background: var(--lightGray);
      &:last-child {
        border: none;
      }
      .weekday {
        display: flex;
        align-items: center;
        /* background-color: #ececec; */
        font-weight: 600;
        justify-content: center;
        height: 100%;
        padding: 10px;
        border-right: 1px solid lightgray;
      }
      .time {
        padding: 7px;
        line-height: 1.8em;
      }
      @media (max-width: 500px) {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 0;
        .time,
        .weekday {
          padding: 3px 5px;
          border: none;
        }
      }
    }
  }
  .cancellation-policy {
    margin: 15px 0 10px 0;
    .days,
    .fee {
      text-align: center;
      padding: 10px;
      font-size: 0.9em;
    }
    .fee {
      text-align: left;
    }
    .days {
      font-weight: 600;
      border-right: 1px solid lightgray;
    }
    @media (max-width: 500px) {
      .fee,
      .days {
        padding: 3px 5px;
        text-align: center;
        border: none;
      }
    }
  }
`;
