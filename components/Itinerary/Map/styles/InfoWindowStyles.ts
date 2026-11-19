import styled from "styled-components";
export const InfoWindowStyles = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  h3 {
    color: var(--pink);
  }
  .attraction {
    min-height: 150px;
    @media (hover: hover) and (pointer: fine) {
      a {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
    .attraction-image-bg {
      position: relative;
      height: 100%;
      width: 100%;
      z-index: -1;
    }
    .attraction-description {
      padding: 5px 10px;
      background: white;
      a {
        color: var(--blue);
        text-decoration: underline;
        &.attraction-name {
          text-transform: capitalize;
          font-weight: 600;
          outline: none;
        }
      }
      .attraction-item {
        display: flex;
        align-items: center;
        gap: 5px;
        b {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 95px;
          font-weight: 600;
        }
        p,
        a {
          margin: 0;
          white-space: pre-line; /* CSS 3.0 */
        }
        img {
          filter: invert(19%) sepia(0%) saturate(1960%) hue-rotate(263deg)
            brightness(87%) contrast(70%);
        }
      }
    }
  }
  .attraction {
    grid-template-columns: 1fr;
    .attraction-image-bg {
      height: 150px;
      border-bottom-left-radius: 0;
    }
    .attraction-name {
      width: 100%;
    }
    .attraction-description {
      display: flex;
      flex-wrap: wrap;
      gap: 0 5px;
      span {
        flex-shrink: 0;
      }
    }
  }
  .meeting-place {
    padding: 5px 10px;
    background: white;
  }
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    filter: var(--whiteFilter);
  }
  .add-to-itinerary-button {
    display: none;
    background: var(--blue);
    width: calc(100% - 20px) !important;
    z-index: 1;
    border-radius: 10px;
    img {
      filter: var(--whiteFilter);
      width: 25px !important;
      height: 25px !important;
    }
    color: white;
    justify-content: center;
    align-items: center;
    margin: 5px 10px 10px 10px;
    padding: 10px;
  }
`;
