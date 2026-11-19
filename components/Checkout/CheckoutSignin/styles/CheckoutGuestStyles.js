import styled from "styled-components";
export const CheckoutGuestStyles = styled.div`
  h2 {
    img {
      margin-top: 4px;
      filter: var(--darkBlueFilter);
    }
  }
  .guest-message {
    padding: 5px 0;
    border-radius: 10px;
    margin: 5px 0;
    font-size: 0.95em;
    ul li {
      padding: 3px 0;
      :before {
        content: "·";
        font-size: 4em;
        vertical-align: middle;
        line-height: 12px;
        margin-right: 3px;
      }
    }
    &:last-child {
      padding-bottom: 0;
    }
  }
  .input-item {
    margin: 5px 0 10px 0;
    label {
      font-size: 0.8em;
    }
    input {
      padding: 10px;
      border-radius: 5px;
      border-color: lightgray;
    }
  }
  .sign-up-wrapper {
    margin-bottom: 20px;
  }
  .sign-up-button {
    background: var(--blue);
    color: white;
    padding: 10px 10px;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 1.1em;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
      }
    }
  }
`;
