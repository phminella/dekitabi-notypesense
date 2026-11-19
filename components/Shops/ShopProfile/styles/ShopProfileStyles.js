import styled from "styled-components";
export const ShopProfileStyles = styled.div`
  padding: 0 10px;
  margin-bottom: 30px;
  .profile-wrapper {
    max-width: 1000px;
    background: white;
    margin: 0 auto;
    border-radius: 10px;
  }
  h1 {
    position: relative;
  }
  .link,
  a {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .profile-title {
    font-size: 1.7em;
    color: var(--darkBlue);
    font-weight: 700;
    margin-bottom: 20px;
  }
  .profile-header {
    background-color: white;
    text-align: center;
    padding: 10px 0;
    /* border-top: 3px solid var(--darkBlue); */
    font-weight: 600;
    h1 {
      font-size: 3em;
      line-height: 1em;
      /* color: white; */
    }
    .shop-rating {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: center;
    }
    .headline {
      position: relative;
      padding: 10px 25px 0 0;
      font-size: 1.2em;
      color: var(--darkBlue);
      .label {
        display: none;
      }
    }
    .sample {
      background-color: #fbab7e;
      background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
      border-radius: 10px;
      margin-top: 10px;
      overflow: hidden;
      a {
        padding: 10px;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: var(--darkBlue);
        text-decoration: none;
        font-size: 1.1em;
        &:hover {
          background-color: var(--darkBlue);
          color: white;
        }
      }
    }
  }
`;
