import styled from "styled-components";
export const ItineraryErrorStyles = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  .error-wrapper {
    max-width: 500px;
    background-color: var(--darkBlue);
    padding: 20px;
    border-radius: 15px;
    margin: 0 10px;
    p,
    h3,
    h2 {
      color: #fff;
    }
    .error-title {
      font-size: 2.7em;
      color: var(--pink);
      line-height: 1em;
    }
    h2 {
      color: var(--pink);
    }
    p {
      font-size: 1.1em;
    }
    .error-message {
      display: block;
      padding: 0;
      border: none;
      background: none;
      margin: 20px 0;
    }
  }
`;
