import styled from "styled-components";
export const PaymentNotFoundStyles = styled.div`
  background-color: var(--lightGray);
  padding: 30px 10px;
  margin-top: -60px;
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .payment-wrapper {
    background-color: white;
    text-align: center;
    max-width: 500px;
    margin: 30px auto 0 auto;
    padding: 15px 20px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    p {
      text-align: left;
      margin: 15px 0;
    }
    a {
      display: flex;
      margin-top: 15px;
      color: var(--blue);
      text-decoration: underline;
      justify-content: center;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
`;
