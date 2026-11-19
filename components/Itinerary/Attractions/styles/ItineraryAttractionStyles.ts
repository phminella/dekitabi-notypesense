import styled from "styled-components";
export const ItineraryAttractionStyles = styled.div`
  position: relative;
  overflow: hidden;
  border-bottom: 1px dashed lightgray;
  padding: 3px 5px;
  background: white;
  &.fixed-attraction {
    border: 1px solid lightgray;
  }
  &.closed-attraction {
    .opening-hours {
      background: #ffa84b;
      color: white;
      border-radius: 5px;
      padding: 5px;
      img {
        filter: var(--whiteFilter) !important;
      }
    }
  }
  .attraction {
    display: grid;
    grid-template-columns: 90px 1fr;
    align-items: center;
    @media (hover: hover) and (pointer: fine) {
      a {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
    .attraction-time {
      position: absolute;
      top: 2px;
      left: 5px;
      span {
        font-weight: 600;
        /* color: white; */
      }
      .attraction-id {
        position: absolute;
        top: -2px;
        left: -5px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        z-index: 0;
        cursor: pointer;
        div {
          color: white;
        }
      }
      .attraction-id-pin {
        position: absolute;
        top: -2px;
        left: -5px;
        width: 30px;
        height: 30px;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: -250%;
        border: 3px solid white;
        background: var(--pink);
        transform: rotate(45deg);
        z-index: 0;
        &.selected-attraction {
          background: var(--darkBlue);
        }
      }
    }
    .attraction-image-bg {
      position: relative;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      z-index: 0;
      overflow: hidden;
      .attraction-image {
        position: relative;
      }
    }
    .attraction-description {
      overflow: hidden;
      h4 {
        color: var(--pink);
      }
      background: white;
      .attraction-name {
        color: var(--blue);
        text-transform: capitalize;
        display: inline-block;
        gap: 5px;
        line-height: 1.1em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: calc(100% - 60px);
        font-weight: 600;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--darkBlue);
          }
        }
      }
      .attraction-name-no-link {
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--blue);
          }
        }
      }
      .attraction-itinerary-wrapper {
        display: inline-flex;
        align-items: center;
        flex-wrap: wrap !important;
        gap: 5px;
        margin: 5px 0;
        padding-right: 30px;
      }
      .attraction-itinerary {
        display: inline-flex;
        gap: 2px;
        background: var(--darkBlue);
        border-radius: 5px;
        color: white;
        padding: 3px 5px;
        font-size: 1em;
        img {
          filter: var(--whiteFilter);
        }
        &.attraction-itinerary-spinner {
          padding: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          margin-bottom: 3px;
          img {
            filter: none;
          }
        }
      }
      .attraction-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 2px;
        font-size: 0.9em;
        img {
          filter: invert(19%) sepia(0%) saturate(1960%) hue-rotate(263deg)
            brightness(87%) contrast(70%);
        }
      }
    }
  }
  &.guide-styles {
    &.closed-attraction {
      .opening-hours {
        background: #fa4157;
      }
    }
  }
`;
