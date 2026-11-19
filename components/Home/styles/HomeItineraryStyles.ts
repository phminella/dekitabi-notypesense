import styled from "styled-components";
export const HomeItineraryStyles = styled.section`
  position: relative;
  margin: 0 auto;
  height: 100%;
  width: calc(100% - 20px);
  overflow: hidden;
  z-index: 0;
  max-width: 1200px;
  text-align: center;
  margin-top: 40px;
  .title-wrapper {
    text-align: left;
    max-width: 950px;
    margin: 0 auto 40px auto;
    h2 {
      font-size: 2em;
      span {
        font-size: 1.7em;
        /* color: var(--blue); */
        line-height: 1em;
      }
    }
    @media (max-width: 400px) {
      margin: 0 auto 20px auto;
      h2 {
        font-size: 2em;
        line-height: 1em;
      }
    }
  }
`;
