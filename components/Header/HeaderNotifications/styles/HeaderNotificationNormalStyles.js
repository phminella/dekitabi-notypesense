import styled from "styled-components";
export const HeaderNotificationNormalStyles = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  padding: 12px 20px 12px 0;
  img {
    margin-top: 3px;
  }
  .notification-counter {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background: #1976d2;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    display: inline !important;
    color: var(--blue);
    text-decoration: underline;
    &:first-child {
      color: var(--pink);
      text-decoration: none;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
`;
