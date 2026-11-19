import styled from "styled-components";
export const ItineraryPhotoPlaceholderStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  img {
    opacity: 0.3;
    filter: blur(40px);
  }
`;
