import styled from "styled-components";
export const SavedFiltersStyles = styled.div`
  background: var(--lightGray);
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .filters {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    p {
      background: var(--darkBlue);
      color: white;
      padding: 10px;
      border-radius: 30px;
      white-space: nowrap;
      display: inline-flex;
      gap: 5px;
      font-size: 0.9em;
    }
  }
  .buttons {
    margin-top: 15px;
    display: flex;
    gap: 10px;
    .normal-button {
      height: 30px;
    }
    .cancel {
      color: var(--blue);
      text-decoration: underline;
    }
  }
`;
