import styled from "styled-components";
export const AffiliateProfileInfoStyles = styled.div`
  .balance {
    width: 100%;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--darkBlue);
    padding: 0px 8px;
    height: 70px;
    border-radius: 10px;
    margin: 10px 0;
  }
  .balance-label {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .balance-value {
    text-align: center;
    font-size: 1.5em;
    font-weight: 700;
    display: flex;
    gap: 8px;
    align-items: center;
    color: var(--darkBlue);
  }
  .list-buttons {
    margin: 20px 0;
    .link {
      display: block;
      margin-bottom: 10px;
    }
  }
  .centered {
    text-align: center;
  }
  .buttons {
    margin-top: 15px;
    .normal-button {
      width: 100%;
      margin-bottom: 10px;
      height: 50px;
      font-size: 0.9em;
      &:last-child {
        margin: 0;
      }
      &.logout {
        background-color: orange;
      }
    }
  }
`;
