import styled from "styled-components";
export const PaymentsAndPayoutsPolicyStyles = styled.div`
  max-width: 800px;
  margin: 120px auto 50px auto;
  min-height: 350px;
  font-size: 1.1em;
  @media (max-width: 600px) {
    margin: 20px 10px;
  }
  .payment-message {
    margin: 10px 0 20px 0;
  }
  h1 span {
    color: var(--pink);
  }
  a {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  h2 {
    margin: 20px 0;
  }
  ul {
    margin: 20px 0;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #e3e8ee;
    li {
      display: grid;
      color: #414552;
      grid-template-columns: 200px 1fr;
      padding: 15px;
      &:nth-child(odd) {
        background: #f7fafc;
      }
      div:last-child {
        width: 100%;
        max-width: 250px;
        text-align: right;
      }
    }
  }
  .powered-by-stripe {
    padding-top: 8px;
    margin-bottom: 15px;
    h2 {
      margin-top: 8px;
    }
  }
`;
