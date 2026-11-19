import styled from "styled-components";
export const SignInStyle = styled.section`
  position: relative;
  display: grid;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100%;
  //
  // Switch
  //
  /* The switch - the box around the slider */
  .switch-wrapper {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1em;
    background: var(--lightGray);
    padding: 10px;
    border-radius: 10px;
    p {
      color: gray;
      &.guide {
        color: var(--pink);
        font-weight: 600;
      }
    }
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-top: 0;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
   .coupon-input {
    border:1px solid lightgray;
    padding:0 10px;
   }
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  label {
  }
  input:checked + .slider {
    background: var(--blue);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  //
  //
  //
  fieldset {
    margin-top: 20px;
    input {
      font-size: 1.2em;
    }
  }
  .error-message {
    margin: 0 0 10px 0;
  }
  #OAuth-signup {
    margin-top: 10px;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
    gap: 15px;
    button {
      width: 100%;
      padding: 0 5px;
      height: 55px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      border: 1px solid var(--lightGray);
      gap: 5px;
      font-size: 0.9em;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
          color: white;
        }
      }
    }
  }
  .privacy-policy {
    margin-top: 5px;
    font-size: 0.9em;
    a {
      display: inline !important;
      text-decoration: underline;
      color: var(--blue);
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  .alternative {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
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
`;
