import styled from "styled-components";
export const GuideBackgroundStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: 15px;
  overflow: hidden;
  background-color: var(--darkBlue);
  img {
    overflow: hidden;
    -webkit-mask-image: -webkit-gradient(
      linear,
      left center,
      left bottom,
      from(rgba(0, 0, 0, 0.8)),
      to(rgba(0, 0, 0, 0.2))
    );
    mask-image: linear-gradient(
      from bottom,
      to center,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.2)
    );
    -webkit-filter: contrast(108%) brightness(108%) sepia(8%);
  }
`;
