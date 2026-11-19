import styled from "styled-components";
export const MoveUpStyles = styled.button`
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -60px;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  background: var(--blue);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  transition: 0.3s all ease-in-out;
  &.show {
    bottom: 30px;
  }
  .MuiBadge-badge {
    background: var(--pink);
  }
  img {
    filter: var(--whiteFilter);
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: rotate(360deg);
    }
  }
`;
