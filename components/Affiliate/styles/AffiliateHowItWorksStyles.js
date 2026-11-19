import styled from "styled-components";
export const AffiliateHowItWorksStyles = styled.div`
  background-color: lightblue;
  padding: 30px 0;
  .wrapper {
    background-color: white;
    border-radius: 20px;
    margin: 0 auto;
    max-width: 800px;
    padding: 20px;
  }
  h2 {
    font-size: 2.5em;
  }
  h3 {
    margin-top: 15px;
    font-size: 2em;
  }
  h4 {
    font-size: 1.8em;
    margin: 15px 0;
  }
  p {
    font-size: 1.3em;
  }
  .title {
    color: var(--darkBlue);
    margin-bottom: 10px;
  }
  .paypal {
    margin-top: 15px;
  }
  span {
    display: block;
    color: var(--blue);
    margin: 5px 0;
    overflow-wrap: break-word;
    b {
      color: var(--pink);
    }
  }
  a {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
`;
