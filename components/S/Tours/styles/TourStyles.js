import styled from "styled-components";
export const TourStyles = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
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
    overflow: hidden;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        .swiper-button-next,
        .swiper-button-prev {
          display: block;
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

  .tour-attraction-name {
    position: absolute;
    top: 10px;
    right: 5px;
    padding: 10px;
    border-radius: 5px;
    background: white;
    font-weight: 600;
    font-size: 0.9em;
    z-index: 4;
    line-height: 1.2em;
    margin-right: 10px;
    max-width: calc(100% - 100px);
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--blue);
      }
    }
  }
  .tour-details {
    color: var(--darkBlue);
    .tour-tags {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 5px;
      li {
        background: var(--lightGray);
        padding: 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        font-size: 0.8em;
        gap: 5px;
        color: var(--darkBlue);
      }
    }
    .tour-name {
      margin-top: 5px;
      font-weight: 700;
      font-size: 1.1em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 0;
      text-transform: capitalize;
    }
  }
  .star {
    filter: var(--pinkFilter);
  }
  .tour-time {
    display: grid;
    align-items: start;
    flex-wrap: wrap;
    gap: 0 5px;
    border-radius: 10px;
    color: var(--darkBlue);
    img {
      filter: var(--darkBlueFilter);
    }
  }
`;
