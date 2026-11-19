import styled from "styled-components";
export const AttractionOpeningHoursStyles = styled.div`
  h2 {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.5em;
    img {
      filter: invert(19%) sepia(0%) saturate(1960%) hue-rotate(263deg)
        brightness(87%) contrast(70%);
    }
  }
  p {
    margin: 20px 0;
    border-radius: 10px;
    background: white;
    display: flex;
    align-items: center;
    gap: 5px;
    &:first-child {
      margin-top: 0;
    }
    &.closed {
      border: none;
      color: lightgray;
      box-shadow: none;
    }
  }
`;
