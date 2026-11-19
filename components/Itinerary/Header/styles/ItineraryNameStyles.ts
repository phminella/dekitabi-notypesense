import styled from "styled-components";
export const ItineraryNameStyles = styled.div`
  position: relative;
  .itinerary-name {
    width: 100%;
    max-width: 450px;
    overflow-wrap: break-word;
    word-break: break-word;
    h2,
    h1 {
      color: white;
    }
    button {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      background: var(--blue);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      img {
        filter: var(--whiteFilter);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--darkBlue);
        }
      }
    }
    h1 {
      width: 100%;
      position: relative;
      font-size: 3.5em;
      margin-top: 80px;
      line-height: 1.22em;
      background: white;
      color: var(--darkBlue);
      padding: 5px !important;
      border-radius: 10px;
      @media (max-width: 400px) {
        font-size: 2.8em;
      }
      &.creator {
        padding-right: 40px !important;
      }
      button {
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        img {
          filter: var(--pinkFilter);
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background: none;
            img {
              filter: var(--darkBlueFilter);
            }
          }
        }
      }
    }
  }
  form {
    background: white;
    border-radius: 10px;
    padding: 10px 5px;
    margin-top: 80px;
    .form-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;
      input {
        border: none;
        padding: 0 5px;
        font-size: 2em !important;
        font-weight: 600;
        background: white;
        height: 50px;
      }
      button {
        width: 50px !important;
        height: 50px !important;
        border-radius: 5px;
        @media (max-width: 400px) {
          width: 35px !important;
          height: 35px !important;
        }
      }
    }
    p {
      border-top: 1px solid var(--darkBlue);
      margin-top: 10px;
      padding: 10px 5px 0 5px;
      font-size: 0.9em;
      color: var(--darkBlue);
    }
  }
`;
