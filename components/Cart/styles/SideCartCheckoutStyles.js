import styled from "styled-components";
export const SideCartCheckoutStyles = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  background: white;
  .checkout-total {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 15px;
    font-size: 1.2em;
    font-weight: 700;
    .total-price {
      text-align: right;
    }
  }
  .checkout-button {
    /* a {
      height:55px;
    } */
    .normal-button {
      height: 55px;
      width: 100%;
    }
  }
`;
