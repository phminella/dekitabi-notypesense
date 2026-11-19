import styled from "styled-components";
export const DekitabiReviewsSortStyles = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  p {
    font-size: 1.05em;
    font-weight: 600;
  }
  select {
    border: 1px solid lightgray;
    display: inline-flex;
  }
  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;
