import styled from "styled-components";
export const ShopActivityStyles = styled.li`
  position: relative;
  width: 100%;
  padding-bottom: 60px;
  /* border: 1px solid lightgray; */
  border-radius: 5px;
  overflow: hidden;
  a {
    color: var(--darkBlue);
    text-decoration: none;
  }
  .shop-buttons {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 6px;
    z-index: 1;
    button,
    a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      img {
        filter: var(--blueFilter);
      }
      &:hover {
        background-color: var(--darkBlue);
        img {
          filter: var(--whiteFilter);
        }
      }
      &.delete-activity-button {
        img {
          width: 20px !important;
          height: 20px !important;
        }
      }
    }
  }
  .activity-image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    background-size: cover !important;
    background-position: center center !important;
    transition: all 0.5s ease-in-out;
    &.cover {
      background-size: 50% !important;
      background-repeat: no-repeat !important;
      background-color: #90d1e5 !important;
    }
  }
  &:hover {
    .activity-image {
      width: 105%;
    }
  }
  .activity-info {
    padding-top: 5px;
    .activity-name {
      font-size: 1.3em;
      font-weight: 600;
    }
    .activity-persons {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .activity-price {
      margin-top: 5px;
      text-transform: capitalize;
      .activity-price-details {
        .activity-price-value {
          span {
            font-size: 1.4em;
            font-weight: 600;
            color: var(--pink);
          }
        }
      }
    }
  }
  .normal-button {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: white;
    height: 50px;
    font-size: 1.1em;
    &:hover {
      color: white;
    }
  }
`;
