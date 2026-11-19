import styled from "styled-components";
export const ApplyFiltersStyles = styled.div`
  background: white;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 15px;
  border-top: 1px solid lightgray;
  padding: 20px;
  .clear-filters {
    color: var(--blue);
    text-decoration: underline;
    font-weight: 600;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
`;
