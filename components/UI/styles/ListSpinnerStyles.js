import styled from "styled-components";
export const ListSpinnerStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: 0.3s all ease-in-out;
  &.show {
    opacity: 0.8;
    visibility: visible;
  }
`;
