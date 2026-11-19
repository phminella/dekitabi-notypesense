import styled from "styled-components";
export const HomeDiscountStyles = styled.div`
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1.1fr 0.8fr 1.1fr;
  gap: 10px;
  margin: 30px auto 0 auto;
  @media (max-width: 1250px) {
    margin: 0 10px 0 10px;
  }
  max-width: 1200px;
  margin: 30px auto 0 auto;
  @media (max-width: 1250px) {
    margin: 0 10px 0 10px;
  }
  /* background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  ); */
  background-color: #fa8bff;
  background-image: linear-gradient(
    45deg,
    #fa8bff 0%,
    #2bd2ff 52%,
    #2bff88 90%
  );

  border-radius: 10px;
  .text {
    padding: 20px;
    color: var(--darkBlue);
    .discount-title {
      color: white;
      font-size: 2.5em;
      font-weight: bold;
      line-height: 1.2em;
      span {
        color: var(--darkBlue);
      }
    }
  }
  .publish {
    display: grid;
    align-items: center;
    justify-content: center;
    img {
      filter: var(--whiteFilter);
    }
    a {
      display: block;
      color: white;
      font-size: 1.3em;
      text-decoration: underline;
      text-align: center;
    }
  }
  .image {
    padding: 20px;
    position: relative;
    width: 100%;
    text-align: right;
    background: linear-gradient(
        45deg,
        #fa8bff 0%,
        #2bd2ff 52%,
        #2bff88 90%,
        0.1
      ),
      url("/img/home/home-discount.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .image-text {
      font-size: 1.5em;
      font-weight: bold;
      line-height: 1.2em;
      color: var(--darkBlue);
    }
    .itinerary-stats {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      margin-bottom: 15px;
      border: 3px solid var(--darkBlue);
      padding: 5px;
      border-radius: 10px;
      .stats-button,
      .stats {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.8em;
        color: var(--darkBlue);
        .comment-icon {
          margin-top: -2.5px;
          margin-right: 4px;
          margin-left: 2px;
        }
        .stats-icon {
          margin-right: 6px;
        }
        .share-icon {
          margin-top: -3px;
          margin-left: -7px;
          @media (max-width: 450px) {
            display: none;
          }
        }
        .star-icon {
          margin-right: 3px;
          margin-left: -1px;
          margin-top: -2px;
        }
        .heart-icon {
          margin-left: 0px;
          margin-right: 4px;
          margin-top: -1px;
        }
      }
    }
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    .text {
      text-align: center;
    }
    .image {
      text-align: center;
    }
    .itinerary-stats {
      flex-wrap: wrap;
    }
  }
`;
