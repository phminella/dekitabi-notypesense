import styled from "styled-components";
export const FirstStepsStyles = styled.div`
  position: relative;
  color: var(--darkBlue);
  .modal-wrapper {
    min-width: 650px;
    margin: 0 10px;
    padding: 0;
    .main-title {
      padding: 20px 20px 0 20px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      text-align: center;
      h2 {
        line-height: 1em;
      }
      img {
        filter: var(--darkBlueFilter);
      }
    }
    .steps-wrapper {
      padding: 0px 20px 20px 20px;
      overflow-y: auto;
    }
  }
`;
