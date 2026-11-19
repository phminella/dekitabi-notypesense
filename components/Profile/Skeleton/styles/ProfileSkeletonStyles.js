import styled from "styled-components";
export const ProfileSkeletonStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  .skeleton-main-profile {
    position: relative;
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 20px;
    padding: 20px 10px;
    width: 100%;
    max-width: 1252px;
    margin: 0 auto;
    .profile-general-details-wrapper {
      position: relative;
    }
    .profile-info-wrapper {
      width: 100%;
      position: relative;
    }
    .skeleton-general-details {
      margin-top: -143px;
      z-index: 10;
    }
  }
  @media (max-width: 800px) {
    h1 {
      margin-top: 0;
    }
    .skeleton-main-profile {
      grid-template-columns: 1fr;
    }
    .skeleton-general-details {
      display: grid;
      justify-content: center;
    }
  }
`;
