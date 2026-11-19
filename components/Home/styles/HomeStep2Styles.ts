import styled from "styled-components";
export const HomeStep2Styles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 50px;
  .swiper-pagination {
    /* bottom: -15px; */
    .swiper-pagination-bullet {
      height: 18px;
      width: 18px;
      opacity: 0.5;
    }
  }
  .remove-space {
    .swiper-wrapper {
      transform: none !important;
    }
  }
  .step2-title {
    font-size: 1.4em;
    color: var(--darkBlue);
    font-weight: bold;
    &:first-child {
      margin-top: 0;
    }
  }
  .step-content {
    display: grid;
    grid-template-columns: 250px 1fr;
    align-items: center;
    gap: 40px;
    padding: 0 10px;
    @media (max-width: 650px) {
      grid-template-columns: 180px 1fr;
    }
    @media (max-width: 580px) {
      grid-template-columns: 1fr;
      .step-summary {
        display: none;
      }
      .step-swiper {
        background: none;
        padding: 0;
      }
      padding: 0;
    }
    button {
      display: grid;
      align-items: start;
      gap: 5px;
      grid-template-columns: 25px 1fr;
      font-size: 1.1em;
      font-weight: bold;
      color: lightgray;
      transition: all 0.3s ease-in-out;
      text-align: left;
      margin: 15px 0;
      @media (max-width: 650px) {
        font-size: 1em;
      }
      .circle {
        padding: 5px;
        border-radius: 50%;
        flex-shrink: 0;
        transition: all 0.3s ease-in-out;
        div {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: lightgray;
          transition: all 0.3s ease-in-out;
        }
      }
      &.active {
        color: var(--blue);
        .circle {
          outline: 1px dashed var(--blue);
          div {
            background: var(--blue);
            transform: scale(1.2);
          }
        }
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
          .circle {
            outline: 1px dashed var(--darkBlue);
            div {
              background: var(--darkBlue);
              transform: scale(1.2);
            }
          }
        }
        &.active {
          color: var(--blue);
          cursor: default;
          .circle {
            outline: 1px dashed var(--blue);
            div {
              background: var(--blue);
              transform: scale(1.2);
            }
          }
        }
      }
    }
  }
  .step-swiper {
    height: 450px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    flex-shrink: 0;
    background: var(--lightGray);
    padding: 15px;
    border-radius: 15px;
    .step {
      position: relative;
      max-width: 300px;
      border-radius: 30px;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      @media (max-width: 850px) {
        max-width: 500px;
      }
      .step-wrapper {
        width: 100%;
        height: 450px;
        .step-title {
          font-weight: bold;
        }
      }
      .step-number {
        position: absolute;
        top: 15px;
        right: 25px;
        color: var(--darkBlue);
        height: 50px;
        width: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.9em;
        font-weight: 700;
        z-index: 1;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        @media (min-width: 850px) {
          filter: blur(3px);
          transition: all 0.3s ease-in-out;
        }
      }
      img {
        filter: brightness(70%);
      }
      @media (min-width: 850px) {
        img {
          filter: blur(3px) brightness(60%);
          transition: all 0.3s ease-in-out;
        }
      }
      .step-text {
        position: absolute;
        background: white;
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        padding: 15px;
        width: calc(100% - 50px);
        bottom: 40px;
        left: 0;
        right: 0;
        margin: 0 auto;
        font-size: 1.1em;
        @media (min-width: 850px) {
          filter: blur(3px);
          transition: all 0.3s ease-in-out;
        }
        h2 {
          font-size: 1.3em;
        }
      }
      &:nth-child(3) {
        .step-text {
          bottom: 150px;
        }
      }
      @media (min-width: 850px) {
        &.active {
          .step-text,
          .step-number {
            filter: blur(0);
          }
          img {
            filter: blur(0) brightness(60%);
          }
        }
      }
    }
  }
  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    .steps {
      border: none;
    }
  }
  @media (max-width: 350px) {
    .step-swiper {
      width: 250px;
      height: 380px;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--darkBlue);
    font-weight: bold;
  }
`;
