import styled from "styled-components";
export const RequestAvailabilityButtonStyles = styled.div`
  position: relative;
  .plugin,
  .title {
    display: grid;
    grid-template-columns: 20px 1fr;
    padding: 10px;
    background: var(--darkBlue);
    text-align: left;
    font-size: 1.1em;
    color: white;
    img {
      margin-top: 3px;
      filter: var(--whiteFilter);
    }
  }
  .title {
    display: block;
    text-align: center;
    color: white;
    background: var(--blue);
    padding: 20px 10px;
    font-size: 1.2em;
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
    top: 0;
    right: 0;
    width: 100%;
    input {
      width: 100%;
      height: 40px;
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
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      overflow: hidden;
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
