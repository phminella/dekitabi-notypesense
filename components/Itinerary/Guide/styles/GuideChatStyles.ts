import styled from "styled-components";
export const GuideChatStyles = styled.div`
  position: absolute;
  top: 5px;
  right: 55px;
  background: white; /* semi-transparent white */
  color: #222;
  padding: 10px 14px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 1); /* strong floating shadow */
  font-size: 14px;
  transition: opacity 0.3s;
  width: calc(100% - 65px);
  font-size: 1.1em;
  z-index: 2;
  &::after {
    content: "";
    position: absolute;
    top: 63px;
    left: 100%;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent transparent white; /* semi-transparent arrow */
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
    @media (max-width: 450px) {
      top: 55px;
    }
  }
  .title {
    position: relative;
    font-weight: 600;
    color: var(--darkBlue);
    margin-bottom: 5px;
    padding-right: 34px;
    font-size: 1.1em;
    button {
      position: absolute;
      top: 3px;
      right: 0;
      filter: var(--blueFilter);
      cursor: pointer;
    }
  }
`;
