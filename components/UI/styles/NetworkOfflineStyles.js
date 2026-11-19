import styled from "styled-components";
export const NetworkOfflineStyles = styled.div`
  position: fixed;
  color: white;
  padding: 15px;
  border-radius: 15px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 5px;
  background: #ff2e4a;
  right: 10px;
  img {
    filter: var(--whiteFilter);
  }
  &.not-home {
    top: 70px;
  }
  &.is-home {
    bottom: 20px;
  }
`;
