import styled from "styled-components";
export const SStyles = styled.div`
  margin-bottom: 50px;
  .basic-modal {
    animation: none;
  }
  .badge {
    position: absolute;
    top: 3px;
    right: 3px;
    width: 7px;
    height: 7px;
    background-color: var(--pink);
    border-radius: 50%;
    display: none;
  }
  .results-wrapper {
    .results {
      max-width: 1200px;
      margin: 0 auto;
    }
    .attractions-city {
      position: relative;
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        filter: saturate(80%);
      }
      .city-wrapper {
        padding: 20px;
        text-align: right;
        h1 {
          border-radius: 5px;
          font-size: 4.5em;
          @media (max-width: 600px) {
            font-size: 3.8em;
          }
          @media (max-width: 400px) {
            font-size: 3.2em;
          }
          letter-spacing: -2px;
          color: white;
          line-height: 1em;
          text-transform: capitalize;
          text-shadow: var(--darkBlue) 1px 0 10px;
          word-break: break-word;
        }
        .subtitle {
          margin-top: 5px;
          color: white;
          font-size: 1.8em;
          font-weight: 600;
          text-shadow: var(--darkBlue) 1px 0 10px;
        }
      }
    }
  }
`;
