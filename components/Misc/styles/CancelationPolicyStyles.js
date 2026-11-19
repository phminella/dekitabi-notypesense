import styled from "styled-components";
export const CancelationPolicyStyles = styled.div`
  max-width: 800px;
  margin: 120px auto 50px auto;
  min-height: 350px;
  @media (max-width: 800px) {
    margin: 20px 10px;
  }
  h1 {
    margin-bottom: 30px;
  }
  p {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  h3 {
    margin: 20px 0 15px 0;
  }
  ul {
    border: 1px solid lightgray;
    border-radius: 5px;
    margin-bottom: 20px;
    li {
      display: grid;
      grid-template-columns: 1fr 50px;
      padding: 10px;
      border-bottom: 1px solid lightgray;
      &:last-child {
        border-bottom: none;
      }
      .cancelation-fee {
        text-align: right;
      }
    }
  }
`;
