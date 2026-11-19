import styled from "styled-components";
export const ItineraryAlertStyles = styled.div`
  .error-icon {
    position: fixed;
    left: 20px;
    bottom: 30px;
    width: 55px;
    height: 55px;
    background: #ffa84b;
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    &.pwa-position {
      bottom: 100px;
    }
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: orange;
      }
    }
    .error-number {
      width: 25px;
      height: 25px;
      border-radius: 50px;
      position: absolute;
      top: -7px;
      right: -7px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: orange;
      font-weight: 600;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    transform: scale(0);
    transition: transform 0.2s ease-in-out;
    &.show-alert {
      transform: scale(1, 1);
    }
  }
  ul {
    li {
      background: var(--lightGray);
      padding: 10px;
      border-radius: 10px;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      h3 {
        border-bottom: 1px solid lightgray;
        padding-bottom: 10px;
        margin-bottom: 10px;
        display: flex;
        gap: 10px;
        img {
          filter: invert(80%) sepia(17%) saturate(2708%) hue-rotate(322deg)
            brightness(103%) contrast(109%);
        }
      }
      p {
        color: var(--darkBlue);
      }
    }
  }
  &.guide-styles {
    .error-icon {
      background: #fa2d4c;
      .error-number {
        background: #fa2d4c;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: #fa2d4c;
        }
      }
    }
    h2,
    h3 {
      img {
        filter: invert(32%) sepia(57%) saturate(2444%) hue-rotate(331deg)
          brightness(106%) contrast(96%);
      }
    }
  }
`;
