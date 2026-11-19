import styled from "styled-components";
export const HeaderSettingsBalanceStyles = styled.div`
  a {
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    padding: 10px 20px;
    background: var(--lightGray);
    .balance {
      width: 100%;
      display: flex;
      gap: 5px;
      align-items: center;
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
      button {
        padding: 5px 8px;
        font-size: 0.5em;
        border-radius: 5px;
        gap: 3px;
      }
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: lightgray;
        color: var(--darkBlue);
      }
    }
  }
`;
