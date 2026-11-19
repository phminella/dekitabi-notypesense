import styled from "styled-components";
export const ShopAddActivityStyles = styled.div`
  height: 100%;
  min-height: 280px;
  button {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border: 2px dashed lightgray;
    padding: 15px;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    color: gray;
    font-size: 1.1em;
    font-weight: 600;
    img {
      filter: brightness(0) saturate(100%) invert(55%) sepia(0%) saturate(2%)
        hue-rotate(183deg) brightness(91%) contrast(81%);
    }
    &:hover {
      color: var(--darkBlue);
      border-color: var(--darkBlue);
      background-color: var(--lightGray);
      img {
        filter: var(--darkBlue);
      }
    }
  }
`;
