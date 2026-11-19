import styled from "styled-components";
export const ChatBoxStyles = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 0;
  font-size: 1.1em;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  &.show {
    visibility: visible;
    opacity: 1;
    max-height: 1500px;
  }
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    background: var(--blue);
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
      }
    }
  }
  .chat-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 337px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chat-box {
    width: 100%;
    height: 337px;
    overflow-y: auto;
    padding: 15px 10px 10px 10px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    .sent {
      flex: 1;
      text-align: right;
      font-size: 0.7em;
      line-height: 1em;
      color: darkgray;
    }
    &.show {
      opacity: 1;
    }
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      background: lightgray;
      border-radius: 2px;
    }
    .chat-date {
      text-align: center;
      font-size: 0.9em;
      padding: 5px 0;
      font-weight: 600;
    }
    .chat-message {
      display: flex;
      align-items: start;
      gap: 10px;
      margin: 10px 0;
      &.from-right {
        justify-content: right;
      }
      p {
        border-radius: 10px;
        padding: 7px;
        max-width: 250px;
        word-wrap: break-word;
        display: inline-block;
        white-space: pre-line;
        span {
          font-size: 0.6em;
          font-weight: 600;
        }
        a {
          color: var(--blue) !important;
        }
        &.from-me {
          border-bottom-right-radius: 0;
          background: #e8e8e8;
          svg {
            margin-left: 3px;
          }
        }
        &.from-them {
          border-bottom-left-radius: 0;
          background: var(--lightGray);
        }
      }
    }
  }
`;
