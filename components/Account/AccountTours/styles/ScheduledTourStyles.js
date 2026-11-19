import styled from "styled-components";
export const ScheduledTourStyles = styled.li`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: var(--lightGray);
  display: grid;
  grid-template-columns: 200px 1fr;
  overflow: hidden;
  .tour-image {
    position: relative;
    min-height: 150px;
  }
  a {
    color: var(--blue);
  }
  .auto-cancel {
    color: #ff892f;
    padding: 4px 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    border-bottom: 1px solid white;
    .time-left {
      padding: 3px;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }
    img {
      filter: invert(78%) sepia(49%) saturate(5498%) hue-rotate(337deg)
        brightness(103%) contrast(103%);
    }
    &.time-to-tour {
      color: #21562d;
      border-bottom: 1px solid white;
      img {
        filter: invert(41%) sepia(5%) saturate(3252%) hue-rotate(81deg)
          brightness(97%) contrast(80%);
      }
      .time-left-to-tour {
        display: flex;
        align-items: center;
        padding: 3px;
        border-radius: 5px;
      }
    }
    &.time-to-transfer {
      border-bottom: 1px solid white;
      color: #422752;
      img {
        filter: invert(15%) sepia(10%) saturate(4205%) hue-rotate(236deg)
          brightness(95%) contrast(89%);
      }
    }
  }
  .tour-wrapper {
    display: grid;
    grid-template-columns: 1fr 300px;
    padding: 5px 10px;
    .left-side {
      a {
        text-decoration: underline;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--darkBlue);
          }
        }
      }
      .tour-details {
        h3 span {
          color: var(--pink);
          margin-right: 5px;
        }
      }
      .tour-time {
        display: flex;
        align-items: center;
        gap: 5px;
        padding-top: 5px;
        border-radius: 10px;
        flex-wrap: wrap;
        font-size: 0.9em;
        img {
          filter: var(--pinkFilter);
        }
      }
      .meeting-place {
        margin-top: 5px;
      }
      .traveler {
        margin-top: 5px;
        display: inline-flex;
        background-color: white;
        padding: 2px 5px;
        border-radius: 5px;
        border: 1px solid lightgray;
        font-size: 0.9em;
        text-decoration: none;
        color: var(--darkBlue);
        &:hover {
          background-color: var(--lightGray);
        }
      }
    }
    .right-side {
      text-align: right;
      .tour-details,
      .tour-status {
        justify-content: right;
        text-transform: capitalize;
      }
      .normal-button {
        align-items: start;
        justify-content: left;
        text-align: left;
        background: #ff2e4a;
        min-height: 40px;
        min-width: 100px;
        img {
          margin-top: 3px;
        }
      }
      .accept-tour {
        background: #03c03c;
      }
      .review-tour {
        background: var(--blue);
        float: right;
        color: white;
      }
      .normal-button,
      .accept-tour,
      .review-tour {
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background: var(--darkBlue);
          }
        }
      }
      .loading {
        cursor: default;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background: #08b802;
          }
        }
      }
      .tour-status p {
        padding: 5px;
        border-radius: 5px;
        display: flex;
        text-align: left;
        align-items: start;
        gap: 5px;
        margin-bottom: 10px;
        padding: 5px 10px;
        img {
          margin-top: 3px;
        }
        &.pending {
          background: orange;
          color: white;
          img {
            filter: var(--whiteFilter);
          }
        }
        &.confirmed {
          background: #32de84;
          color: white;
          img {
            filter: var(--whiteFilter);
          }
        }
        &.waiting-review {
          background: #cce5ff;
          color: #422752;
          img {
            filter: invert(15%) sepia(10%) saturate(4205%) hue-rotate(236deg)
              brightness(95%) contrast(89%);
          }
        }
        &.completed {
          background: #d1ecf1;
          img {
            filter: invert(13%) sepia(37%) saturate(4875%) hue-rotate(201deg)
              brightness(93%) contrast(95%);
          }
        }
      }
    }
  }
  .language {
    filter: none !important;
  }
`;
