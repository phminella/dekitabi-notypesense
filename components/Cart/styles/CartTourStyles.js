import styled from "styled-components";
export const CartTourStyles = styled.div`
  margin-bottom: 10px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 500px) {
    border-radius: 0 !important;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }
  overflow: hidden;
  .cart-item-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 5px;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
      .attraction-image {
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        overflow: hidden;
      }
    }
    @media (hover: hover) and (pointer: fine) {
      a,
      button {
        &:hover {
          color: #000 !important;
        }
      }
    }
    .cart-item-icon {
      min-height: 150px;
      position: relative;
    }
    .cart-item-details {
      .cart-item-name {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 700;
        color: var(--darkBlue);
        span {
          color: gray;
        }
      }
      .cart-item-guide {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        a {
          color: var(--blue);
          text-decoration: underline;
        }
      }
      .cart-item-language-format,
      .cart-item-time {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
        img {
          filter: var(--pinkFilter);
        }
      }
      .cart-item-meeting-place {
        margin-top: 2px;
      }
      .cart-item-remove {
        display: flex;
        align-items: center;
        gap: 5px;
        button,
        a {
          text-transform: capitalize;
          color: var(--blue);
          text-decoration: underline;
        }
      }
      .language {
        display: flex;
        align-items: center;
        gap: 5px;
        border-radius: 5px;
        background: var(--lightGray);
        padding: 2px;
        font-size: 0.9em;
        img {
          filter: none;
        }
      }
      .date-error {
        background: #ff2e4a;
        padding: 1px 3px;
        border-radius: 5px;
        color: white !important;
        text-decoration: none !important;
        img {
          filter: var(--whiteFilter);
        }
      }
    }
    .cart-item-price {
      font-weight: 700;
      font-size: 1.1em;
      color: var(--darkBlue);
      &.coupon {
        font-weight: 700;
        font-size: 0.9em;
        color: var(--pink);
      }
    }
  }
`;
