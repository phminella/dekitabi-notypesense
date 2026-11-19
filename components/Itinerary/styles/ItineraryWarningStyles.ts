import styled from "styled-components";
export const ItineraryWarningStyles = styled.div`
  .itinerary-info {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 10px;
    padding: 5px 10px 5px 10px;
    /* border: 2px solid #ffa84b; */
    color: var(--darkBlue);
    background: var(--lightGray);
    border-radius: 10px;
    margin-bottom: 12px;
    border: 2px solid #ededed;
    img {
      filter: invert(80%) sepia(17%) saturate(2708%) hue-rotate(322deg)
        brightness(103%) contrast(109%);
    }
    button {
      color: var(--blue);
      text-decoration: underline;
      font-size: 1em;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  &.guide-style {
    .itinerary-info {
      img {
        filter: invert(32%) sepia(57%) saturate(2444%) hue-rotate(331deg)
          brightness(106%) contrast(96%);
      }
    }
  }
`;
