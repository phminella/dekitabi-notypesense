import styled from "styled-components";
export const ProfileTutorialStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  .tutorial-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100lvh;
    background: var(--blue);
    opacity: 0.8;
    z-index: -1;
  }
  .tutorial-wrapper {
    display: flex;
    top: 0;
    left: 0;
    align-items: center;
    padding: 10px;
    width: calc(100vw - 20px);
    height: 100vh;
    .title-dekitabi {
      display: flex;
      gap: 10px;
      color: var(--darkBlue);
      padding: 20px 20px 0 20px;
      font-size: 1.7em;
      span {
        flex-shrink: 0;
      }
      @media (max-width: 450px) {
        span {
          display: none !important;
        }
      }
    }
    h3 {
      padding-top: 0 !important;
      @media (max-width: 450px) {
        font-size: 1.3em !important;
      }
    }
    .tutorial-steps {
      margin: 0 auto;
      max-width: 500px;
      font-size: 1.1em;
      background: white;
      border-radius: 10px;
      .step-title {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 15px 0;
        flex-wrap: wrap;
      }
      .steps-wrapper {
        max-height: 70vh;
        overflow: auto;
        padding: 0 20px 20px 20px;
        border-top: 1px solid lightgray;
        margin-top: 10px;
      }
      .step-1 {
        .step-1-title {
          .edit-profile-button {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 10px;
            background: var(--blue);
            color: white;
            border-radius: 5px;
            cursor: default;
            img {
              filter: var(--whiteFilter);
            }
          }
        }
      }
      .step-2 {
        .step-2-title img {
          filter: var(--pinkFilter);
        }
      }
      .step-3 {
        .step-3-title {
          .itinerary-item {
            background: var(--darkBlue);
            color: white;
            border-radius: 10px;
            padding: 7px 12px;
            cursor: default;
            span {
              font-weight: 600;
              color: var(--pink);
            }
          }
          .audio-icon {
            filter: var(--pinkFilter);
          }
        }
      }
      .tutorial-buttons {
        margin-top: 30px;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(2, 1fr);
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 10px;
          background: var(--blue);
          color: white;
          border-radius: 10px;
          img {
            filter: var(--whiteFilter);
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--darkBlue);
            }
          }
        }
      }
      .tutorial-links {
        margin-top: 10px;
        text-align: right;
        a {
          color: var(--blue);
          text-decoration: underline;
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              color: var(--darkBlue);
            }
          }
        }
      }
    }
  }
`;
