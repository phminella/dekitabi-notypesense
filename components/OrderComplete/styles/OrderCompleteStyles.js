import styled from "styled-components";
export const OrderCompleteStyles = styled.div`
  background: var(--lightGray);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .order-wrapper {
    max-width: 800px;
    padding: 20px;
    border-radius: 5px;
    background: white;
    opacity: 0;
    overflow: hidden;
    transition: opacity 0.3s ease-in-out;
    &.show {
      opacity: 1;
    }
    .order-title {
      font-size: 1.2em;
      h1 {
        display: flex;
        gap: 10px;
        img {
          margin-top: 6px;
        }
      }
    }
    .back-home {
      display: block;
      margin: 10px 0 20px 0;
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--pink);
        }
      }
    }
    .order-charge {
      background: var(--lightGray);
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      padding: 15px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 10px;
      font-size: 1.1em;
      p {
        display: flex;
        gap: 10px;
        align-items: center;
        b {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }
      span {
        font-weight: 700;
        font-size: 1.3em;
      }
    }
    .order-details {
      padding: 15px;
      li {
        list-style: inside;
      }
    }
    .order-cart {
      margin-bottom: 30px;
      h3 {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 15px;
        background: var(--lightGray);
        line-height: 1em;
        margin-bottom: 20px;
      }
      .date-error {
        background: white !important;
        color: var(--blue) !important;
        text-decoration: underline !important;
      }
      span {
        font-size: 0.7em;
        font-weight: 400;
      }
      .cart-item-remove {
        display: none !important;
      }
    }
  }
  h2 {
    margin-bottom: 15px;
  }
  .home-step1 {
    margin: 0;
  }
`;
