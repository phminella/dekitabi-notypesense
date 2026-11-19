import styled from "styled-components";
export const SuggestedAttractionsStyles = styled.div`
  margin: 20px 0 20px 0;
  width: 100%;
  position: relative;
  .home-popular-attractions {
    background-color: white !important;
  }
  .right-arrow,
  .left-arrow {
    top: -25px;
  }
  h2 {
    margin-bottom: 15px;
    @media (max-width: 500px) {
      margin-bottom: 55px;
    }
    .see-more {
      color: var(--blue);
      text-decoration: underline;
      font-size: 15px;
      font-weight: 400;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  .itinerary-wrapper {
    margin: 0 !important;
  }
  .attractions-wrapper {
    position: relative;
    .scroll-container {
      width: 100%;
      position: relative;
      display: flex;
      gap: 10px;
      cursor: grab;
      scroll-behavior: smooth;
      a {
        overflow: hidden;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--blue);
          }
        }
        span {
          display: none;
        }
      }
    }
  }
  .tour {
    max-width: 220px !important;
    min-width:220px !important;
    font-size: 0.9em;
    overflow: hidden;
    .swiper {
      width: 220px;
      height: 220px;
    }
  }
`;
