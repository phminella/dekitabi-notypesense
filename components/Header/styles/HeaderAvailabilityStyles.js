import styled from "styled-components";
export const HeaderAvailabilityStyles = styled.div`
  position: relative;
  .availability-reminder {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background-color: var(--lightGray);
    padding: 10px;
    min-width: 300px;
    @media (max-width: 450px) {
      position: fixed;
      top: 70px;
      right: 0;
      min-width: calc(100vw - 40px);
      margin: 0 20px;
    }
    border-radius: 15px;
    border: 1px solid var(--darkBlue);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    align-items: start;
    gap: 5px;
    z-index: 1;
    img {
      margin-top: 3px;
      filter: var(--darkBlueFilter) !important;
    }
    .availability-message {
      border-left: 1px solid lightgray;
      padding-left: 8px;
    }
    .buttons {
      margin-top: 5px;
      display: flex;
      gap: 10px;
      justify-content: right;
      button {
        color: var(--blue);
        text-decoration: underline;
        text-transform: capitalize;
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  .rmdp-calendar-container-mobile {
    background-color: rgba(25, 118, 210, 0.5);
    transition: all 0.3s ease-in-out;
  }
  .rmdp-border-bottom {
    border: none;
  }
  .calendar {
    position: absolute;
    top: -33px;
    right: 0;
    input {
      height: 30px;
      cursor: pointer;
      opacity: 0;
    }
    .rmdp-shadow,
    .rmdp-ep-shadow:after {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
    .rmdp-week-day {
      color: var(--pink) !important;
    }
    @media (hover: hover) and (pointer: fine) {
      .rmdp-day span {
        &:hover {
          background: #1976d2 !important;
          border-radius: 10px !important;
        }
      }
    }
    .rmdp-arrow {
      border: solid var(--darkBlue);
      border-width: 0 2px 2px 0;
    }
    .rmdp-wrapper {
      width: 320px !important;
      div {
      }
    }
    .rmdp-arrow-container {
      align-items: center;
      z-index: 1;
      i {
        margin-top: 0;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: var(--darkBlue);
          border-radius: 10px !important;
          .rmdp-arrow {
            border: solid white;
            border-width: 0 2px 2px 0;
            box-shadow: 0 0 3px var(--darkBlue);
          }
        }
      }
    }
    .rmdp-today span {
      border-radius: 10px !important;
      background: #1976d2 !important;
    }
    @media (hover: hover) and (pointer: fine) {
      .rmdp-day-hidden span {
        &:hover {
          background: none !important;
        }
      }
    }
    .rmdp-selected .sd {
      background-color: var(--darkBlue) !important;
      color: white;
      box-shadow: none !important;
      border-radius: 10px !important;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--pink) !important;
        }
      }
    }
    .rmdp-action-buttons {
      background: var(--lightGray);
      .rmdp-action-button {
        &:first-child {
          color: var(--blue);
          font-weight: 600;
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              color: var(--darkBlue);
            }
          }
        }
        &:last-child {
          background: var(--blue);
          color: white;
          border-radius: 5px;
          font-weight: 400;
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--darkBlue);
            }
          }
        }
      }
    }
    .rmdp-day-picker {
      display: block !important;
      margin: 0 !important;
    }
    .rmdp-top-class,
    .rmdp-calendar,
    .rmdp-day-picker,
    .rmdp-wrapper {
      width: 100% !important;
      max-width: 330px;
    }
    .rmdp-calendar-container-mobile {
      transition: all 0.3s ease-in-out;
    }
  }
`;
