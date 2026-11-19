import styled from "styled-components";
export const HomeItinerariesStyles = styled.div`
  max-width: 1200px;
  position: relative;
  width: 100%;
  margin: 0 auto 30px auto;
  .itineraries {
    @media (min-width: 500px) {
      margin-bottom: 12px !important;
    }
  }
  .right-arrow,
  .left-arrow {
    top: -30px;
    @media (max-width: 500px) {
      top: -30px !important;
    }
  }
  .scroll-container {
    position: relative;
    display: flex;
    gap: 10px;
    cursor: grab;
    .itinerary-wrapper {
      position: relative;
      width: 280px;
      .tour,
      .tour-skeleton {
        margin-bottom: 0px;
        min-width: 280px;
      }
      &.from-itinerary {
        width: 220px;
        .tour,
        .tour-skeleton {
          margin-bottom: 0px;
          min-width: 220px;
        }
      }
    }
    .show-more {
      display: flex;
      align-self: center;
      justify-content: center;
      min-width: 50px;
      height: 284px;
      background-color: #ebedef;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      transition: background-color 0.8s ease-in-out;
      &:hover {
        background-color: lightgray;
      }
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 284px;
      }
    }
  }
`;
