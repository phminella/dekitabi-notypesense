import styled from "styled-components";
export const ProfileGeneralDetailsStyles = styled.div`
  /* margin-top: -123px; */
  overflow: hidden;
  position: sticky;
  top: 60px;
  z-index: 1;
  .modal-wrapper {
    padding: 0 !important;
  }
  .profile-bold {
    font-size: 1.4em;
    font-weight: bold;
    line-height: 1em;
  }
  .profile-likes {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 5px;
    color: var(--pink);
    margin: 5px 0;
  }
  .profile-avatar-wrapper {
    display: grid;
    text-align: center;
    img {
      border: 5px solid white;
    }
  }
  .profile-header-description {
    background: var(--lightGray);
    color: var(--darkBlue);
    border-radius: 10px;
    padding: 10px;
  }
  li {
    margin-bottom: 5px;
  }
  .profile-header-wrapper {
    img {
      &.verified {
        filter: invert(66%) sepia(76%) saturate(1411%) hue-rotate(44deg)
          brightness(105%) contrast(102%);
      }
      &.licensed {
        filter: invert(56%) sepia(98%) saturate(1398%) hue-rotate(152deg)
          brightness(100%) contrast(108%);
      }
      &.driver {
        filter: invert(77%) sepia(80%) saturate(914%) hue-rotate(358deg)
          brightness(102%) contrast(106%);
      }
    }
    .star {
      filter: var(--pinkFilter);
    }
  }
  .upload-profile-pic {
    margin: 5px 0 10px 0;
    color: var(--blue);
    text-decoration: underline;
    cursor: pointer;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
    input {
      display: none;
    }
  }
  .language {
    gap: 5px;
    padding: 1px 0;
  }
  .profile-header-prices {
    margin-top: 10px;
    display: grid;
    justify-content: left;
    li {
      display: flex;
      gap: 10px;
      align-items: center;
      text-align: left;
      font-size: 0.9em;
      gap: 10px;
      img {
        filter: var(--blueFilter);
      }
      span {
        font-size: 1.3em;
        color: var(--darkBlue);
        font-weight: 700;
      }
    }
  }
  .transport {
    display: flex;
    gap: 5px;
    img {
      margin-top: 1px;
      filter: var(--pinkFilter);
    }
  }
  .normal-button {
    width: 100%;
  }
  .availability,
  .edit-profile {
    margin-top: 10px;
  }
  .profile-created {
    font-style: italic;
  }
  .profile-reply-time {
    margin-top: 5px;
    align-items: start;
    color: var(--darkBlue);
    span {
      margin-top: 2px !important;
    }
    img {
      filter: var(--blueFilter);
    }
  }
`;
