import styled from "styled-components";
export const AddAttractionStyles = styled.div`
  position: relative;
  .basic-modal {
    display: flex;
    align-items: start;
    .modal-wrapper {
      width: calc(100vw - 20px);
      max-width: 550px;
      overflow: visible;
      padding: 0;
    }
  }
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    text-align: center;
    z-index: 9999;
  }
  .close-icon-2 {
    position: absolute;
    top: 25px;
    right: 10px;
    filter: var(--blueFilter);
    z-index: 1;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        filter: var(--darkBlueFilter);
      }
    }
  }
  .icon-wrapper {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    background: var(--darkBlue);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 5px;
  }
  .pin-plus {
    margin: 0 auto;
    filter: var(--whiteFilter);
  }
  .search-attraction-button {
    position: relative;
    display: grid;
    justify-content: left;
    grid-template-columns: 90px 1fr;
    gap: 5px;
    width: 100%;
    padding: 10px 0;
    border: 1px solid lightgray;
    background: var(--lightGray);
    border-radius: 10px;
    .icon-wrapper {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      margin-bottom: 5px;
      border: 5px solid var(--blue);
    }
    .itinerary-titles {
      font-size: 1.2em;
      font-weight: 600;
      display: flex;
      align-items: center;
      height: 100%;
      color: var(--blue);
    }
    .pin-plus {
      margin: 0 auto;
      filter: var(--blueFilter);
    }
    &:hover {
      background: #f5f5f5;
      .itinerary-titles {
        color: var(--darkBlue);
      }
      .icon-wrapper {
        border: 5px solid var(--darkBlue);
        .pin-plus {
          filter: var(--darkBlueFilter);
        }
      }
    }
  }
  .adding {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.95);
    z-index: 5;
    border-radius: 20px;
    font-size: 1.3em;
    font-weight: bold;
    color: var(--blue);
    div {
      text-align: center;
    }
    img {
      filter: var(--blueFilter);
    }
  }
  .add-attraction-wrapper {
    .add-attraction-title {
      font-size: 1.5em;
      font-weight: bold;
      text-align: center;
      line-height: 1em;
      color: white;
      background-color: var(--darkBlue);
      padding: 15px;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }
    .sub-title {
      font-size: 1.2em;
      color: var(--darkBlue);
      font-weight: 700;
      display: flex;
      gap: 5px;
      margin-bottom: 10px;
      button {
        img {
          filter: var(--blueFilter);
        }
        &:hover {
          img {
            filter: var(--darkBlueFilter);
          }
        }
      }
    }
    input {
      height: 55px;
      background: var(--lightGray);
      padding: 0 10px 0 10px;
      border: 1px solid lightgray;
      margin: 0 0 10px 0;
    }
    .duration-error {
      border: 3px solid red;
    }
    .search-attraction-wrapper {
      padding: 15px 15px 25px 15px;
    }
    .search-attraction {
      position: relative;
    }
    .normal-button {
      border-radius: 10px;
      height: 50px;
    }
    .link {
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
    .normal-button {
      width: 100%;
    }
  }
  .attraction-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
    color: var(--darkBlue);
    font-weight: 600;
    text-transform: capitalize;
    margin-bottom: 10px;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--lightGray);
      }
    }
    .attraction-image-wrapper {
      position: relative;
      height: 45px !important;
      width: 45px !important;
      border-radius: 50% !important;
      overflow: hidden;
      border: 3px solid var(--darkBlue);
      flex-shrink: 0;
      overflow: hidden;
    }
    .attraction-image-wrapper-google {
      display: flex;
      align-items: center;
      justify-content: center;
      background: lightblue;
      img {
        filter: var(--darkBlueFilter);
      }
    }
    .attraction-content {
      p {
        text-align: left;
        margin-bottom: 0px;
        &.attraction-state {
          color: gray;
          font-size: 0.9em;
          font-weight: 400;
        }
      }
    }
  }
  .search-destination-wrapper {
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
    font-size: 0.9em;
    .marker-wrapper {
      width: 30px !important;
      height: 30px !important;
    }
  }
  &.no-attractions {
    .transit-time-line {
      display: none;
    }
    .search-attraction-button {
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      border: 1px solid var(--darkBlue);
      .close-icon {
        display: none;
      }
      .icon-wrapper {
        margin: 0;
        border: 5px solid var(--darkBlue);
      }
      .itinerary-titles {
        color: var(--darkBlue);
      }
      .pin-plus {
        filter: var(--darkBlueFilter);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: #f5f5f5;
          border: 1px solid var(--blue);
          .icon-wrapper {
            background: none;
            margin: 0;
            border: 5px solid var(--blue);
          }
          .itinerary-titles {
            color: var(--blue);
          }
          .pin-plus {
            filter: var(--blueFilter);
          }
        }
      }
    }
  }
  .error-message {
    margin: 0 0 10px 0;
  }

  .new-itinerary {
    position: relative;
    align-items: center;
    border: 1px solid var(--darkBlue);
    padding: 5px 0;
    .icon-wrapper {
      border: none;
      background: #b3e6f4;
    }
    .itinerary-titles {
      color: var(--darkBlue);
    }
    .pin-plus {
      filter: var(--darkBlueFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--lightGray);
        border: 1px solid var(--darkBlue);
        .icon-wrapper {
          border: none;
        }
        .itinerary-titles {
          color: var(--darkBlue);
        }
        .pin-plus {
          filter: var(--darkBlueFilter);
        }
      }
    }
  }
  .text-wrapper {
    .itinerary-titles {
      height: auto;
    }
    .normal-button {
      margin-top: 5px;
      padding: 7px;
    }
  }
`;
