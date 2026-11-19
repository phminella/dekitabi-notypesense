import styled from "styled-components";
export const ItineraryDetailsStyles = styled.div`
  position: sticky;
  top: 60px;
  background-color: white;
  .hide-details {
    position: absolute;
    top: 10px;
    right: 10px;
    margin: 0 auto;
    @media (max-width: 500px) {
      right: 0;
      left: 0;
    }
    max-width: 100px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      transform: rotate(180deg);
      transition: all 0.2s ease-in-out;
    }
    &.hidden {
      max-width: 100%;
      img {
        transform: rotate(0deg);
      }
    }
  }
  .itinerary-details-content {
    position: relative;
    padding: 10px;
    border: 1px solid lightgray;
    border-top: 4px solid var(--darkBlue);
    max-height: 500px;
    opacity: 1;
    &.hidden {
      max-height: 40px;
      div {
        opacity: 0;
      }
    }
    &.booked {
      .with-guide {
        @media (min-width: 500px) {
          justify-content: right !important;
        }
      }
    }
    .itinerary-header {
      width: 100%;
      .itinerary-details-header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      &.with-guide {
        border-bottom: 1px solid lightgray;
        padding-bottom: 15px;
        margin-bottom: 15px;
      }
    }
    &.guide-details {
      .itinerary-header {
        border: none;
        padding: 0;
        margin: 0;
      }
    }
  }
  .itinerary-person-wrapper {
    margin: 10px 0;
    select {
      max-width: 100% !important;
    }
  }
  .view-tour-details {
    background: var(--blue);
    color: white;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--darkBlue);
      }
    }
  }
  .booked {
    .itinerary-details-guide {
      justify-content: left;
    }
    .guide-title {
      display: none;
    }
    .primary-language {
      margin-top: 2px;
    }
    .booked-date {
      display: flex;
    }
  }
  &.no-selected-guide {
    .hide-details {
      position: absolute;
      top: 10px;
      right: 10px !important;
      left: unset !important;
    }
    .itinerary-details-header {
      grid-template-columns: 1fr !important;
    }
  }
`;
