import styled from "styled-components";
export const NoAttractionsStyles = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 0 7px;
  .itinerary-main {
    position: relative;
    max-width: 600px;
    max-height: 90vh;
    margin: 5vh auto;
    background: white;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    .close-icon {
      position: absolute;
      top: 15px;
      right: 15px;
      img {
        filter: var(--darkBlueFilter);
      }
    }
    .itinerary-main-bg {
      height: 100px;
      width: 100%;
      background-color: var(--lightGray);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--darkBlue);
      font-size: 2em;
      font-weight: 700;
      padding: 15px;
      border-bottom: 1px solid lightgray;
      p {
        max-width: 250px;
      }
    }
    .itinerary-main-wrapped {
      padding: 15px 20px 20px 20px;
      overflow-y: scroll;
      height: calc(90vh - 100px);
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: var(--lightGray);
        /* border-radius: 3px; */
      }
      ::-webkit-scrollbar-thumb {
        background: lightgray;
        /* border-radius: 3px; */
      }
    }
  }
  .tour-name {
    text-align: left;
  }
  h2 {
    font-weight: 700;
  }
  .show-original,
  .home-title {
    display: none;
  }
  .right-arrow,
  .left-arrow {
    top: -43px !important;
  }

  .no-attraction-msg {
    font-size: 1.1em;
    color: var(--darkBlue);
    text-align: left;
  }
  .no-attractions-add {
    .search-attraction-button {
      background-color: var(--blue) !important;
      border: none !important;
      padding: 20px;
      .itinerary-titles {
        color: white !important;
      }
      .icon-wrapper {
        display: none;
      }
      &:hover {
        background-color: var(--darkBlue) !important;
        border: none !important;
        .itinerary-titles {
          color: white;
        }
      }
    }
  }
  .no-attractions-title {
    padding-top: 20px;
    border-top: 1px solid lightgray;
    color: var(--pink);
    font-weight: 700;
    font-size: 1.4em;
    margin-top: 30px;
    padding-bottom: 15px;
    margin-bottom: 5px;
    text-align: center;
  }
  .no-attractions-title-3 {
    color: var(--darkBlue);
    font-size: 1.8em;
    margin: 0;
    padding: 0;
    font-weight: 700;
  }
  .hAOSrX .scroll-container {
    gap: 20px;
  }
  .no-attractions-title-2 {
    color: var(--darkBlue);
    font-weight: 500;
    font-size: 2.3em;
  }

  .title-wrapper {
    padding-bottom: 20px;
    .text-wrapper {
      display: flex;
      gap: 5px;
      justify-content: center;
      h2 {
        font-weight: 600;
        line-height: 1.3em;
        color: var(--darkBlue);
      }
      span {
        flex-shrink: 0;
        align-self: start;
      }
    }
  }
  .search-destination {
    margin-bottom: 20px;
    position: relative;
    input {
      height: 55px;
      background: white;
      padding: 0 10px 0 10px;
      border: 1px solid lightgray;
      margin: 0 0 10px 0;
      border-radius: 10px;
    }
    .search-wrapper {
      display: block;
      .close-icon {
        display: none;
      }
      .search-input {
        margin: 0;
      }
      .header-search-input,
      input,
      .suggestions {
        width: 100%;
        max-width: 100%;
        .suggestion {
          padding: 6px 5px;
          .marker-wrapper {
            width: 40px;
            height: 40px;
            img {
              width: 20px;
              height: 20px;
            }
          }
          .suggestion-country {
            margin: 0;
          }
        }
      }
    }
    .suggestions-bg,
    .search-button,
    .suggestion-country,
    .close-icon {
      display: none;
    }
  }
  .suggestions {
  }
  .suggestions {
    font-size: 0.9em;
    margin: 0 5px;
    width: calc(100% - 10px) !important;
    .marker-wrapper {
      width: 30px !important;
      height: 30px !important;
    }
  }
  @media (max-width: 500px) {
    .no-attractions-title,
    .no-attractions-title-2,
    .no-attractions-title-3 {
      text-align: left;
    }
    .normal-arrows,
    .right-arrow,
    .left-arrow {
      left: unset !important;
    }
  }
`;
