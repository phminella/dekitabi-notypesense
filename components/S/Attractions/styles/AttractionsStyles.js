import styled from "styled-components";
export const AttractionsStyles = styled.div`
  .attractions-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    .attractions-list {
      position: relative;
      overflow: hidden;
      margin: 0 20px;
      .attraction-update {
        display: inline-block;
        margin-top: 15px;
        color: var(--darkBlue);
        border-radius: 5px;
        border: 1px solid lightgray;
        background: var(--lightGray);
        padding: 5px;
        img {
          margin-top: 2px;
          filter: var(--pinkFilter);
        }
        p {
          display: flex;
          gap: 4px;
          align-items: start;
        }
      }
      .found {
        margin: 20px 0;
        font-weight: 600;
      }
      .show-itinerary-video {
        margin-top: 10px;
      }
      .result-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        border-radius: 10px;
        align-items: center;
        margin-bottom: 20px;
        img {
          filter: var(--darkBlueFilter);
        }
        .per-page {
          display: flex;
          align-items: center;
          justify-content: right;
          gap: 10px;
          button {
            background: var(--lightGray);
            height: 28px;
            width: 28px;
            border-radius: 10px;
            color: gray;
            &.active {
              background: var(--blue);
              color: white;
            }
          }
        }
      }
      .found {
        display: flex;
        align-items: center;
        gap: 5px;
        color: var(--darkBlue);
        font-size: 1.1em;
      }
      .pagination {
        margin-top: 35px;
        display: flex;
        justify-content: center;
        button {
          font-size: 1.1em;
        }
        .Mui-selected {
          background: var(--blue);
          color: white;
        }
      }
      .attraction-list-wrapper {
        position: relative;
        gap: 10px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        &.empty {
          grid-template-columns: 1fr;
        }
      }
    }
    .attractions-map {
      position: relative;
    }
  }
  .show-map {
    background: var(--blue);
    border-radius: 50px;
    width: 60px;
    height: 60px;
    display: none;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 100px;
    right: 15px;
    z-index: 1;
    &.first-time {
      animation: glow 3s infinite;
    }
    @keyframes glow {
      0% {
        background-color: var(--blue);
      }
      50% {
        background-color: var(--pink);
      }
      100% {
        background-color: var(--blue);
      }
    }
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
      }
    }
    @media screen and (max-width: 800px) {
      display: flex;
    }
  }
  .close-icon {
    top: 13px !important;
    img {
      filter: var(--pinkFilter) !important;
      z-index: 0 !important;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        img {
          filter: var(--whiteFilter) !important;
        }
      }
    }
  }
`;
