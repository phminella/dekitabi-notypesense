import styled from "styled-components";
export const FooterStyles = styled.div`
  position: relative;
  background: var(--darkBlue);
  padding: 50px 30px 10px 30px;
  font-size: 1.1em;
  color: white;
  .footer-wrapper {
    .footer-lists {
      display: grid;
      max-width: 1000px;
      overflow: hidden;
      margin: 0 auto;
      grid-template-columns: 0.9fr 0.9fr 1fr 1.2fr 1fr;
      margin-bottom: 20px;
      gap: 50px;
      a {
        text-decoration: none;
        color: white;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--blue);
          }
        }
      }
      .footer-normal-list {
        li {
          margin-bottom: 10px;
          text-transform: capitalize;
        }
      }
      .footer-column {
        .footer-title {
          font-weight: 600;
          font-size: 1.1em;
          margin-bottom: 5px;
          color: white;
        }
        &.footer-options li {
          .currency-button {
            position: relative;
            background: white;
            width: 100%;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 5px;
            span {
              color: var(--darkBlue);
            }
            .arrow {
              position: absolute;
              right: 5px;
              top: 15%;
              font-size: 1.8em;
            }
            img {
              width: 25px !important;
            }
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                color: var(--darkBlue);
              }
            }
          }
        }
        .payment-methods {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;
          background: white;
          border-radius: 5px;
          padding: 3px;
          .payment-method {
            border-radius: 0px;
            padding: 1px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .app {
        h4 {
          color: var(--blue);
          margin-bottom: 5px;
        }
        .qr-code {
          border-radius: 10px;
        }
        .app-wrapper-desktop {
          text-align: center;
        }
        .app-wrapper-mobile {
          display: flex;
          flex-direction: column-reverse;
          .logo {
            margin-bottom: 15px;
          }
        }
      }
    }
    .footer-links {
      max-width: 1000px;
      overflow: hidden;
      margin: 25px auto 25px auto;
      display: flex;
      gap: 40px;
      align-items: center;
      flex-wrap: wrap;
    }
    .footer-end {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      /* padding-top: 10px; */
      span {
        color: var(--pink);
        font-weight: bold;
      }
      .footer-social-media {
        display: flex;
        align-items: center;
        justify-content: right;
        gap: 9px;
        margin-right: 60px;
        .tiktok,
        .twitter,
        .threads {
          filter: var(--whiteFilter);
        }
        a {
          img {
            transition: all 0.1s ease-in-out;
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              img {
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }
  }
  .dekitabi {
    text-transform: none;
  }
  @media (hover: hover) and (pointer: fine) {
    a {
      &:hover {
        color: var(--pink);
      }
    }
  }
  @media (max-width: 760px) {
    .logo {
      margin-top: 20px;
    }
    .app-wrapper-mobile {
      flex-direction: column !important;
    }
    .footer-lists {
      margin-bottom: 5px !important;
    }
  }
  &.pwa {
    padding-bottom: 100px !important;
    .app-store-image {
      display: none;
    }
  }
  &.affiliates-footer {
    .footer-options {
      display: block !important;
    }
    .footer-wrapper {
      .footer-lists {
        max-width: 550px;
        grid-template-columns: 200px 150px 200px;
        justify-content: left;
        gap: 30px;
        .app-wrapper-desktop {
          text-align: left;
        }
      }
      .footer-links {
        justify-content: center;
      }
    }
  }
`;
