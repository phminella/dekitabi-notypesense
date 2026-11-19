import styled from "styled-components";
export const FilterQualificationStyles = styled.div`
  border-bottom: 1px solid lightgray;
  margin-bottom: 15px;
  padding-bottom: 10px;
  .filter-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-height: 150px;
    overflow: hidden;
    &.show-more {
      max-height: 2000px;
    }
    span {
      font-size: 0.9em;
    }
  }
  .show-more-button {
    color: var(--pink);
    font-weight: 600;
    margin-top: 10px;
  }
`;
