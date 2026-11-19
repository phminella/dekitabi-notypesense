import styled from "styled-components";
export const ActivityEditAvailabilityStyles = styled.div`
  select {
    border: 1px solid lightgray;
  }
  .availability-preview-title {
    margin-bottom: 10px;
    span {
      color: gray;
      font-size: 1.1em;
    }
  }
  .edit-availability {
    .select-time-options {
      display: none;
    }
  }
  ul {
    margin-top: 20px;
    border: 1px solid lightgray;
    padding: 15px;
    border-radius: 10px;
    li {
      display: grid;
      align-items: center;
      grid-template-columns: 100px 100px;
      gap: 10px;
      margin-bottom: 10px;
      &:last-child {
        margin: 0;
      }
      .label {
        font-size: 1.1em;
        font-weight: 600;
        color: var(--darkBlue);
      }
    }
  }
  .edit-buttons {
    flex-direction: row-reverse;
    justify-content: left !important;
  }
`;
