import styled from "styled-components";
export const ActivityBookConfirmationStyles = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
  .checkout-title {
    margin-top: 20px;
  }
  .activity-pay-onsite {
    margin-top: 20px;
    padding: 10px;
    background-color: #ececec;
    border-radius: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 1.1em;
    color: var(--darkBlue);
    img {
      filter: var(--darkBlueFilter);
    }
  }
`;
