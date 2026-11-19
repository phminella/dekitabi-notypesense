import styled from "styled-components";
export const AffiliateStepsStyles = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: var(--darkBlue);
  .steps-title {
    margin: 30px 0;
    font-size: 3em;
    font-weight: bold;
  }
  ul {
    display: flex;
    justify-content: center;
    gap: 40px;
    li {
      text-align: center;
      &.item-name {
        width: 180px;
        line-height: 1em;
      }
      .circle {
        width: 100px;
        height: 100px;
        background-color: lightblue;
        border-radius: 50%;
        flex-shrink: 0;
        display: flex;
        font-weight: bold;
        font-size: 3em;
        color: var(--darkBlue);
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px auto;
      }
      .circle-2 {
        width: 30px;
        height: 30px;
        background-color: lightgray;
        border-radius: 50%;
        flex-shrink: 0;
        margin-top: 30px;
      }
      font-size: 1.5em;
      font-weight: 600;
    }
    @media (max-width: 900px) {
      display: grid;
      gap: 15px;
      .circle {
        margin: 0 auto 10px auto !important;
      }
      .circle-2 {
        margin: 0 auto 0 auto !important;
      }
    }
  }
`;
