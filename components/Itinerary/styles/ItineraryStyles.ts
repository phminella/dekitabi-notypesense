import styled from "styled-components";
export const ItineraryStyles = styled.div`
  margin-bottom: 50px;
  .itinerary-titles {
    color: var(--darkBlue);
    font-size: 2em;
  }
  .itinerary-tutorial {
    position: absolute;
    top: calc(100% + 15px);
    left: 0;
    background: white;
    padding: 10px;
    border-radius: 15px;
    font-size: 1.1em;
    font-weight: 400;
    z-index: 9998;
    border: 3px solid white;
    min-width: 250px;
    max-width: 350px;
    text-align: left;
    text-transform: none;
    border-radius: 10px;
    color: var(--darkBlue);
    h3 {
      margin-bottom: 5px;
      /* color: white; */
    }
    p {
      display: flex;
      gap: 5px;
      flex-wrap: nowrap;
      align-items: start;
      margin: 0;
      img {
        filter: var(--pinkFilter) !important;
        margin-top: 3px;
      }
    }
    ul {
      li {
        display: flex;
        gap: 5px;
        margin-bottom: 3px;
        &:last-child {
          margin-bottom: 0;
        }
        img {
          filter: var(--pinkFilter);
        }
      }
    }
  }
  .no-attractions-wrapper {
    .close-icon-2 {
      display: none;
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
    right: 30px;
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
    @media screen and (max-width: 800px) {
      right: 15px;
    }
    z-index: 0;
    &.pwa {
      top: 70px;
    }
    &.hide {
      display: none;
    }
    &.hide-map {
      top: 70px;
      left: 15px;
    }
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
      }
    }
  }
  &.no-scrollbar {
    height: 10vh !important;
    overflow-y: hidden !important;
  }
  .itinerary-wrapper {
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    position: relative;
    gap: 10px;
    margin: 0 10px;
    .itinerary-list-header {
      background: var(--lightGray);
      padding: 10px;
      border-radius: 10px;
    }
    .see-tutorial {
      font-size: 1.1em;
      color: var(--blue);
      text-decoration: underline;
      margin-bottom: 15px;
      &:hover {
        color: var(--darkBlue);
      }
    }
    /* .show-itinerary-video {
      margin-bottom: 15px;
      .show-video-button {
        font-size: 1.1em;
        img {
          display: none;
        }
      }
    } */
    // Itinerary Draggable
    .itinerary-attractions-wrapper {
      display: grid;
      position: relative;
      grid-template-columns: 350px 1fr;
      width: 100%;
      gap: 10px;
      .itinerary-attractions-list {
        position: relative;
        width: 100%;
        border-radius: 10px;
        .itinerary-wrapper-2 {
          padding: 20px 0;
        }
      }
      .travel-mode-input {
        border: 1px solid lightgray;
        max-width: 76px;
        padding: 0 10px;
        height: 25px;
        ::placeholder {
          font-size: 0.7em !important;
        }
      }
      .edit-travel-mode {
        img {
          filter: var(--whiteFilter);
        }
      }
      .edit-travel-mode {
        width: 25px;
        height: 25px;
        padding: 6px;
      }
      .edit-refresh {
        padding: 3px;
      }
      .drag-drop-wrapper {
        width: 100%;
        position: relative;
        /* overflow: hidden; */
        .drag-drop {
          width: 100%;
          position: relative;
          /* overflow: hidden; */
          .draggable-item {
            &:last-child {
              border-bottom: 1px dashed #ddd;
            }
          }
        }
      }
    }
    .transit-time-line {
      margin-left: 40px;
      height: 15px;
      width: 13px;
      background: lightgray;
    }
    .itinerary-attraction-transit-time {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      margin-left: 26px;
      img {
        margin-top: -2px;
        filter: invert(19%) sepia(0%) saturate(1960%) hue-rotate(263deg)
          brightness(87%) contrast(70%);
      }
    }
    .itinerary-map {
      position: relative;
      max-width: 100%;
      &.hide {
        display: none;
      }
    }
  }
  .itinerary-main {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .policies-modal {
    .modal-wrapper {
      padding: 0;
      .close-icon {
        right: 30px;
      }
    }
  }
`;
