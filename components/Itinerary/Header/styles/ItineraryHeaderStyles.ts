import styled from "styled-components";
export const ItineraryHeaderStyles = styled.div`
  .itinerary-header {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    @media (max-width: 1240px) {
      margin: 0 10px;
    }
    border-radius: 10px;
    overflow: hidden;
    .attraction-image,
    .no-photo,
    .header-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .itinerary-header-wrapper {
      position: relative;
      display: grid;
      align-items: center;
      justify-content: left;
      grid-template-columns: 1fr 400px;
      grid-gap: 10px;
      min-height: 500px;
      margin: 0 auto;
      &.one-grid {
        grid-template-columns: 1fr !important;
      }
      .attraction-image {
        background-color: black;
        img {
          opacity: 0.9;
        }
      }
      .left-frame {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        padding: 0 40px;
        overflow: hidden;
        .header-buttons {
          position: absolute;
          top: 25px;
          left: 40px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          .view-all,
          .input-photos {
            background: white;
            border-radius: 5px;
            font-weight: 700;
            padding: 10px;
            color: var(--darkBlue);
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                background: var(--darkBlue);
                color: white;
              }
            }
          }
        }
      }
      .right-frame {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        cursor: pointer;
        .right-frame-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          &.one-grid {
            grid-template-columns: 1fr;
          }
        }
      }
      .left-frame,
      .right-frame-top,
      .right-frame-bottom-left,
      .right-frame-bottom-right {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
