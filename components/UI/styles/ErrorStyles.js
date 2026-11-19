import styled from "styled-components";
export const ErrorStyles = styled.div`
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 40px 15px 15px;
  background: #fa4157;
  color: white;
  transition: 0.8s all ease-in-out;
  z-index: 3;
  &.show {
    top: 0;
  }
  img {
    filter: var(--whiteFilter);
  }
  button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 20px;
    img {
      margin-top: 5px;
    }
  }
`;
