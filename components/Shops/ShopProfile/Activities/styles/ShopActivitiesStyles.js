import styled from "styled-components";
export const ShopActivitiesStyles = styled.div`
  .description-wrapper {
    position: relative;
    font-size: 1.1em;
    padding-bottom: 55px;
    .description {
      -webkit-box-orient: vertical;
      line-clamp: 1;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      word-wrap: break-all;
      font-size: 1em;
      line-height: 1.5em;
      width: 100%;
      overflow: hidden;
    }
    &.show {
      .description {
        line-clamp: unset;
        -webkit-line-clamp: unset;
        white-space: pre-wrap;
      }
    }
    .show-description {
      position: absolute;
      bottom: 15px;
      right: 0;
      left: 0;
      font-size: 1.1em;
    }
  }
  .activities-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    @media (max-width: 800px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 580px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
  .notification {
    margin: 30px 0 20px 0;
    .notification-title {
      font-size: 1.1em;
      font-weight: 600;
      color: var(--darkBlue);
    }
    .notification-message {
      font-size: 0.95em;
    }
  }
  #reviews {
    margin-top: 20px;
    .profile-title {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  .activity-contact {
    font-size: 1.1em;
    display: flex;
    gap: 5px;
    margin: 40px 0 20px 0;
    span {
      color: var(--blue);
    }
    img {
      margin-top: 3px;
      filter: var(--blueFilter);
    }
  }
`;
