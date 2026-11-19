import styled from "styled-components";
export const CheckoutStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  h2 {
    position: relative;
    display: flex;
    align-items: start;
    gap: 10px;
    img {
      margin-top: 2px;
      filter: var(--darkBlueFilter);
    }
    &.review-items {
      margin: 20px;
    }
    &.checkout-title {
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      line-height: 0.8em;
      font-size: 1.8em;
      border-bottom: 1px solid var(--lightGray);
      padding: 10px;
      background: var(--darkBlue);
      color: white;
      span {
        margin-left: 5px;
        font-size: 0.4em;
        background: #6772e5;
        font-weight: 600;
        padding: 10px;
        color: white;
        border-radius: 5px;
        line-height: 0.4em;
      }
      img {
        filter: none;
      }
    }
  }
  .guide-alert {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px;
    background: #fdf7df;
    border: 1px solid #feec6f;
    color: #c9971c;
    border-radius: 10px;
    margin-top: 5px;
    img {
      filter: invert(51%) sepia(93%) saturate(388%) hue-rotate(5deg)
        brightness(99%) contrast(93%);
    }
  }
  .checkout-right-side {
    position: relative;
    background: var(--darkBlue);
    min-height: 100vh;
    h2 {
      color: var(--darkBlue);
    }
  }
  .error {
    background-color: #fee;
    border: 1px solid #edd;
    color: #a66;
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
  }
`;
