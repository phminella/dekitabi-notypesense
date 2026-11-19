import styled from "styled-components";
export const ChangeMessageStyles = styled.div`
  position: fixed;
  top: -100px;
  opacity: 0;
  visibility: hidden;
  left: 20px;
  z-index: 9999;
  background: var(--blue);
  color: white;
  padding: 20px;
  border-radius: 10px;
  font-size: 1.1em;
  transition: all 0.5s ease-in-out;
  img {
    filter: var(--whiteFilter);
  }
  p {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &.status-changed {
    top: 70px;
    opacity: 1;
    visibility: visible;
  }
`;
