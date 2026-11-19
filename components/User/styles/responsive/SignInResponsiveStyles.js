import styled from "styled-components";
export const SignInResponsiveStyles = styled.div`
  @media (max-width: 460px) {
    .modal-wrapper {
      padding: 20px 10px;
    }
    .sign-form {
      min-width: calc(100vw - 50px);
    }
    .two-columns-wrapper {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 550px) {
    .last-step-title {
      font-size: 1.5em !important;
    }
  }
`;
