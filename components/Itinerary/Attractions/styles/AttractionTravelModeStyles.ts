import styled from "styled-components";
export const AttractionTravelModeStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  .transit-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-direction: row;
  }
  .travel-mode-button {
    order: 2;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background: var(--lightGray);
    gap: 5px;
    font-size: 0.8em;
    border-radius: 50%;
    display: none;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--blue);
        color: white;
        img {
          filter: var(--whiteFilter) !important;
        }
      }
    }
    &.active {
      display: flex;
      order: 1;
      background: var(--darkBlue);
      border: 3px solid white;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      cursor: default;
      color: white;
      cursor: pointer;
      img {
        filter: var(--whiteFilter) !important;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: var(--blue);
        }
      }
    }
  }
  .lunch-break-button {
    display: flex;
    &.active {
      /* background: var(--darkBlue); */
    }
  }
  a {
    line-height: 0.7em;
    flex-shrink: 0;
    .map-icon {
      filter: none !important;
      flex-shrink: 0;
    }
  }
  .transit-options-absolute {
    position: absolute;
    bottom: -10px;
    left: -10px;
    z-index: 9999;
    background: white;
    padding: 10px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    .travel-mode-button {
      display: flex;
    }
    .transit-wrapper {
      display: grid !important;
    }
  }
`;
