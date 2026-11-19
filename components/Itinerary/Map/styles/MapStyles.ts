import styled from "styled-components";
export const MapStyles = styled.div`
  height: calc(100dvh - 60px);
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: sticky;
  top: 60px;
  .gm-style-iw-ch {
    padding-top: 0 !important;
  }
  @media screen and (max-width: 990px) {
    padding-right: 0;
  }
  .show-map {
    position: absolute;
    top: 10px;
    left: 15px;
    @media (max-width: 990px) {
      left: unset;
      right: 15px;
    }
  }
  .gm-ui-hover-effect {
    display: none !important;
    opacity: 0 !important;
  }
  transition: right 0.3s ease-in-out;
  .map {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    .open-map {
      position: absolute;
      top: 10px;
      right: 10px;
      @media (max-width: 990px) {
        right: unset;
        left: 10px;
      }
      background: var(--blue);
      display: flex;
      align-items: center;
      padding: 8px;
      border-radius: 15px;
      line-height: 1em;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      span {
        font-size: 0.8em;
        color: white;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--darkBlue);
          text-decoration: none;
        }
      }
    }
  }
  .gm-style-iw,
  .gm-style-iw-c,
  .gm-style-iw-d {
    padding: 0 !important;
  }
  .gm-ui-hover-effect {
    display: none;
  }
  .gm-style-iw-d {
    max-width: 240px;
    overflow: hidden !important;
  }
`;
