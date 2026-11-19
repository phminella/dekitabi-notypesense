import styled from "styled-components";
export const ItineraryCommentsStyles = styled.div`
  .title {
    font-weight: bold;
    font-size: 2em;
    color: var(--darkBlue);
    padding: 0 10px;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .spinner {
    max-width: 500px;
    min-height: calc(90vh - 150px) !important;
  }
  .comments-tab {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    button {
      padding: 0 10px;
      height: 45px;
      font-size: 1.1em;
      font-weight: 600;
      background: var(--lightGray);
      color: var(--darkBlue);
      border-bottom: 1px solid #e5e5e5;
      &.active {
        background: none;
        border-bottom: none;
        color: var(--darkBlue);
        border-top: 1px solid #e5e5e5;
      }
    }
    button:first-child {
      border-right: 1px solid #e5e5e5;
    }
  }
  .comments-wrapper {
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding: 0 10px 10px 10px;
    height: calc(90vh - 150px);
    overflow: auto;
    overflow-x: hidden;
    &.reviews-wrapper {
      height: calc(90vh - 105px);
    }
  }
  .no-reviews {
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      margin-top: 10px;
      padding: 0;
      font-size: 1.7em;
    }
  }
  .basic-modal {
    animation: none;
  }
  .modal-content {
    position: relative;
    min-width: 500px;
    max-width: 500px;
    margin: 0 auto !important;
    @media (max-width: 580px) {
      min-width: 50px;
    }
    max-height: 90vh;
    overflow: auto;
  }
  .modal-wrapper {
    padding: 0 !important;
    border-radius: 5px;
    .close-icon {
      top: 10px;
      right: 10px;
    }
  }
  .spinner {
    width: 100%;
    min-height: 100% !important;
    position: absolute;
    background: white;
    top: 0;
    z-index: 10;
  }
  .input-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 40px;
    border-top: 1px solid #e5e5e5;
    .reply {
      position: absolute;
      left: 10px;
      top: 11px;
      color: #a5a5a5;
      font-size: 1.1em;
    }
    input {
      border-radius: 0;
      padding: 0 10px;
    }
    button img {
      filter: var(--darkBlueFilter);
      &:hover {
        filter: var(--pinkFilter);
      }
    }
  }
  .show-more {
    margin-top: 10px;
    color: var(--darkBlue);
    font-weight: 600;
    text-align: left !important;
    display: flex;
    align-items: center;
    gap: 5px;
    hr {
      display: inline-flex;
      width: 40px;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--pink);
      }
    }
  }
  .show-more-reply {
    position: relative;
    margin-left: 40px;
    .show-more-button {
      margin-top: 10px;
      color: var(--darkBlue);
      font-weight: 600;
      text-align: left !important;
      display: flex;
      align-items: center;
      gap: 5px;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--pink);
        }
      }
    }
    hr {
      display: inline-flex;
      width: 40px;
    }
  }
  .comments-guidelines {
    border-top: 1px solid lightgray;
    background: var(--lightGray);
    color: var(--darkBlue);
    padding: 10px;
    font-size: 0.8em;
    a {
      color: var(--blue);
      text-decoration: underline;
      font-size: 1em;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--pink);
        }
      }
    }
  }
`;
