import styled from "styled-components";
export const ItineraryMeetingPlaceStyles = styled.div`
  cursor: pointer;
  position: relative;
  .loading {
    min-height: 80px;
  }
  .meeting-place-wrapper {
    position: relative;
    display: grid;
    align-items: center;
    grid-template-columns: 90px 1fr;
    border-radius: 10px;
    border: 1px solid var(--darkBlue);
    background-color: var(--lightGray);
    padding: 2px 5px;
    .meeting-place-photo {
      position: relative;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #b3e6f4;
      img {
        filter: var(--darkBlueFilter);
        width: 50%;
        height: 50%;
      }
    }
    .attraction-itinerary {
      margin-top: 5px;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: var(--darkBlue);
      border-radius: 5px;
      color: white;
      padding: 1px 3px;
      font-size: 0.9em;
      img {
        filter: var(--whiteFilter);
      }
    }
    .attraction-time {
      position: absolute;
      top: -2px;
      left: -5px;
      span {
        font-weight: 600;
        /* color: white; */
      }
      .attraction-id {
        position: absolute;
        top: 2px;
        left: 5px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: 600;
        cursor: pointer;
        z-index: 1;
      }
      .attraction-id-pin {
        position: absolute;
        top: 2px;
        left: 5px;
        width: 30px;
        height: 30px;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: -250%;
        border: 3px solid white;
        background: var(--pink);
        transform: rotate(45deg);
        z-index: 1;
      }
    }
    .meeting-place {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      max-width: 80%;
      a,
      .translate-button {
        color: var(--blue);
        text-decoration: underline;
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
    .meeting-place-title {
      color: var(--pink);
    }
    .meeting-place-delete {
      position: absolute;
      top: 0px;
      right: 0px;
      background: white;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        filter: var(--blueFilter);
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            filter: var(--purpleFilter);
          }
        }
      }
    }
  }
  .stop-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    .input-wrapper {
      position: relative;
      width: 100%;
      &.meeting-wrapper {
        margin-bottom: 20px;
      }
      &.end-wrapper {
        margin-top: 20px;
      }
      input {
        padding: 15px;
        height: 55px;
        border-radius: 10px;
        border: 1px solid lightgray;
        font-size: 1.1em;
      }
    }
    .submit-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--pink);
      height: 52px;
      width: 57px;
      border-radius: 10px;
      img {
        filter: var(--whiteFilter);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--darkBlue);
        }
      }
    }
  }
  .error {
    color: #ff2e4a;
    margin: 5px 0;
  }
  .selected {
    background: var(--darkBlue) !important;
  }
`;
