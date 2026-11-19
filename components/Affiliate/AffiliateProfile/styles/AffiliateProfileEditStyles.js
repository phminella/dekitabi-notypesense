import styled from "styled-components";
export const AffiliateProfileEditStyles = styled.div`
  .normal-button {
    width: 100%;
    height: 50px;
    font-size: 0.9em;
    &.cancel {
      background-color: #ff2e4a;
      margin-top: 15px;
      &:hover {
        background-color: var(--darkBlue);
      }
    }
  }
  .title {
    text-align: center;
    font-size: 1.3em;
    font-weight: bold;
    color: var(--darkBlue);
  }
  .link {
    width: 100%;
    text-align: center;
    font-size: 0.9em;
  }
  .saved {
    color: var(--pink);
    font-size: 0.9em;
  }
  .form-wrapper {
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 50px;
    }
    .info-title {
      font-size: 1.1em;
      font-weight: bold;
      margin: 10px 0;
    }
    .password-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    input {
      height: 35px;
      border: 1px solid lightgray;
      padding: 0 10px;
      &.password {
        margin-bottom: 10px;
      }
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 35px 35px;
      gap: 5px;
      button {
        height: 35px;
      }
    }
    .error-message,
    .completed-message {
      margin: 5px 0 10px 0;
    }
    .completed-message {
      background: #32de84;
      color: white;
      padding: 5px;
      border-radius: 10px;
      font-size: 0.9em;
    }
  }
  .basic-modal {
    .close-icon {
      display: none;
    }
    .modal-wrapper {
      padding: 0;
    }
    .modal-title,
    .modal-message {
      padding: 20px 15px;
      border-radius: 10px;
    }
    .modal-title {
      color: white;
      font-weight: 600;
      background: #1a2b49;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      max-width: 100%;
      img {
        filter: var(--whiteFilter);
      }
    }
    .modal-message {
      padding: 15px;
    }
    span {
      color: var(--pink);
      font-weight: 600;
    }
    .modal-buttons {
      display: flex;
      align-items: center;
      justify-content: right;
      gap: 10px;
      padding: 0 15px;
      button,
      .fake-button {
        font-size: 0.8em;
        line-height: 1.2em;
        min-width: 100px;
        height: 45px;
      }
      .fake-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--blue);
        border-radius: 6px;
      }
    }
  }
`;
