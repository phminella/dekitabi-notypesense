import styled from "styled-components";
export const OrderActivityStyles = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  .activity-removed {
    font-weight: 600;
    color: var(--darkBlue);
    font-size: 1.1em;
  }
  .cancel-activity {
    color: #ff2e4a;
  }
  .activity-status-wrapper {
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid lightgray;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
    .activity-status {
      .activity-label {
        font-size: 0.9em;
        color: gray;
      }
      .activity-value {
        background: orange;
        padding: 5px;
        color: var(--darkBlue);
        border-radius: 5px;
        font-weight: 600;
        &.confirmed {
          background: lightgreen;
        }
      }
    }
  }
`;
