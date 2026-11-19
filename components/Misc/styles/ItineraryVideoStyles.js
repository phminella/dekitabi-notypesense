import styled from "styled-components";
export const ItineraryVideoStyles = styled.div`
  #itinerary-video {
    border-radius: 10px;
  }
  .video-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 450px;
    max-width: 950px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    .youtube {
      z-index: -1;
    }
    .fake-video {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100vw;
      max-width: 950px;
      min-height: 450px;
      z-index: 0;
      border-radius: 10px;
      button {
        position: absolute;
      }
    }
    iframe {
      margin-top: 15px;
      width: 100vw;
      max-width: 950px;
      min-height: 450px;
      border-radius: 10px;
    }
    video,
    .video-spinner {
      &.hide {
        display: none;
      }
    }
  }
  .video-language-button {
    margin: 10px 0 15px 0;
  }
  a,
  .video-language-button {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
`;
