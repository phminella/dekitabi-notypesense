import styled from "styled-components";
export const AffiliateHomeStyles = styled.div`
  .affiliate-home-wrapper {
    background-color: lightblue;
    padding-bottom: 30px;
    padding: 50px 0;
    @media (max-width: 900px) {
      padding: 20px 0;
    }
  }
  .affiliate-title-wrapper {
    max-width: 1200px;
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 20px;
    padding: 10px;
    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
    align-items: center;
    margin: 0 auto;
  }
  .home-title {
    color: var(--darkBlue);
    h1 {
      font-size: 4em;
      line-height: 1em;
    }
    .subtitle {
      margin: 15px 0 10px 0;
      font-size: 1.4em;
      font-weight: 600;
    }
    ul {
      font-size: 1.3em;
      li {
        display: flex;
        gap: 10px;
        margin: 5px 0;
        .circle {
          margin-top: 7px;
          width: 10px;
          height: 10px;
          background-color: var(--pink);
          border-radius: 50%;
          flex-shrink: 0;
        }
      }
    }
    .home-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      width: 100%;
      max-width: 400px;
      margin-top: 20px;
      @media (max-width: 400px) {
        grid-template-columns: 1fr;
      }
      a {
        font-size: 1.1em;
        font-weight: 600;
        display: flex;
        background: white;
        color: var(--darkBlue);
        border-radius: 20px;
        justify-content: center;
        text-align: center;
        align-items: center;
        height: 50px;
        padding: 0 5px;
        border: 1px solid lightgray;
        &.join-us {
          background: var(--blue);
          color: white;
          border: none;
        }
        &:hover {
          background-color: var(--darkBlue);
          color: white;
        }
      }
    }
  }
  .clients {
    padding: 40px 0;
    background: var(--darkBlue);
    color: white;
    .title {
      font-size: 3em;
      line-height: 1em;
      font-weight: bold;
      max-width: 500px;
      margin: 0 auto;
      text-align: center;
    }
  }
  .bg-wrapper {
    margin-top: 40px;
    position: relative;
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    img {
      opacity: 0.6;
    }
    h1 {
      z-index: 1;
      color: white;
      font-size: 4em;
      @media (max-width: 330px) {
        font-size: 3.5em;
      }
      max-width: 700px;
      line-height: 1em;
      padding: 10px;
    }
  }
`;
