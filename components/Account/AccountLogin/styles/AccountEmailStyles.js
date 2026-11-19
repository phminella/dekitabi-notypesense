import styled from "styled-components";
export const AccountEmailStyles = styled.div`
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid lightgray;
  .login-menu {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    button {
      position: absolute;
      right: 0;
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  form {
    margin-top: 30px;
    .password-wrapper {
      display: grid;
      grid-template-columns: 1fr 60px;
      gap: 10px;
      button {
        background: #f6f8fa;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        height: 60px;
        &.active {
          background: var(--pink);
          img {
            filter: var(--whiteFilter);
          }
        }
      }
    }
    .edit-buttons {
      display: flex;
      gap: 10px;
      justify-content: right;
      margin-top: 10px;
      .normal-button {
        height: 40px;
      }
    }
  }
`;
