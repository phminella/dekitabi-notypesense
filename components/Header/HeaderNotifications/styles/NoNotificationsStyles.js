import styled from "styled-components";
export const NoNotificationsStyles = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    filter: invert(99%) sepia(83%) saturate(89%) hue-rotate(198deg)
      brightness(114%) contrast(84%);
  }
  div {
    text-align: center;
    color: gray;
  }
`;
