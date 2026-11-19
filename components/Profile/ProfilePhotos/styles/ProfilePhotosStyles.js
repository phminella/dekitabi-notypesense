import styled from "styled-components";
export const ProfilePhotosStyles = styled.div`
  .carousel-add-photo-wrapper {
    background: var(--lightGray);
    min-height: 300px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .input-photos {
      color: var(--darkBlue);
      img {
        filter: var(--purpleFilter);
      }
    }
  }
  .profile-photos {
    position: relative;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 15px;
    overflow: hidden;
    .profile-photos-wrapper {
      position: relative;
      display: grid;
      align-items: center;
      justify-content: left;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      height: 500px;
      margin: 0 auto;
      &.two-grid {
        grid-template-columns: 1.3fr 0.7fr;
      }
      .left-frame {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        .left-frame-photo-wrapper {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          cursor: pointer;
        }
        .view-all {
          background: white;
          border-radius: 5px;
          position: absolute;
          font-weight: 600;
          top: 40px;
          left: 40px;
          padding: 10px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px;
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--darkBlue);
              color: white;
            }
          }
        }
        .add-photo-button {
          border-radius: 50%;
          position: absolute;
          background: white;
          border-radius: 5px;
          width: 50px;
          height: 50px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px;
          top: 100px;
          left: 40px;
          padding: 10px;
          h3,
          span,
          p {
            display: none;
          }
          div {
            display: flex;
            align-items: center;
            justify-content: left;
          }
          .circular-progress {
            width: 35px !important;
            height: 35px !important;
          }
          img {
            filter: var(--purpleFilter);
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--darkBlue);
              img {
                filter: var(--whiteFilter);
              }
            }
          }
        }
      }
      .right-frame {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        cursor: pointer;
        .right-frame-bottom {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          &.two-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      }
      .left-frame,
      .right-frame-top,
      .right-frame-bottom-left,
      .right-frame-bottom-right {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }
  .uploads-left {
    background: var(--lightGray);
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    font-size: 1.1em;
    color: gray;
    b {
      color: var(--pink);
    }
  }
  @media (max-width: 1250px) {
    .right-frame-bottom {
      grid-template-columns: 1fr !important;
      .right-frame-bottom-right {
        display: none;
      }
    }
  }
  @media (max-width: 500px) {
    .right-frame {
      display: none !important;
    }
    .view-all {
      left: 10px !important;
    }
    .profile-photos-wrapper {
      grid-template-columns: 1fr !important;
    }
  }
`;
