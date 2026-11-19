import styled from "styled-components";
export const PhotosCarouselStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 9999;
  background: rgb(26, 43, 73, 0.9);
  .close-icon {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 10;
    img {
      filter: var(--whiteFilter) drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          filter: var(--pinkFilter);
        }
      }
    }
  }
  .image-delete {
    position: absolute;
    top: 100px;
    right: 30px;
    filter: var(--whiteFilter) drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        filter: var(--pinkFilter);
      }
    }
  }
  .spinner {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 15;
    height: 100%;
    width: 100%;
  }
  .swiper {
    .swiper-button-prev,
    .swiper-button-next {
      color: white;
    }
    .swiper-button-next {
      right: 50px;
    }
    .swiper-button-prev {
      left: 50px;
    }
    .slide-background {
      position: relative;
      max-width: 700px;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
  }
`;
