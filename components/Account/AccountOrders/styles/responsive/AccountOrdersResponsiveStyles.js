import styled from "styled-components";
export const AccountOrdersResponsiveStyles = styled.div`
  @media (max-width: 1200px) {
    margin: 20px 10px;
    .sub-title {
      margin-bottom: 25px !important;
    }
  }
  @media (max-width: 800px) {
    .order-items {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .order-items {
      grid-template-columns: 1fr;
      gap: 5px !important;
      .cart-item-wrapper {
        width: 100% !important;
      }
    }
    .order-header {
      flex-wrap: wrap;
      .order-id {
        text-align: left !important;
      }
    }
    .order-payment-method {
      flex-wrap: wrap;
    }
  }
`;
