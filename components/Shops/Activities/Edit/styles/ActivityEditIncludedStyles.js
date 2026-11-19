import styled from "styled-components";
export const ActivityEditIncludedStyles = styled.div`
  .mui-input-wrapper {
    display: grid;
    gap: 15px;
    grid-template-columns: 150px 1fr 50px;
    align-items: center;
    @media (max-width: 700px) {
      grid-template-columns: 1fr;
      .access-button span {
        display: block;
      }
    }
  }
  input,
  select {
    border: 1px solid lightgray;
  }
  input {
    padding: 5px 10px;
  }
  select {
    font-size: 0.9em !important;
  }
  .access-button {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    color: var(--blue);
    min-height: 50px;
    font-size: 1.1em;
    img {
      filter: var(--blueFilter);
    }
    span {
      display: none;
    }
    &:hover {
      background: var(--darkBlue);
      color: white;
      img {
        filter: var(--whiteFilter);
      }
    }
  }
`;
