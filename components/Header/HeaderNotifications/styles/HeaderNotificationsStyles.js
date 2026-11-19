import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
from { opacity: 0;
    transform: scale(0);  }
    to   { opacity: 1;
      transform: scale(1); }`;
export const HeaderNotificationsStyles = styled.div`
  position: relative;
  .modal-wrapper {
    padding: 0 !important;
  }
  .loading-notifications {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }
  .notifications {
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
    z-index: 8;
    transform-origin: top right;
    animation: ${fadeIn} 0.2s;
    .close-icon {
      position: absolute;
      top: 14px;
      right: 10px;
      z-index: 1;
    }
    .notifications-ul {
      display: block !important;
      max-height: 250px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: white;
      }
      &::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 3px;
      }
      .notifications-li {
        padding: 15px;
        padding-bottom: 5px;
        position: relative;
        .remove-notification {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 2;
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              img {
                filter: var(--pinkFilter);
              }
            }
          }
        }
        &.li-tour {
          background: var(--lightGray);
          border-bottom: 2px solid white;
        }
        &:last-child {
          padding-bottom: 15px;
        }
        .notification-date {
          color: gray;
          font-size: 0.8em;
          text-align: right;
        }
      }
    }
    .remove-all {
      padding: 15px 15px 15px 15px;
      border-top: 1px solid var(--lightGray);
      font-weight: 600;
      text-align: right;
      button {
        color: var(--blue);
        text-decoration: underline;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--darkBlue);
          }
        }
      }
    }
  }
`;
