import styled from "styled-components";
export const FilterDurationStyles = styled.div`
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
