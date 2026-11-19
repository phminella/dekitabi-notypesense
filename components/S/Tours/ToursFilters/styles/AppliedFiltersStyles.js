import styled from "styled-components";
export const AppliedFiltersStyles = styled.div`
  margin-top: 10px;
  h3 {
    margin-bottom: 10px;
  }
  .applied-filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    button {
      background: var(--darkBlue);
      color: white;
      padding: 10px;
      border-radius: 30px;
      white-space: nowrap;
      display: flex;
      gap: 5px;
      font-size: 0.9em;
      .remove-filter-icon {
        width: 17px;
        height: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        border: 2px solid white;
        font-size: 0.8em;
        font-weight: 600;
      }
    }
  }
`;
