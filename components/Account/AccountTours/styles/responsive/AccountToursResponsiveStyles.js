import styled from "styled-components";
export const AccountToursResponsiveStyles = styled.div`
  position: relative;
  @media (max-width: 1000px) {
    .account-tours {
      margin: 10px 0 30px 0 !important;
    }
    margin: 20px 10px;
  }
  .close-icon {
    position: absolute;
    top: 25px;
    right: 20px;
    z-index: 1;
    filter: var(--whiteFilter);
  }
  @media (max-width: 780px) {
    .tours-tab {
      display: none;
    }
  }
  @media (min-width: 780px) {
    .responsive-tours-tab-wrapper {
      display: none;
    }
  }
  .tours-menu {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1em;
    background: var(--blue);
    color: white;
    border-radius: 5px;
    padding: 12px 10px;
    img {
      filter: var(--whiteFilter);
    }
  }
  .responsive-tours-tab {
    position: fixed;
    background: rgb(255, 255, 255, 0.9);
    color: white;
    width: 100%;
    height: 100lvh;
    top: 0;
    z-index: 10;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    right: -100vw;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
    padding: 10px;
    &.show {
      opacity: 1;
      right: 0;
      visibility: visible;
    }
    .close-icon {
      filter: var(--blueFilter);
    }
    h1 {
      margin-bottom: 20px;
      color: var(--pink);
    }
    ul {
      position: relative;
      li {
        width: 100%;
        margin: 0;
        button {
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          padding: 0 15px;
          height: 50px;
          color: white;
          background: var(--blue);
          border-radius: 10px;
          margin-bottom: 10px;
          gap: 5px;
          img {
            filter: var(--whiteFilter);
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--darkBlue);
            }
          }
        }
        li:last-child button {
          border-bottom: 1px solid lightgray;
        }
      }
    }
  }
  .scheduled-tour {
    @media (max-width: 540px) {
      grid-template-columns: 1fr;
    }
    @media (max-width: 780px) {
      .tour-wrapper {
        grid-template-columns: 1fr;
        .right-side {
          text-align: left;
          .tour-details,
          .tour-status {
            justify-content: left;
          }
          .tour-details {
            flex-wrap: wrap;
          }
          .tour-status {
            margin-top: 10px;
          }
          .review-tour {
            float: left;
          }
        }
      }
    }
  }
`;
