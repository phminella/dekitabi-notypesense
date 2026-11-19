import styled from "styled-components";
export const OrdersSortStyles = styled.div`
  margin-bottom: 15px;
  p {
    font-size: 1.05em;
    font-weight: 600;
    text-transform: lowercase;
  }
  .select-wrapper {
    select {
      display: inline-flex;
      border: 1px solid lightgray;
      max-width: 200px;
    }
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    .select-wrapper {
      justify-content: left;
    }
  }
`;
