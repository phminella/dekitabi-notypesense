import styled from "styled-components";
export const PageNotFoundStyles = styled.div`
  height: 100lvh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  z-index: 9999;
  color: var(--pink);
  font-weight: 600;
  padding: 20px;
  z-index: -1;
  h1 {
    font-size: 2.8em;
    margin-bottom: 5px;
  }
  h3 {
    text-align: center;
    color: var(--darkBlue);
    margin-bottom: 30px;
    font-weight: 600;
  }
  a {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    font-size: 1.1em;
    color: var(--blue);
    text-decoration: underline;
    overflow: hidden;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        img {
          filter: var(--purpleFilter);
        }
      }
    }
    &.error-back {
      margin-top: 20px;
      display: inline;
      font-size: 1.5em;
      img {
        display: none;
      }
    }
  }
  img {
    max-width: 400px;
    min-width: 400px;
    @media (max-width: 460px) {
      min-width: 240px;
    }
    &.back-icon {
      filter: var(--blueFilter);
    }
  }
  div {
    text-align: center;
  }
  .loader-text {
    text-align: center;
  }
`;
