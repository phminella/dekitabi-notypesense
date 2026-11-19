import styled from "styled-components";
export const ProfileAvailabilityStyles = styled.div`
  max-width: 320px !important;
  .availability-title {
    font-size: 1.1em;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    background: var(--blue);
    padding: 20px 55px 20px 20px;
    color: white;
    img {
      filter: var(--whiteFilter);
    }
  }
  .rmdp-left,
  .rmdp-right {
    z-index: 3;
    margin: 0;
    top: 55%;
    border-radius: 5px !important;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
        box-shadow: none;
        i {
          margin-top: 8px;
        }
      }
    }
  }
  .rmdp-wrapper {
    width: 100% !important;
    @media (min-width: 530px) {
      min-width: 280px;
    }
    box-shadow: none !important;
    .rmdp-calendar {
      border-radius: 10px;
      .rmdp-week-day {
        color: lightgray;
        font-size: 1.05em;
      }
    }
    div {
      position: relative !important;
      transform: translate(0) !important;
      width: 100% !important;
      box-shadow: none !important;
      visibility: visible !important;
      .rmdp-selected {
        .sd {
          background: var(--pink) !important;
          box-shadow: none;
          border-radius: 5px;
        }
      }
      .rmdp-today {
        color: white;
        box-shadow: none;
        .sd {
          background: #1976d2 !important;
          border-radius: 5px;
        }
      }
      .rmdp-day {
        .sd {
          cursor: default !important;
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              color: white;
              background: var(--pink) !important;
              box-shadow: none;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
  .availability-label {
    padding: 10px 20px 20px 20px;
    flex-wrap: wrap;
    .available-label {
      background: var(--pink);
      width: 20px;
      height: 20px;
      border-radius: 5px;
      flex-shrink: 0;
    }
    .today-label {
      background: #1976d2;
      width: 20px;
      height: 20px;
      border-radius: 5px;
      flex-shrink: 0;
    }
  }
  .availability-update {
    padding: 20px;
    background-color: var(--lightGray);
    text-align: right;
  }
  .request {
    padding: 10px;
    background: orange;
    color: white;
    display: grid;
    grid-template-columns: 20px 1fr;
    img {
      margin-top: 3px;
      filter: var(--whiteFilter);
    }
  }
`;
