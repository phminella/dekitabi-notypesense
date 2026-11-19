import styled from "styled-components";
export const HeaderMenuStyles = styled.div`
  position: fixed;
  background: white;
  @media (min-width: 1000px) {
    background: rgb(255, 255, 255, 0.95);
  }
  width: 100%;
  height: 100lvh;
  top: 0;
  color: var(--darkBlue);
  font-weight: 600;
  z-index: 10;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  .close-icon-menu {
    filter: var(--blueFilter);
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        filter: var(--pinkFilter);
      }
    }
  }
  .close-icon-menu {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    @media (min-width: 1000px) {
      top: 5px;
      right: 5px;
    }
  }
  .header-menu-wrapper {
    @media (min-width: 1000px) {
      position: relative;
    }
    background-color: white;
    /* border: 1px solid lightgray; */
    padding: 25px;
    border-radius: 10px;
  }
  .menu-ul {
    font-size: 1.7em;
    position: relative;
    margin: 20px 0;
    li {
      width: 100%;
      margin: 10px 0;
      a {
        color: var(--darkBlue);
        font-weight: 600;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--blue);
          }
        }
      }
    }
  }
  .settings-ul {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    margin-bottom: 25px;
    .settings-li {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      justify-content: left;
      p {
        display: flex;
        align-items: center;
        gap: 5px;
        width: 100%;
      }
      .currency-button {
        position: relative;
        padding: 10px;
        .arrow {
          position: absolute;
          right: 0;
          top: 30%;
        }
      }
    }
    .language-currency {
    }
    &.no-user .language-currency {
      padding: 10px 15px;
    }
  }
  .apps {
    display: flex;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
    img {
      transition: all 0.1s ease-in-out;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          transform: scale(1.02);
        }
      }
    }
  }
  .footer-social-media {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 12px;
    margin-top: 20px;
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
`;
