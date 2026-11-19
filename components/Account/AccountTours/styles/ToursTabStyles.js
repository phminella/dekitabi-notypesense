import styled from "styled-components";
export const ToursTabStyles = styled.ul`
  display: flex;
  overflow: hidden;
  gap: 10px;
  li {
    margin: 0 !important;
    button {
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
