import styled from "styled-components";
export const ToursPerPageStyles = styled.div`
  .details-wrapper {
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  .found {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 20px 0;
    font-weight: 600;
    color: var(--darkBlue);
    font-size: 1.1em;
  }
  img {
    filter: var(--darkBlueFilter);
  }
  .per-page {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
    button {
      background: var(--lightGray);
      height: 28px;
      width: 28px;
      border-radius: 10px;
      color: gray;
      &.active {
        background: var(--blue);
        color: white;
      }
    }
  }
`;
