import styled from "styled-components";
export const GuidesPerPageStyles = styled.div`
  img {
    filter: var(--darkBlueFilter);
  }
  .details-wrapper {
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    .include-transport {
      border: none;
      padding: 0 0 0 5px;
      margin: 0;
      justify-content: center;
      img {
        filter: var(--blueFilter);
      }
    }
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
