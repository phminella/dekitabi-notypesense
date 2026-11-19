import styled from "styled-components";
export const AttractionsFilterStyles = styled.div`
  padding: 0 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-columns: 30% 70%;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid lightgray;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;
