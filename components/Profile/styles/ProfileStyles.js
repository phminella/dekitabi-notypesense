import styled from "styled-components";
export const ProfileStyles = styled.div`
  position: relative;
  margin: 0 auto 20px auto;
  .availability-wrapper {
    .modal-wrapper {
      padding: 0 !important;
    }
  }
  .profile-section {
    padding: 15px;
  }
  .profile-content {
    position: relative;
    display: grid;
    grid-template-columns: 270px 1fr;
    gap: 20px;
    padding: 20px 10px;
    width: 100%;
    max-width: 1252px;
    margin: 0 auto;
    .profile-general-details-wrapper {
      margin-top: -80px;
      position: relative;
      order: -1;
    }
    .profile-info-wrapper {
      width: 100%;
      position: relative;
      overflow: hidden;
      .introduction span {
        background: var(--pink);
        color: white;
        padding: 0 3px;
        border-radius: 5px;
      }
    }
  }
  &.traveler-profile {
    .profile-content {
      /* display: block; */
      grid-template-columns: 1fr;
      gap: 0;
    }
    @media (max-width: 600px) {
      .profile-section {
        padding: 0;
      }
    }
    .profile-header-wrapper {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 10px;
      align-items: center;
      text-align: left;
      .normal-button {
        display: inline-flex;
        justify-content: left;
        background: none;
        padding: 0;
        margin: 0;
        color: var(--blue);
        text-decoration: underline;
        font-size: 1em;
        img {
          filter: var(--blueFilter);
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--darkBlue);
          }
        }
      }
      .profile-header-description {
        background: none;
        padding: 0;
      }
    }
    .profile-title {
      margin-top: 20px;
    }
    .profile-general-details-wrapper {
      background: white;
      /* box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
      padding: 10px;
      border-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      order: -1;
      margin-top: -100px;
    }
    .general-details {
      position: static;
      margin-top: 0;
      .upload-profile-pic {
        margin: 0;
      }
      .profile-header-badges {
        display: flex;
        gap: 5px;
      }
      .profile-created,
      .profile-likes {
        justify-content: left;
      }
    }
    .tour-alert,
    .tour-tags {
      display: none;
    }
    .tour-name {
      margin-top: 10px;
    }
    .edit-profile {
      .sub-title {
        display: none;
      }
    }
    .edit-profile-content {
      width: calc(100vw - 20px);
      max-width: 500px;
    }
    @media (max-width: 450px) {
      .profile-header-wrapper {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .normal-button {
        justify-content: center !important;
      }
      .profile-created,
      .profile-header-badges,
      .profile-likes {
        justify-content: center !important;
      }
    }
  }
`;
