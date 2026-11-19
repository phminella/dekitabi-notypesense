import styled from "styled-components";
export const SignInModalStyles = styled.div`
  .modal-wrapper {
    position: relative;
    margin: 0 5px;
    overflow: auto;
  }
  .sign-title-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .sign-title {
      text-align: center;
      h2 {
        color: var(--blue);
      }
    }
  }
  .sign-form {
    overflow: auto;
    min-width: 400px;
    @media (max-width: 440px) {
      min-width: calc(100vw - 20px);
    }
  }
  .link-button {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .submit-button,
  .submit-spinner {
    font-size: 1.1em;
    width: 100%;
    height: 50px;
    background: var(--pink);
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
      }
    }
  }
  .submit-spinner {
    img {
      filter: var(--filterWhite);
    }
  }
`;
