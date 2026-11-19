import styled from "styled-components";
export const AttractionsRadiusStyles = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 500px) {
    gap: 10px;
  }
  align-items: center;
  color: gray;
  width: 100%;
  .slider {
    width: 200px;
    display: flex;
    align-items: center;
    gap: 5px;
    @media (max-width: 750px) {
      width: 100%;
    }
    .MuiSlider-root {
      margin: 0;
    }
    .MuiSlider-markLabel,
    .MuiSlider-mark {
      display: none;
    }
    .MuiSlider-rail,
    .MuiSlider-valueLabel,
    .MuiSlider-thumb,
    .MuiSlider-track {
      background: var(--blue);
    }
    .MuiSlider-track {
      border: none;
    }
  }
  .radius {
    width: 75px;
    text-align: center;
    white-space: nowrap;
  }
  .unit-toggle {
    width: 200px;
    @media (max-width: 500px) {
      width: 200px;
    }
    border-radius: 10px;
    background: var(--lightGray);
    display: flex;
    button {
      color: gray;
      width: 50%;
      padding: 10px;
      transition: all 0.3s ease-in-out;
      text-align: center;
      white-space: nowrap;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--pink);
          color: white;
        }
      }
      &.mi {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      &.km {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      &.active {
        background: var(--blue);
        color: white;
      }
    }
  }
`;
