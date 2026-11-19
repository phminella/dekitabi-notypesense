import styled from "styled-components";
export const HeaderSettingsHeaderStyles = styled.div`
  .user-details {
    overflow: hidden;
    .avatar {
      width: 108px;
      position: absolute;
      top: 20px;
      left: 0;
      right: 0;
      margin: 0 auto;
      border: 4px solid white;
      z-index: 1;
    }
    .user-details-left {
      height: 100px;
      text-align: center;
      background: var(--blue);
    }
    .user-details-right {
      display: grid;
      align-items: center;
      justify-content: center;
      padding: 33px 10px 7px 10px;
      width: 100%;
      background: var(--darkBlue);
      color: white;
      border-bottom: 1px solid var(--lightGray);
    }
  }
  .header-badges {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
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
  .header-username {
    text-align: center;
    a {
      color: white;
      overflow-wrap: break-word;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 1.2em;
      font-weight: 600;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--blue);
        }
      }
    }
    .add-name {
      font-weight: 400;
      color: lightblue;
      text-decoration: underline;
      font-size: 0.9em;
    }
  }
  .account-status {
    margin-top: 5px;
    padding: 2px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    background: white;
    color: #ff892f;
    span {
      display: flex;
      gap: 5px;
      img {
        margin-top: 3px;
      }
    }
    img {
      filter: invert(78%) sepia(49%) saturate(5498%) hue-rotate(337deg)
        brightness(103%) contrast(103%);
    }
    a {
      font-size: 0.8em !important;
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  .header-rating {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9em;
    line-height: 0.9em;
    b {
      margin-top: 1px;
    }
  }
  &.guide-header {
    .user-details-right {
      text-align: center;
      /* border-bottom: none; */
      a {
        text-align: center;
        font-weight: 500;
        font-size: 1.1em;
      }
    }
  }
`;
