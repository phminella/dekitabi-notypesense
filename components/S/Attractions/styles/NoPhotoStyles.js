import styled from "styled-components";
export const NoPhotoStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #b3e6f4;
  .no-photo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      filter: var(--darkBlueFilter);
      width: 50%;
      height: 50%;
    }
  }
`;
