import styled from "styled-components";
export const OrderCompleteResponsiveStyles = styled.div`
  @media (max-width: 800px) {
    .order-wrapper {
      padding: 10px;
      .order-title {
        font-size: 1.1em;
      }
      h1 {
        font-size: 1.5em;
        margin-bottom: 10px;
        img {
          margin-top: 0 !important;
        }
      }
      .cart-item-wrapper {
        padding: 10px !important;
      }
      margin: 0 10px;
      /* display: none !important; */
    }
  }
  @media (max-width: 500px) {
    .order-charge {
      grid-template-columns: 1fr !important;
      p {
        display: grid !important;
        grid-template-columns: 1fr 110px;
        gap: 10px;
        b {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        span {
          text-align: right;
        }
      }
    }
  }
  @media (max-width: 350px) {
    h1 {
      font-size: 1.1em !important;
    }
  }
`;
