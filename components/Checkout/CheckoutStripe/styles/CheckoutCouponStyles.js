import styled from "styled-components";
export const CheckoutCouponStyles = styled.div`
  border-bottom: 1px solid lightgray;
  padding-bottom: 15px;
  margin-bottom: 15px;
  form {
    display: grid;
    grid-template-columns: 1fr 100px;
    gap: 5px;
  }
  input {
    border: 1px solid lightgray;
    padding: 0 10px;
    height: 50px;
  }
  .normal-button {
    height: 50px;
  }
`;
