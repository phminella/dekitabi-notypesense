import styled from "styled-components";
export const ItineraryIncludeTransportStyles = styled.div`
  position: relative;
  padding: 0 5px 0 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  label {
    margin-right: 0;
  }
  button {
    height: 20px;
  }
  img {
    filter: var(--blueFilter);
  }
  .include-transport-info {
    position: relative;
    background: white;
    border: 2px solid var(--darkBlue);
    padding: 10px 20px 10px 10px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    max-width: 300px;
    .close-button {
      position: absolute;
      top: 5px;
      right: 5px;
      img {
        filter: var(--darkBlueFilter);
      }
    }
    li {
      font-size: 1.1em;
      display: flex;
      gap: 5px;
      .circle {
        margin-top: 5px;
        width: 10px;
        height: 10px;
        background-color: var(--pink);
        border-radius: 50%;
        flex-shrink: 0;
      }
    }
  }
`;
