import styled from "styled-components";
export const OrderTourStyles = styled.div`
  display: grid;
  margin: 10px 0;
  gap: 10px;
  border-radius: 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;
  grid-template-columns: 200px 1fr;
  @media (max-width: 460px) {
    grid-template-columns: 1fr;
    border-radius: 0;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
  gap: 10px;
  overflow: hidden;
  a {
    color: var(--blue);
    text-decoration: underline;
    font-size: 1.1em;
  }
  .order-image {
    width: 100%;
    position: relative;
    min-height: 150px;
  }
  .order-details {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-top: 5px;
    border-radius: 10px;
    flex-wrap: wrap;
    .icons {
      filter: var(--pinkFilter);
    }
  }
  .price {
    font-size: 1.2em;
    font-weight: 700;
    &.coupon {
      font-size: 0.9em;
      color: var(--pink);
    }
  }
  .cancelation-fee {
    margin-top: 5px;
    max-width: 250px;
    border-radius: 10px;
    padding: 5px;
    border: 1px solid #ff2e4a;
  }
  .order-status {
    color: white;
    padding: 10px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
    img {
      filter: var(--whiteFilter);
    }
    &.paid {
      background: #32de84;
    }
    &.pending {
      background: orange;
    }
    &.canceled {
      background: #ff2e4a;
    }
  }
  .receipt {
    margin-top: 5px;
  }
`;
