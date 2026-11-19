import styled from "styled-components";
export const FilterFullDayStyles = styled.div`
  .filter-price-input {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 20px 0;
    .input-wrapper {
      position: relative;
      span {
        position: absolute;
        top: 48%;
        transform: translateY(-50%);
        left: 10px;
        font-size: 1.3em;
        color: lightgray;
      }
      input {
        padding: 15px 15px 15px 55px;
        border-radius: 10px;
        border-color: lightgray;
      }
    }
  }
  .slider {
    display: flex;
    justify-content: center;
    .MuiSlider-root {
      margin: 0 auto;
      width: 90%;
    }
    .MuiSlider-markLabel,
    .MuiSlider-mark {
      display: none;
    }
    .MuiSlider-rail,
    .MuiSlider-valueLabel,
    .MuiSlider-thumb,
    .MuiSlider-track {
      background: var(--darkBlue);
    }
    .MuiSlider-track {
      border: none;
    }
  }
  .price-currency {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .currency-button {
      border-radius: 0;
      border-bottom: 2px solid var(--darkBlue);
      span {
        color: var(--darkBlue);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
          color: var(--darkBlue);
        }
      }
    }
  }
`;
