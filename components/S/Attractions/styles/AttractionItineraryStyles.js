import styled from "styled-components";
export const AttractionItineraryStyles = styled.div`
  .attraction-itinerary {
    overflow: hidden;
    background: white;
    max-width: 350px;
    border-radius: 10px;
    transition: margin 0.2s ease-in-out;
    font-size: 1.1em;
    .attraction-added {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--blue);
      border-radius: 10px;
      display: grid;
      align-items: center;
      justify-content: center;
      z-index: 5;
      margin-left: -100%;
      transition: margin 0.2s ease-in-out;
      h2 {
        color: white;
      }
      img {
        margin-bottom: 15px;
        filter: var(--whiteFilter);
      }
      &.added {
        margin: 0;
      }
      .attraction-added-content {
        text-align: center;
      }
    }
    .attraction-itinerary-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 20px 0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: white;
      font-weight: 600;
      background: var(--darkBlue);
      img {
        filter: var(--whiteFilter);
      }
    }
    .add-to-itinerary-wrapper {
      padding: 0 20px;
      .add-to-itinerary-msg {
        margin-top: 10px;
      }
      .new-itinerary {
        margin: 10px 0 10px 0;
        background: var(--blue);
        color: white;
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 1.1em;
        img {
          filter: var(--whiteFilter);
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background: var(--darkBlue);
          }
        }
      }
      .new-itinerary-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        width: 100%;
        img {
          filter: var(--blueFilter);
        }
      }
      ul {
        max-height: 200px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        &::-webkit-scrollbar-thumb {
          background: lightgray;
          border-radius: 5px;
        }
        li {
          position: relative;
          margin: 10px 0;
          width: 100%;
          min-height: 50px;
          padding: 0 10px;
          background: var(--lightGray);
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
          overflow: hidden;
          .itinerary-list-text {
            color: var(--pink);
          }
          .add-to-itinerary-button {
            display: inline-block;
            gap: 5px;
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: calc(100% - 60px);
          }
          img {
            filter: var(--pinkFilter);
          }
          span {
            flex-shrink: 0;
          }
          .itinerary-list-button,
          .remove-attraction-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--blue);
            width: 30px;
            height: 30px;
            border-radius: 30px;
            margin-left: 10px;
            line-height: 0.9em;
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
      }
    }
  }
`;
