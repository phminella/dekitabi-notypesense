import styled from "styled-components";
export const HomeStep1Styles = styled.div`
  position: relative;
  margin: 0 auto;
  height: 100%;
  width: calc(100% - 20px);
  overflow: hidden;
  margin: 0 10px;
  z-index: 0;
  .normal-arrows {
    .right-arrow,
    .left-arrow {
      z-index: 1;
      top: 50% !important;
      border: none;
    }
    .left-arrow {
      right: unset !important;
      left: 5px !important;
    }
    .right-arrow {
      right: 5px !important;
      left: unset !important;
    }
  }
  .scroll-container {
    display: flex;
    gap: 10px;
    cursor: grab;
    scroll-behavior: smooth;
    height: 100%;
  }
  a {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    width: 300px;
    height: 100%;
    min-height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-transform: capitalize;
    text-decoration: none;
    text-align: center;
    font-size: 2.8em;
    font-weight: 700;
    transition: 0.3s ease-in-out transform;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        transform: scale(0.96);
        color: white;
      }
    }
  }
`;
