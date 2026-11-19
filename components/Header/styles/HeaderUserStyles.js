import styled from "styled-components";
export const HeaderUserStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .user-login {
    width: 100%;
    border-radius: 15px;
    color: var(--darkBlue);
    font-weight: 700;
    gap: 5px;
    border: 2.4px solid var(--darkBlue);
    padding: 3px 8px;
    font-size: 0.9em;
    span {
      display: none !important;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border: 2.5px solid var(--pink);
        color: var(--pink);
      }
    }
  }
  @media (max-width: 500px) {
    .user-login {
      border: none;
      padding: 0;
      border-radius: 0;
      min-width: 30px;
      b {
        display: none;
        width: 0;
        overflow: hidden;
      }
      span {
        display: flex !important;
        align-items: center;
        flex-shrink: 0 !important;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          border: none;
        }
      }
    }
  }
`;
