import styled from "styled-components";

export const ChatStyles = styled.div`
  .new-message {
    position: fixed;
    top: -100px;
    opacity: 0;
    visibility: hidden;
    background: var(--blue);
    color: white;
    padding: 20px;
    border-radius: 10px;
    font-size: 1.1em;
    transition: all 0.5s ease-in-out;
    z-index: 1;
    right: 0;
    left: 0;
    margin: 0 auto;
    max-width: 200px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    p {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    img {
      filter: var(--whiteFilter);
    }
    &.show {
      top: 70px;
      opacity: 1;
      visibility: visible;
    }
  }
  .shuffle-chat {
    position: fixed;
    right: 30px;
    @media screen and (max-width: 800px) {
      right: 15px;
    }
    bottom: 30px;
    border-radius: 50px;
    width: 60px;
    height: 60px;
    background: var(--blue);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    transition: 0.3s all ease-in-out;
    img {
      filter: var(--whiteFilter);
    }
    .MuiBadge-badge {
      background: var(--pink);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        transform: rotate(360deg);
      }
    }
    &.pwa-icon {
      background: none;
      bottom: 33px;
      right: 23px;
      height: 30px;
      width: 30px;
      img {
        filter: var(--darkBlue);
      }
    }
  }
  .chat-open {
    position: fixed;
    right: 30px;
    @media (max-width: 400px) {
      right: 5px;
      margin-left: 5px;
    }
    @media (max-width: 400px) {
      width: calc(100vw - 10px);
    }
    bottom: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    z-index: 8;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: 0.3s all ease-in-out;
    &.show {
      opacity: 1;
      max-height: 500px;
    }
    .chat-notification {
      width: 20px;
      height: 20px;
      border-radius: 50px;
      background: #1976d2;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .window-bar {
      position: relative;
      background: var(--blue);
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      color: white;
      width: 330px;
      @media (max-width: 400px) {
        width: calc(100vw - 10px);
      }
      .window-bar-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;
        height: 60px;
        padding: 10px 20px;
        span {
          color: #ffaa33;
        }
        .chat-close {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 12px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin: 0 !important;
            filter: var(--whiteFilter);
          }
        }
        .last-visit {
          font-size: 0.8em;
          color: white;
          flex: 100%;
        }
      }
    }
    .chat-wrapper {
      position: relative;
      width: 330px;
      height: 400px;
      @media (max-width: 400px) {
        width: calc(100vw - 10px);
      }
      .chat-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        z-index: 1;
        @media (max-width: 400px) {
          width: calc(100vw - 10px);
        }
      }
    }
  }
`;
