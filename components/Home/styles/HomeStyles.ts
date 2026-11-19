import styled from "styled-components";
export const HomeStyles = styled.div`
  opacity: 0;
  visibility: hidden;
  transition: 0.5s opacity ease-in-out;
  margin-bottom: 30px;
  overflow: hidden;
  &.show {
    opacity: 1;
    visibility: visible;
  }
  margin-top: 60px;
  .welcome-scene {
    padding: 0 20px;
    @media (max-width: 600px) {
      padding: 0 10px;
    }
    position: relative;
    display: grid;
    gap: 20px;
    grid-auto-rows: 1fr;
    align-items: center;
    grid-template-columns: 460px 1fr;
    @media (max-width: 1250px) {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      gap: 0;
      justify-content: center;
    }
    .welcome-scene-wrapper {
      position: relative;
      padding: 20px 20px 0 20px;
      @media (min-width: 600px) and (max-width: 1250px) {
        padding: 20px 0 10px 0;
      }
      .subtitle {
        color: var(--darkBlue);
        font-weight: 700;
        font-size: 4em;
        line-height: 1.2em;
        overflow-wrap: break-word;
        @media (min-width: 550px) and (max-width: 1250px) {
          text-align: center;
          margin: 0 auto;
          max-width: 700px;
        }
      }
      @media (max-width: 600px) {
        padding: 0;
      }
      .home-search-responsive {
        border-radius: 10px;
        margin-top: 10px;
        button {
          background: var(--lightGray);
          width: calc(100% - 20px);
          height: 55px;
          color: gray;
          text-align: left;
          padding: 0 20px;
          border-radius: 10px;
          font-size: 1.1em;
          cursor: text;
        }
      }
    }
    .video-wrapper {
      @media (max-width: 1250px) {
        margin-bottom: 26px;
      }
      width: 100%;
      position: relative;
      /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
      border-radius: 10px;
      video {
        max-width: 100%;
        border-radius: 10px;
      }
    }
  }
  .home-social-media {
    padding-top: 40px;
    width: calc(100% - 20px);
    max-width: 1000px;
    margin: 0 auto;
  }
  .home-items-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    @media (max-width: 1200px) {
      margin: 0 10px;
    }
    .see-more {
      color: var(--blue);
      text-decoration: underline;
      font-size: 15px;
      font-weight: 400;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  .home-title {
    color: var(--darkBlue);
    font-size: 2.5em;
    font-weight: 700;
    line-height: 1em;
    margin: 40px 70px 40px 0;
    @media (max-width: 500px) {
      margin: 30px 70px 55px 0;
      font-size: 6vw;
      &.travelers-title {
        margin: 30px auto 30px auto;
      }
    }
    &.new-guides-title {
      span {
        color: var(--pink);
      }
    }
  }
  @media (max-width: 790px) {
    margin: 0 !important;
    .welcome-scene {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
    }
    .home-search-responsive {
      margin-top: 20px !important;
    }
    .home-step1 a {
      min-height: 320px;
    }
  }
  @media (max-width: 350px) {
    .welcome-scene {
      .subtitle {
        font-size: 3em !important;
      }
    }
  }
  .powered-by-stripe {
    padding: 0;
    h2 {
      font-size: 2.5em;
      @media (max-width: 500px) {
        font-size: 6vw;
      }
    }
    border: none;
    background: none;
  }
`;
