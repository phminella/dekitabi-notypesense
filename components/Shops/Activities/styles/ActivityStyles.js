import styled from "styled-components";
export const ActivityStyles = styled.div`
  margin: 0 10px;
  .edit-availability-button {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 2;
    border: 3px solid white;
  }
  .link,
  a {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .activity-name {
    width: 100%;
    position: relative;
    background-color: var(--lightGray);
    text-align: center;
    a {
      display: block;
      font-size: 1.2em;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      margin-top: 5px;
      img {
        filter: var(--blueFilter);
      }
      &:hover {
        img {
          filter: var(--darkBlueFilter);
        }
      }
    }
    h1 {
      display: inline-flex;
      margin: 0 auto;
      max-width: 1000px;
      padding: 15px 10px 0 10px;
      position: relative;
      font-size: 2.8em;
      line-height: 1em;
      .edit-information-button {
        right: 0px;
      }
    }
    .activity-rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      color: gray;
      margin-top: 5px;
      font-size: 0.9em;
      a {
        margin: 0;
        padding: 0;
      }
    }
  }
  .activity-title,
  .profile-title {
    font-size: 2em;
    font-weight: 700;
    color: var(--darkBlue);
  }
  .activity-title-details {
    margin: 30px 0 30px 0;
  }
  .cancellation-policy {
    margin-top: 30px;
  }
  .profile-title {
    margin-bottom: 30px;
  }
  .activity-photos {
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
    .swiper {
      .swiper-button-prev,
      .swiper-button-next {
        color: black;
      }
      .slide-background {
        position: relative;
        max-width: 100%;
        max-height: 600px;
        width: 100vw;
        height: 100vw;
        margin: 0 auto;
        border-radius: 20px;
        overflow: hidden;
        background-size: cover !important;
        background-position: center center !important;
      }
    }
  }
  .activity-wrapper {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 10px;
    padding: 10px;
    max-width: 1400px;
    margin: 0 auto;
    &.not-owner {
      @media (max-width: 1000px) {
        display: flex;
        flex-direction: column-reverse;
        flex-wrap: wrap;
      }
    }
    &.owner {
      max-width: 1000px;
      grid-template-columns: 1fr;
    }
    .activity-book-wrapper {
      position: relative;
      width: 100%;
      @media (max-width: 1000px) {
        margin-bottom: 20px;
      }
    }
    .activity-details {
      position: relative;
      width: 100%;
      overflow: hidden;
      .activity-description-wrapper {
        position: relative;
        font-size: 1.1em;
        overflow: hidden;
        .activity-description {
          -webkit-box-orient: vertical;
          line-clamp: 1;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          word-wrap: break-all;
          font-size: 1em;
          line-height: 1.5em;
          width: 100%;
          overflow: hidden;
          margin-bottom: 35px;
          .edit-information-button {
            top: 0;
          }
        }
        &.show {
          .activity-description {
            line-clamp: unset;
            -webkit-line-clamp: unset;
            white-space: pre-wrap;
          }
        }
        .show-description {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          font-size: 1.1em;
        }
      }
    }
    .activity-pay-onsite {
      margin-top: 20px;
      padding: 10px;
      background-color: #ececec;
      border-radius: 15px;
      display: flex;
      gap: 10px;
      font-size: 1.1em;
      color: var(--darkBlue);
      img {
        filter: var(--darkBlueFilter);
      }
    }
    .activity-button {
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
    .activity-notification-title {
      margin: 30px 0 15px 0;
      font-size: 1.2em;
      font-weight: 600;
      color: var(--darkBlue);
    }
    .activity-notification {
      font-size: 0.95em;
      margin-bottom: 20px;
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
    .price {
      display: grid;
      gap: 10px;
      grid-template-columns: 150px 100px;
      overflow-wrap: break-word;
      .price-details {
        max-width: 150px;
        overflow: hidden;
        border-right: 1px solid lightgray;
      }
      @media (max-width: 550px) {
        grid-template-columns: 1fr;
        gap: 0;
        .price-details {
          border: none;
        }
      }
    }
    .activity-reviews {
      position: relative;
      width: 100%;
      max-width: 1000px;
    }
  }
  .delete-activity-button {
    width: 100%;
    padding: 15px;
    background: #fa4157;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 1.1em;
    margin: 30px 0 20px 0;
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: #ff2e4a;
      }
    }
  }
`;
