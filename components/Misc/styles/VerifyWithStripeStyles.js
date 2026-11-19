import styled from "styled-components";
export const VerifyWithStripeStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  max-width: 800px;
  margin: 100px auto 20px auto;
  @media (max-width: 830px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin: 80px 10px 20px 10px;
  }
  a {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .stripe-wrapper {
    margin: 5px 0 30px 0;
    display: flex;
    gap: 5px;
    align-items: center;
    span {
      font-weight: bold;
    }
  }
  .check-list {
    display: flex;
    gap: 5px;
    font-size: 1.1em;
    img {
      margin-top: 2px;
      filter: invert(87%) sepia(80%) saturate(574%) hue-rotate(69deg)
        brightness(95%) contrast(82%);
    }
  }
  .stripe-button {
    a {
      display: block;
      background: var(--blue) !important;
      text-align: center;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0 10px 0;
      color: white;
      text-decoration: none;
    }
  }
  .warning {
    color: red;
  }
  .error-message {
    margin-top: 15px;
    font-size: 1.1em;
  }
  .verified {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #32de84;
    color: white;
    border-radius: 5px;
    margin: 20px 0;
    img {
      filter: var(--whiteFilter);
    }
  }
  .personal-info-msg {
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 15px 15px 15px 15px;
    .personal-info-detail {
      margin-bottom: 20px;
      p {
        font-size: 1.1em;
        color: gray;
      }
    }
  }
`;
