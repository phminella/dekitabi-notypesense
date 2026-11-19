import styled from "styled-components";
export const CheckoutStripeStyles = styled.div`
  border-top: 3px solid var(--darkBlue);
  padding: 10px 10px 10px 10px;
  margin: 20px 0;
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 12px 0;
    @media (max-width: 785px) {
      grid-template-columns: 1fr;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      @media (max-width: 646px) {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }
  }
  .checkout-title {
    font-size: 1.8em;
    color: white;
    font-weight: 700;
    margin: 10px 0 15px 0;
    color: var(--darkBlue);
  }
  .normal-button {
    background-color: var(--blue);
    height: 50px;
    color: white;
    font-size: 1.1em;
    font-weight: 600;
    padding: 10px;
    width: 100%;
    text-align: center;
    border-radius: 10px;
    margin: 20px 0;
    img {
      filter: none;
    }
  }
  .card-warning {
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
    padding: 5px;
    margin-top: 5px;
    background: lightblue;
    color: var(--darkBlue);
    img {
      filter: var(--darkBlueFilter);
    }
  }
`;
