import styled from "styled-components";
export const CheckoutResponsiveStyles = styled.div`
  @media (max-width: 850px) {
    .checkout-stripe-element {
    }
    .checkout {
      grid-template-columns: 1fr;
      .review-items,
      .checkout-cart,
      .checkout-subtotal,
      .checkout-signin {
        margin: 10px;
      }
      .checkout-stripe {
        padding: 10px;
      }
    }
    .checkout-right-side {
      min-height: 40vh;
      .checkout-stripe {
        .checkout-stripe-element {
          max-width: 100%;
        }
        .p-Input {
          background: white !important;
        }
      }
    }
  }
  @media (max-width: 1150px) {
    .checkout-signup {
      button {
        display: flex;
        justify-content: center;
        img {
          width: 22px;
          height: 22px;
        }
        .signin-button-text {
          display: none;
        }
        &:first-child {
          img {
            width: 27px;
          }
        }
      }
    }
  }
  @media (max-width: 360px) {
    .checkout-title span {
      display: none;
    }
  }
`;
