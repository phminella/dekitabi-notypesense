import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
from { opacity: 0;
    transform: scale(0);  }
    to   { opacity: 1;
      transform: scale(1); }`;
export const HeaderItinerariesStyles = styled.div`
  position: relative;
  .itineraries {
    position: absolute;
    width: 380px;
    right: 0;
    top: 20px;
    background: white;
    border: 1px solid #ebebeb;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 5px;
    overflow: hidden;
    transform-origin: top right;
    animation: ${fadeIn} 0.2s;
    .close-icon {
      position: absolute;
      top: 15px;
      right: 10px;
      z-index: 1;
    }
    .itineraries-title {
      position: relative;
      padding: 15px;
      background: var(--lightGray);
      border-bottom: 1px solid lightgray;
      font-weight: 600;
    }
    .itineraries-wrapper {
      padding: 10px;
      .itinerary-create-wrapper {
        margin-bottom: 10px;
        .itinerary-create {
          width: 100%;
          background: var(--blue);
          color: white;
          height: 45px;
          justify-content: center;
          border-radius: 5px;
          img {
            filter: var(--whiteFilter);
          }
          &.create-loading {
            img {
              filter: none;
            }
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background-color: var(--darkBlue);
            }
            &.create-loading {
              &:hover {
                background-color: var(--blue);
              }
            }
          }
        }
      }
    }
  }
  .basic-modal {
    .close-icon {
      display: none;
    }
    .modal-wrapper {
      padding: 0;
    }
    .modal-title,
    .modal-message {
      padding: 20px 15px;
      border-radius: 10px;
    }
    .modal-title {
      color: white;
      font-weight: 600;
      background: #1a2b49;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      max-width: 100%;
      img {
        filter: var(--whiteFilter);
      }
    }
    .modal-message {
      padding: 15px;
    }
    span {
      color: var(--pink);
      font-weight: 600;
    }
    .modal-buttons {
      display: flex;
      align-items: center;
      justify-content: right;
      gap: 10px;
      padding: 0 15px;
      button,
      .fake-button {
        min-width: 100px;
        height: 45px;
      }
      .fake-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--blue);
        border-radius: 6px;
      }
    }
  }
  .itinerary-tutorial {
    /* text-align: right; */
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid lightgray;
  }
`;
