import styled from "styled-components";
export const ChatListStyles = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
  overflow: hidden;
  &.show {
    max-height: 100%;
    visibility: visible;
    opacity: 1;
    overflow-y: auto;
    padding: 15px;
  }
  .chat-list-title {
    padding-bottom: 10px;
    border-bottom: 1px solid lightgray;
    color: var(--pink);
    font-weight: 600;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: white;
      }
    }
  }
  .not-found {
    max-width: 250px !important;
    overflow: hidden;
    div img {
      min-width: 0;
    }
  }
  .chat-list {
    position: relative;
    height: 339px;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: white;
    }
    &::-webkit-scrollbar-thumb {
      background: lightgray;
    }
    .no-chats {
      height: 100%;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 1.1em;
    }
  }
  .chat-loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
