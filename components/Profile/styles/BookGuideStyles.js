import styled from "styled-components";
export const BookGuideStyles = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 2;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  p {
    color: var(--darkBlue);
    font-weight: 700;
    font-size: 1.5em;
  }
  .buttons {
    max-width: 600px;
    padding: 10px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    button {
      font-size: 1.1em;
      &.later {
        background: #ffb94f;
        &:hover {
          background: var(--darkBlue);
        }
      }
    }
  }
  @media (max-width: 600px) {
    .buttons {
      padding: 10px 0;
      grid-template-columns: 1fr;
    }
  }
`;
