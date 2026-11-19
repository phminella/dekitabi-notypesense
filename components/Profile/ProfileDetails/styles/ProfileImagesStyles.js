import styled from "styled-components";
export const ProfileImagesStyles = styled.div`
  h2 {
    margin-bottom: 10px;
  }
  .no-photos {
    margin-bottom: 20px;
  }
  .photos-wrapper {
    display: grid;
    overflow: hidden;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 10px;
  }
  div {
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
`;
