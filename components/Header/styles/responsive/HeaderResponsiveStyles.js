import styled from "styled-components";
export const HeaderResponsiveStyles = styled.header`
  .header-wrapper {
    @media (max-width: 600px) {
      .logo {
        height: 29px;
        width: 28px;
      }
    }
    @media (max-width: 1220px) {
      padding: 0 15px;
      max-width: 100vw;
    }
    @media (max-width: 880px) {
      grid-template-columns: 0.5fr 1.4fr 1fr;
      gap: 12px;
      .right-side {
        .right-side-list {
          gap: 12px;
        }
      }
    }
    @media (max-width: 912px) {
      grid-template-columns: 200px 1fr;
      .header-itineraries,
      .header-notifications,
      .header-settings {
        position: static;
        .itineraries,
        .notifications,
        .settings {
          position: absolute;
          width: calc(100% - 10px);
          margin: 0 5px;
          left: 0;
          top: 65px;
        }
      }
      .center {
        position: fixed;
        width: 100vw;
        height: 100dvh;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        max-width: 100vw;
        z-index: 9999;
        display: none;
        &.show-search {
          display: block;
        }
        .search {
          .header-search-input {
            max-width: 100vw;
            width: 100%;
            margin: 0 10px 0 10px;
            height: 60px;
            .search-button {
              display: none;
            }
            .search-input {
              height: 60px;
            }
            .close-icon {
              display: flex;
            }
          }
          .suggestions {
            max-width: calc(100% - 20px);
            margin: 0 10px;
          }
        }
      }
      .right-side {
        .right-side-list {
          li {
            .search-button-header {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
    @media (max-width: 570px) {
      grid-template-columns: 50px 1fr;
      .dekitabi-logo {
        img {
          margin-top: 3px;
        }
      }
    }
    @media (max-width: 345px) {
      grid-template-columns: 25px 1fr;
      .right-side {
        .right-side-list {
          gap: 5px !important;
        }
      }
    }
  }
`;
