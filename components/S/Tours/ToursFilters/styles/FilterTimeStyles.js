import styled from "styled-components";
export const FilterTimeStyles = styled.div`
  .filter-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    span {
      font-size: 0.9em;
      text-transform: capitalize;
      padding-top: 0;
    }
    label {
      align-items: start;
      padding: 0;
    }
  }
`;
