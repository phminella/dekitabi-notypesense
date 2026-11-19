import styled from "styled-components";
export const FirstStepWarningStyles = styled.div`
  ul {
    margin: 0 0 20px 0;
    li {
      display: flex;
      gap: 5px;
      margin-bottom: 5px;
      font-size: 1.1em;
      h3 {
        margin-bottom: 5px;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &.division {
        border-top: 1px solid lightgray;
        padding-top: 15px;
        margin-top: 15px;
      }
      .circle {
        margin-top: 6px;
        width: 10px;
        height: 10px;
        background-color: var(--pink);
        border-radius: 50%;
        flex-shrink: 0;
      }
    }
  }
  button {
    height: 55px;
    margin-top: 20px;
    width: 100%;
    font-size: 1.1em;
  }
`;
