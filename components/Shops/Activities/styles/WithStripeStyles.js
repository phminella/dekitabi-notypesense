import styled from "styled-components";
export const WithStripeStyles = styled.div`
  border-right: 1px solid lightgray;
  padding: 10px 15px;
  @media (max-width: 1000px) {
    border-bottom: 1px solid lightgray;
  }
  &:last-child {
    border: none;
    padding-bottom: 0;
  }
`;
