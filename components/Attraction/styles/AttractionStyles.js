import styled from "styled-components";
export const AttractionStyles = styled.div`
  .modal-wrapper {
    padding: 0 !important;
  }
  .slide-background {
    position: relative;
    width: 100%;
    height: 600px;
  }
  .attraction-wrapper {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    .attraction-intro {
      position: relative;
      padding: 15px 45px 15px 0;
      width: 100%;
      .report-problem {
        position: absolute;
        right: 0;
        top: 12px;
        img {
          filter: var(--pinkFilter);
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            img {
              filter: var(--purpleFilter);
            }
          }
        }
      }
      .attraction-information {
        font-size: 1.2em;
      }
    }
    .attraction-title {
      display: flex;
      gap: 5px;
      flex-shrink: 0;
      span {
        height: 25px !important;
        flex-shrink: 0;
      }
      h1 {
        line-height: 1.1em;
        text-transform: capitalize;
      }
    }
    a {
      color: var(--blue);
      text-decoration: underline;
      word-break: break-all;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--pink);
        }
      }
    }
    p {
      margin-bottom: 3px;
    }
    .attraction-rating {
      display: flex;
      align-items: center;
      gap: 5px;
      margin: 5px 0;
      img {
        filter: var(--pinkFilter);
      }
      p {
        margin-top: 2px;
        margin-bottom: 0;
        span {
          color: gray;
        }
      }
    }
    .attraction-info {
      margin-top: 10px;
    }
    .attraction-date,
    .attraction-time,
    .attraction-duration,
    .attraction-item,
    .attraction-website,
    .attraction-tickets {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0 5px;
      text-transform: capitalize;
      img {
        filter: invert(19%) sepia(0%) saturate(1960%) hue-rotate(263deg)
          brightness(87%) contrast(70%);
      }
    }
    .attraction-website {
      text-transform: none;
    }
    .add-attraction-button {
      margin-top: 10px;
    }
    .carousel-wrapper {
      border-radius: 10px;
      background-color: lightgray;
    }
    .swiper {
      max-width: 500px;
      .swiper-button-prev,
      .swiper-button-next {
        color: white;
      }
      z-index: 0;
    }
    .attraction-tags {
      display: flex;
      gap: 10px;
      margin: 10px 0;
      flex-wrap: wrap;
      .tag {
        width: 74px;
        height: 74px;
        background: var(--lightGray);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          text-align: center;
          text-transform: capitalize;
        }
      }
    }
  }
  .attraction-more-info {
    position: relative;
    max-width: 1000px;
    min-height: 350px;
    display: grid;
    align-items: center;
    grid-template-columns: 30% 70%;
    gap: 15px;
    margin: 0 auto;
    @media (max-width: 1040px) {
      margin: 0 10px;
    }
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    &.always-open {
      grid-template-columns: 1fr;
    }
  }
  .map {
    position: relative;
    width: 100%;
    height: 350px;
  }
`;
