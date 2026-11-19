import styled from "styled-components";
export const CheckoutCartStyles = styled.div`
  margin: 20px;
  font-size: 1em;
  max-height: 320px;
  padding: 0 10px;
  overflow-y: auto;
  overflow-x: hidden;
  .empty-cart {
    margin: 15px 0;
    font-size: 1.2em;
    font-weight: 600;
  }
  h2 {
    margin: 0 20px;
  }
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 5px;
  }
`;
