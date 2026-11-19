import styled from "styled-components";
export const MapStyles = styled.div`
  height: calc(100dvh - 60px);
  width: 100%;
  position: sticky;
  background-color: var(--lightGray);
  top: 60px;
  overflow: hidden;
  z-index: 1;
  .gm-style-iw-ch {
    padding-top: 0 !important;
  }
  .show-map {
    position: absolute;
    top: 10px;
    left: 15px;
  }
  .gm-style-iw,
  .gm-style-iw-c,
  .gm-style-iw-d {
    padding: 0 !important;
  }
  .gm-ui-hover-effect {
    display: none !important;
  }
  .gm-style-iw-d {
    max-width: 240px;
    overflow: hidden !important;
  }
  .pagination-map {
    display: none;
    position: absolute;
    bottom: 30px;
    left: 10px;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    padding: 5px;
    border-radius: 10px;
    &.is-pwa {
      bottom: 100px;
    }
    .MuiPagination-ul {
      display: grid;
      gap: 5px;
    }
    button {
      font-size: 1.1em;
      background: white;
    }
    .Mui-selected {
      background: var(--blue) !important;
      color: white;
    }
    li:first-child svg {
      transform: rotate(90deg);
    }
    li:last-child svg {
      transform: rotate(90deg);
    }
  }
  .search-area-button {
    position: absolute;
    top: 20px;
    left: 50%;
    margin: 0 auto;
    background: var(--blue);
    padding: 0 10px;
    height: 40px;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    transform: translateX(-50%);
    border-radius: 10px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    .search-icon {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--darkBlue);
      }
    }
  }
  .close-icon img {
    filter: none !important;
  }
`;
