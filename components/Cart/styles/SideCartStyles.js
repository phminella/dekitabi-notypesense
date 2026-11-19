import styled from "styled-components";
export const SideCartStyles = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 9998;
  .cart-bg {
    position: fixed;
    top: -100lvh;
    left: 0;
    width: 100vw;
    height: 100lvh;
    background: var(--blue);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    visibility: hidden;
  }
  .cart-wrapper {
    position: absolute;
    top: 0;
    right: -450px;
    background: white;
    width: 100%;
    max-width: 450px;
    height: 100dvh;
    transition: all 0.2s ease-in-out;
    .close-cart {
      position: absolute;
      top: 26px;
      right: 30px;
    }
    h3 {
      padding: 20px 10px 10px 10px;
    }
    .cart {
      margin-bottom: 20px;
      max-height: 400px;
      overflow-y: auto;
      padding: 0 10px;
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
        background-color: white;
      }
      &::-webkit-scrollbar-thumb {
        background: lightgray;
        border-radius: 5px;
      }
      .empty-cart {
        font-size: 1.1em;
      }
    }
  }
  &.show {
    right: 0;
    .cart-bg {
      top: 0;
      visibility: visible;
      opacity: 0.8;
    }
    .cart-wrapper {
      right: 0;
    }
  }
`;
