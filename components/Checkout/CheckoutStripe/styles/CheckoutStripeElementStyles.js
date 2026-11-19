import styled from "styled-components";
export const CheckoutStripeElementStyles = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  .spinner {
    filter: var(--whiteFilter);
  }
  #link-authentication-element {
    margin-bottom: 10px;
  }
  .input-password-wrapper {
    margin-bottom: 10px;
    .input-password {
      display: grid;
      grid-template-columns: 1fr 1fr;
      @media (max-width: 500px) {
        grid-template-columns: 1fr;
      }
      gap: 10px;
      .input-item {
        input {
          background: #f6f8fa;
          border: none;
          height: 60px;
          border-radius: 10px !important;
          padding: 0 12px;
          &::placeholder {
            font-size: 1em;
            color: #30313d;
            font-weight: 600;
          }
        }
      }
    }
  }
  .pay-button {
    background: var(--blue);
    color: white;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-top: 15px;
    font-weight: 600;
    font-size: 1.1em;
    img {
      filter: none;
    }
    &:disabled {
      background: #a4ccf4;
      cursor: default;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: #a4ccf4;
        }
      }
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
      }
    }
  }
  .spinner {
    filter: var(--blueFilter) !important;
  }
  .card-warning {
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
    padding: 5px;
    margin-top: 5px;
    background: var(--lightGray);
    &.wallet-pay {
      display: inline-block;
      img:last-child {
        margin-right: 5px;
      }
    }
  }
`;
