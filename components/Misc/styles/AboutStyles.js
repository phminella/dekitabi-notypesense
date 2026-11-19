import styled from "styled-components";
export const AboutStyles = styled.div`
  margin-top: 100px;
  .logo {
    display: block;
    margin: 0 auto;
  }
  h1,
  h2 {
    text-align: center;
  }
  h1 {
    margin-top: 10px;
    font-size: 3em;
  }
  h2 {
    font-size: 2.5em;
    margin-bottom: 30px;
  }
  .title-img {
    display: block;
    margin: 0 auto;
    margin: 30px auto 20px auto;
    filter: var(--pinkFilter);
  }
  .about-wrapper {
    max-width: 800px;
    margin: 20px auto 30px auto;
    @media (max-width: 840px) {
      margin: 0 30px;
    }
    p,
    li {
      font-size: 1.3em;
      line-height: 1.7em;
      text-align: justify;
    }
  }
  .spot {
    border-radius: 50%;
    margin: 0 auto;
  }
  .dekitabi-list {
    margin: 10px 0;
    li {
      display: flex;
      gap: 5px;
      .checked {
        margin-top: 8px;
        filter: invert(87%) sepia(80%) saturate(574%) hue-rotate(69deg)
          brightness(95%) contrast(82%);
      }
    }
  }
  .spot-list {
    margin: 30px 0 30px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px 30px;
    li {
      display: grid;
      text-align: center;
      .spot {
        margin-bottom: 5px;
      }
    }
  }
  .title-wrapper {
    display: none;
  }
  .guides-wrapper {
    margin-top: 20px;
  }
`;
