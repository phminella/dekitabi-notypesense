import styled from "styled-components";
export const AffiliateSignUpStyles = styled.div`
  background-color: lightblue;
  padding: 30px 10px;
  .wrapper {
    background-color: white;
    border-radius: 20px;
    margin: 0 auto;
    max-width: 400px !important;
    padding: 20px;
  }
  .alternative {
    margin-top: 5px;
    gap: 5px;
    span {
      color: var(--blue);
    }
    .alternative-button {
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
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
        font-size: 2em;
        color: var(--blue);
      }
    }
  }
  .sign-form {
    margin: 20px auto;
    overflow: auto;
    max-width: 400px;
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
  .checkbox-wrapper {
    padding: 0 10px 10px 10px;
  }
  .error-message {
    margin-bottom: 10px;
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
  .privacy-policy {
    font-size: 0.9em;
  }
`;
