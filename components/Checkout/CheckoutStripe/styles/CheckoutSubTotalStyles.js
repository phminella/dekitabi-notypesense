import styled from "styled-components";
export const CheckoutSubTotalStyles = styled.div`
  background: var(--lightGray);
  padding: 15px;
  border-radius: 5px;
  margin: 20px;
  h2 {
    margin-bottom: 10px;
  }
  .sub-total {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .sub-total-price {
      text-align: right;
      font-size: 1.1em;
      line-height: 1em;
      font-weight: 700;
    }
  }
  .coupon {
    color: var(--pink);
  }
  .percentage {
    .sub-total-label {
      font-size: 0.9em;
    }
    .sub-total-price {
      font-size: 1em;
      font-weight: 700;
    }
  }
  .total-wrapper {
    border-top: 1px solid lightgray;
    margin-top: 10px;
    padding-top: 10px;
    .total {
      margin-top: 5px;
      .sub-total-label {
        font-size: 1.3em;
        font-weight: 700;
      }
      .sub-total-price {
        font-size: 1.4em;
      }
    }
  }
  .tours-info {
    color: var(--pink);
    font-size: 0.9em;
  }
`;
