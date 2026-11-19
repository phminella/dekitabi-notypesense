import styled from "styled-components";
export const ShareForDiscountsStyles = styled.div`
  max-width: 1000px;
  margin: 100px auto 30px auto;
  @media (max-width: 1040px) {
    margin: 70px 10px 30px 10px;
  }
  .learn-more {
    display: none !important;
  }
  .discount-details-wrapper {
    max-width: 1000px;
    margin: 30px auto 0 auto;
    border: 3px solid var(--darkBlue);
    padding: 15px;
    border-radius: 20px;
    @media (max-width: 840px) {
      margin: 30px 10px 0 10px;
    }
    h1 {
      font-size: 2.5em;
    }
    li {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      font-size: 1.3em;
      color: var(--darkBlue);
      .circle {
        margin-top: 8px;
        width: 10px;
        height: 10px;
        background-color: var(--pink);
        border-radius: 50%;
        flex-shrink: 0;
      }
    }
    button {
      border-radius: 20px;
      padding: 5px 5px;
      height: 65px;
      width: 100%;
      margin-top: 20px;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--pink);
        }
      }
    }
  }
`;
