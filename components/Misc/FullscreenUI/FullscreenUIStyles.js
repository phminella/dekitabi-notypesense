import styled from "styled-components";
export const FullscreenUIStyles = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 70px;
  background: white;
  display: flex;
  justify-content: center;
  padding-top: 15px;
  gap: 60px;
  z-index: 1;
  @media (max-width: 400px) {
    gap: 25px;
  }
  .refresh {
    position: absolute;
    top: 10px;
    left: 23px;
  }
  img {
    filter: var(--darkBlueFilter);
  }
  button {
    height: 25px;
    &:nth-child(1) {
      img {
        transform: rotate(-90deg);
      }
    }
    &:last-child {
      img {
        transform: rotate(90deg);
      }
    }
  }
`;
