import styled from "styled-components";
export const HeaderItineraryStyles = styled.div`
  position: relative;
  border-radius: 5px;
  padding: 10px;
  border-radius: 5px;
  z-index: 0;
  background: white;
  margin: 1px;
  p {
    max-width: 240px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  @media (hover: hover) and (pointer: fine) {
    :hover {
      background-color: var(--lightGray);
      outline: 1px dashed lightgray;
      .itinerary-delete,
      .itinerary-view {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
  &.dragging {
    opacity: 0.9;
    outline: 1px dashed lightgray;
    border-radius: 5px;
  }
  .itinerary-options {
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 1;
  }
  .itinerary-delete,
  .itinerary-view {
    position: absolute;
    top: 5px;
    right: 45px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (hover: hover) and (pointer: fine) {
      transform: scale(0);
      transition: 0.2s all ease-in-out;
      opacity: 0;
    }
    background: #ff2e4a;
    z-index: 1;
    width: 30px;
    height: 30px;
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--darkBlue);
      }
    }
  }
  .itinerary-view {
    right: 10px;
    background: var(--blue);
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--darkBlue);
      }
    }
  }
  .itinerary-delete-loading {
    background: var(--blue);
    cursor: default;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--blue);
      }
    }
  }
`;
