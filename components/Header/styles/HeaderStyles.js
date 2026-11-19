import styled from "styled-components";
export const HeaderStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  background: white;
  /* overflow: hidden; */
  .header-wrapper {
    position: relative;
    display: grid;
    max-width: 1200px;
    margin: 0 auto;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    height: 60px;
    width: 100%;
    .left-side {
      display: flex;
      align-items: center;
    }
    .center {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      max-width: 400px;
    }
    .right-side {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: right;
      padding-right: 8px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.8s ease-in-out;
      &.show {
        position: static;
        opacity: 1;
        visibility: visible;
      }
      .right-side-list {
        display: flex;
        align-items: center;
        justify-content: right;
        gap: 9px;
        li {
          &.no-app-available {
            display: none;
            @media (hover: hover) and (pointer: fine) {
              display: block;
            }
          }
          .mobile-button {
            img {
              filter: var(--darkBlueFilter);
              @media (hover: hover) and (pointer: fine) {
                &:hover {
                  filter: var(--pinkFilter);
                }
              }
            }
          }
          .header-icon {
            display: flex;
            align-items: center;
          }
          .signed-in {
            display: flex;
            align-items: center;
          }
          .header-icon {
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                filter: var(--pinkFilter);
              }
            }
          }
          .search-button-header {
            display: none;
          }
          &.availability {
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                img {
                  filter: var(--pinkFilter);
                }
              }
            }
          }
        }
      }
    }
  }
  &.checkout {
    .header-wrapper {
      max-width: 100%;
      padding: 0 20px;
    }
  }
`;
