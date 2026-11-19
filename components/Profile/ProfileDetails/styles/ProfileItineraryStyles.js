import styled from "styled-components";
export const ProfileItineraryStyles = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  /* The .image-container class needs to be applied to a div wrapped around the image you want to apply this filter to */
  .image-container {
    display: inline-block;
    position: relative;
    line-height: 0;
    background: #ffffff;
  }

  /* The .image-container class needs to be applied to a div wrapped around the image you want to apply this filter to */
  .image-container {
    display: inline-block;
    position: relative;
    line-height: 0;
    background: #ffffff;
  }
  transition: transform 0.1s ease-in-out;
  p {
    margin-bottom: 5px;
  }
  .swiper {
    cursor: grab;
    z-index: 0 !important;
    border-radius: 15px;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        .swiper-button-next,
        .swiper-button-prev {
          display: block;
        }
        img {
          filter: brightness(100%);
        }
      }
    }
    &.no-arrows {
      .swiper-button-next,
      .swiper-button-prev {
        display: none;
      }
    }
  }
  .swiper-slide {
    width: 100%;
    height: 270px;
    border-radius: 15px;
    overflow: hidden;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    display: none;
  }
  img {
    filter: brightness(85%);
  }
  .itinerary-name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: 700;
    font-size: 2.5em;
    line-height: 1em;
    overflow: hidden;
    margin-bottom: 0;
    text-transform: capitalize;
    padding: 10px 30px;
    z-index: 0;
  }
`;
