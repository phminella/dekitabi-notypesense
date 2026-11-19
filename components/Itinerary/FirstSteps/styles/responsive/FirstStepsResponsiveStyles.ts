import styled from "styled-components";
export const FirstStepsResponsiveStyles = styled.div`
  @media (max-width: 670px) {
    .modal-wrapper {
      min-width: 95vw;
    }
    ul.steps li {
      border-radius: 50px;
      width: 40px !important;
      height: 40px !important;
      .step-short {
        display: block !important;
      }
      .step-full {
        display: none !important;
      }
    }
    .steps-wrapper {
      padding: 10px !important;
    }
  }
  @media (max-width: 500px) {
    h2 {
      font-size: 1.3em;
    }
    .transport-option {
      font-size: 0.8em;
    }
  }
  @media (max-width: 350px) {
    button {
      font-size: 0.9em;
      img {
        min-width: 12px;
      }
    }
  }
`;
