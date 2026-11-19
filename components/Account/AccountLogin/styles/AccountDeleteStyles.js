import styled from "styled-components";
export const AccountDeleteStyles = styled.div`
  .delete-account-button {
    background: #ff2e4a;
    height: 55px;
    width: 100%;
    padding: 20px;
    color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
      }
    }
  }
  .spinner {
    background: var(--blue);
    border-radius: 5px;
    height: 40px;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--blue);
      }
    }
  }
`;
