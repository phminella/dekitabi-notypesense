import styled from "styled-components";
export const ShopProfileCarouselStyles = styled.div`
  position: relative;
  .swiper {
    margin-bottom: 15px;
    .swiper-button-prev,
    .swiper-button-next {
      color: white !important;
    }
  }
  .slide-background {
    position: relative;
    width: 100%;
    height: clamp(300px, 50vw, 550px); /* Responsive height with max cap */
    max-width: 1000px; /* Optional */
    margin: 0 auto;
    overflow: hidden;
    border-radius: 10px;
    aspect-ratio: 1 / 1;
    .image-delete {
      position: absolute;
      top: 20px;
      right: 30px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      img {
        filter: var(--blueFilter);
      }
      &:hover {
        background-color: var(--darkBlue);
        img {
          filter: var(--whiteFilter);
        }
      }
    }
    .image-first {
      right: 130px;
    }
    .image-add {
      right: 80px;
      .spinner p {
        display: none;
      }
      .carousel-add {
        border: none;
        top: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0;
        background: none;
        div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      h3,
      p,
      .uploads-left {
        display: none !important;
      }
      img {
        width: 20px !important;
        height: 20px !important;
      }
      .add-photo-img {
        content: url("/img/icon-plus.svg");
      }
    }
  }
  .first-image {
    position: absolute;
    top: 0;
  }
`;
