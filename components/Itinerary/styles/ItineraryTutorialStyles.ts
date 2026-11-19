import styled from "styled-components";
export const ItineraryTutorialStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  padding: 10px;
  z-index: 3;
  .buttons {
    position: absolute;
    top: 20px;
    right: 40px;
    z-index: 9999;
    background: white;
    /* border: 3px solid black; */
    border-radius: 20px;
    padding: 10px;
    width: 140px;
    text-align: center;
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 10px;
    .steps {
      font-size: 1.3em;
    }
    .buttons-wrapper {
      display: flex;
      justify-content: center;
      gap: 10px;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-color: lightgray;
        border-radius: 50%;
        img {
          filter: var(--purpleFilter);
        }
      }
    }
    .skip {
      position: absolute;
      top: 105%;
      color: white;
      text-decoration: underline;
    }
  }
  .close-icon {
    position: absolute;
    right: 30px;
    top: 20px;
    filter: var(--whiteFilter);
  }
`;
