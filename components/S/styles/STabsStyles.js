import styled from "styled-components";
export const STabsStyles = styled.div`
  margin-top: -60px;
  display: flex;
  justify-content: center;
  .tutorial-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgb(33, 134, 235, 0.4);
    z-index: 9998;
  }
  ul {
    position: relative;
    display: flex;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    justify-content: center;
    li {
      &.tutorial {
        .tab-buttons {
          transform: scale(1.15);
          background-color: var(--blue) !important;
          img {
            filter: var(--whiteFilter);
          }
        }
        z-index: 9999;
        .tutorial-message {
          background: white;
          position: absolute;
          top: 100%;
          left: 10px;
          width: 273px;
          padding: 15px;
          border-radius: 10px;
          .tutorial-sub-message {
            margin-top: 10px;
            border-top: 1px solid lightgray;
            padding-top: 10px;
            display: flex;
            gap: 5px;
            .tutorial-image {
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              background: var(--blue);
              width: 30px;
              height: 30px;
              border-radius: 50%;
              img {
                filter: var(--whiteFilter);
              }
            }
          }
        }
      }
    }
    .tab-buttons {
      display: grid;
      justify-content: center;
      gap: 5px;
      width: 60px;
      height: 60px;
      border-radius: 15px;
      white-space: nowrap;
      background: var(--lightGray);
      color: #777;
      border: 4px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease-in-out;
      img {
        filter: invert(50%) sepia(0%) saturate(1%) hue-rotate(22deg)
          brightness(93%) contrast(89%);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--blue);
          color: white;
          img {
            filter: var(--whiteFilter) !important;
          }
        }
      }
      &.tutorial {
        z-index: 5;
      }
      &.active {
        background: var(--darkBlue);
        color: white;
        img {
          filter: var(--whiteFilter) !important;
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background: var(--darkBlue);
            cursor: default;
          }
        }
      }
    }
  }
  @media (max-width: 310px) {
    button {
      width: 53px !important;
      height: 53px !important;
    }
  }
`;
