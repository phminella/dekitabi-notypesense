import styled from "styled-components";
export const AccountPaymentsTabsStyles = styled.ul`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
  li {
    margin: 0 !important;
    button, a {
      display: block;
      background: lightgray;
      position: relative;
      padding: 12px 10px;
      color: white;
      border-radius: 10px;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: gray;
        }
      }
    }
    &.active button {
      background-color: var(--blue);
    }
  }
`;
