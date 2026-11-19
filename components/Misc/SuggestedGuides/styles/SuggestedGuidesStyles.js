import styled from "styled-components";
export const SuggestedGuidesStyles = styled.div`
  width: 100%;
  .guides-wrapper {
    display: flex;
    margin-top: 10px;
  }
  .add-guide {
    border-radius: 50px;
    width: 80px;
    height: 80px;
    border: 4px solid var(--darkBlue);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -30px;
    z-index: 8;
    background: white;
    img {
      filter: var(--darkBlueFilter);
    }
    &:hover {
      transform: scale(1.05);
    }
  }
  .guide {
    border-radius: 50px;
    margin-right: -30px;
    @media (max-width: 450px) {
      margin-right: -45px;
    }
    border: 3px solid #fff;
    &:hover {
      transform: scale(1.1);
      z-index: 9999 !important;
    }
  }
  @media (max-width: 360px) {
    .guide,
    .add-guide {
      width: 60px;
      height: 60px;
      margin-right: -30px;
    }
  }
  .guides-title {
    font-size: 1.5em;
    color: var(--darkBlue);
    font-weight: 700;
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
    margin-top: 10px;
    width: 100%;
    span {
      color: var(--pink);
    }
  }
  .normal-button {
    width: 100%;
    margin: 10px 0 0 0;
    display: block;
    text-align: left;
    font-size: 1.1em;
    .button-text {
      display: flex;
      align-items: start;
      justify-content: center;
      gap: 5px;
      img {
        margin-top: 1px;
      }
    }
  }
`;
