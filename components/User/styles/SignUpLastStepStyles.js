import styled from "styled-components";
export const SignUpLastStepStyles = styled.div`
  h2 {
    font-size: 2.2em !important;
  }
  .last-step-alert {
    margin: 10px 0;
    padding: 10px;
    color: var(--blue);
    background-color: var(--lightGray);
    border-radius: 10px;
    display: flex;
    align-items: top;
    gap: 10px;
    img {
      margin-top: 2px;
      filter: var(--blueFilter);
    }
  }
  #react-select-languages-listbox,
  #react-select-prefectures-listbox {
    z-index: 2;
  }
  .input-wrapper {
    margin-top: 10px;
    .fee-description span {
      font-size: 0.9em;
      color: gray;
    }
  }
  a {
    color: var(--blue);
    text-decoration: underline;
  }
  .react-select__input-container {
    font-size: 30px !important;
    font-family: inherit !important;
  }
  .fee-edit {
    width: 100%;
    .fee-edit-options {
      margin: 10px 0;
    }
    .checkbox-label {
      display: flex;
      gap: 10px;
      background: var(--lightGray);
      padding: 10px;
      border-radius: 10px;
      text-align: center;
      input {
        width: 20px;
        height: 20px;
        &[type="checkbox"] {
          accent-color: var(--pink);
        }
      }
    }
    .fee-edit-input {
      position: relative;
      span {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 10px;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        font-size: 1.2em;
        color: lightgray;
      }
      input {
        padding: 10px;
        padding-left: 25px;
      }
    }
  }
  .mui-input-wrapper {
    position: relative;
    @media (min-width: 460px) {
      margin: 0;
    }
    input {
      padding-left: 25px;
    }
    span {
      position: absolute;
      top: 26px;
      left: 12px;
      z-index: 1;
      font-size: 1.1em;
      color: gray;
    }
  }
  .submit-button {
    color: white;
    padding: 15px;
    width: 100%;
    border-radius: 10px;
    @media (min-width: 460px) {
      margin-top: 10px;
    }
  }
  .error-message {
    margin: 0 0 10px 0;
  }
  .person {
    margin: 10px 0;
  }
  .itinerary-person-number {
    margin: 0;
  }
`;
