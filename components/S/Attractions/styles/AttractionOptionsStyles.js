import styled from "styled-components";
export const AttractionOptionsStyles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  .attraction-options-wrapper {
    position: absolute;
    width: 50px;
    top: 0;
    right: 0;
    padding: 5px;
    gap: 5px;
    transition: all 0.3s ease-in-out;
    z-index: 1;
    button,
    a {
      flex-shrink: 0;
      transition: transform 0.3s ease-in-out;
      background: var(--blue);
      width: 40px !important;
      height: 40px !important;
      z-index: 1;
      margin-bottom: 5px;
      img {
        filter: var(--whiteFilter);
        width: 25px !important;
        height: 25px !important;
        :first-child {
          width: 25px !important;
          height: 35px !important;
        }
      }
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      @media (hover: hover) and (pointer: fine) {
        transform: scale(0, 0);
        &:hover {
          background-color: var(--darkBlue);
        }
      }
    }
  }
  .options-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;
