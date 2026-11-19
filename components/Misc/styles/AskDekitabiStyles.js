import styled from "styled-components";
export const AskDekitabiStyles = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: var(--darkBlue);
  font-size: 1.8em;
  line-height: 1.2em;
  font-weight: bold;
  border: 4px solid white;
  border-radius: 20px;
  max-width: 300px;
  width: 100%;
  z-index: 9999;
  background-color: var(--lightGray);
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  span {
    font-size: 0.7em;
    color: darkgray;
  }
  .reply-time {
    font-size: 0.4em;
    color: darkgray;
    font-weight: 400;
    line-height: 0.8em;
  }
  @media (max-width: 400px) {
    right: 0;
    margin: 0 10px;
    max-width: calc(100vw - 20px);
  }
  .close-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1;
  }
  .white-icon {
    filter: var(--darkBlueFilter);
  }
  .email-icon {
    filter: var(--pinkFilter);
  }
  .text-wrapper {
    position: relative;
    padding: 15px 40px 15px 15px;
    overflow: hidden;
    .email {
      margin-top: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .email-link {
      display: flex;
      align-items: center;
      gap: 0 5px;
      font-size: 0.8em;
      color: var(--pink);
    }
    .copy-button {
      &:hover {
        filter: var(--pinkFilter);
      }
    }
    .copied {
      img {
        filter: var(--pinkFilter);
      }
    }
  }
`;
