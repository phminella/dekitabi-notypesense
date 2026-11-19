import styled from "styled-components";
export const ChatUserStyles = styled.div`
  position: relative;
  .chat-user-button {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 80% 20%;
    align-items: center;
    gap: 5px;
    height: 75px;
    padding: 0 10px;
    .chat-user {
      display: flex;
      align-items: center;
      gap: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 1.1em;
    }
  }
  .chat-arrow {
    position: absolute;
    top: 25px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: right;
    .chat-options {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .chat-notification {
      width: 25px;
      height: 25px;
      img {
        filter: var(--whiteFilter);
      }
      .spinner {
        filter: none;
      }
    }
    .chat-delete-wrapper {
      .chat-delete-confirm {
        position: absolute;
        background: #c60c30;
        z-index: 1;
        top: -25px;
        right: -155px;
        transition: right 0.3s ease-in-out;
        display: flex;
        &.show {
          right: -10px;
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-width: 50px;
          height: 75px;
          color: white;
          img {
            filter: var(--whiteFilter);
          }
          &:first-child {
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                background: darkred;
              }
            }
          }
          &:last-child {
            background-color: var(--lightGray);
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                background: lightgray;
              }
            }
            img {
              filter: var(--darkBlueFilter);
            }
          }
        }
      }
      .chat-delete {
        background: none;
        z-index: 5;
        img {
          filter: var(--blueFilter);
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            img {
              filter: var(--pinkFilter);
            }
          }
        }
      }
    }
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--lightGray);
    }
  }
`;
