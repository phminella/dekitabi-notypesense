import styled from "styled-components";
export const ItineraryBookStyles = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  z-index: 2;
  text-align: center;
  background: linear-gradient(135deg, #1a2b49, #4f6ba6);
  color: white;
  &.pwa {
    bottom: 70px;
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
      &:not(:disabled):hover {
        background-color: var(--darkBlue);
      }
    }
  }
  @media (max-width: 600px) {
    .buttons {
      padding: 10px 0;
      grid-template-columns: 1fr;
    }
  }
  .check-guides {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    flex-wrap: wrap;
    .guides-from {
      font-size: 2em;
      font-weight: 700;
      span {
        color: rgb(242, 49, 126);
      }
    }
    button {
      font-size: 1.1em;
      @media (max-width: 600px) {
        width: 100%;
      }
    }
  }
`;
