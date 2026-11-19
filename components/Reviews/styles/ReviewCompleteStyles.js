import styled from "styled-components";
export const ReviewCompleteStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: var(--darkBlue);
  padding: 20px;
  z-index: 1;
  margin-left: -100%;
  transition: margin 0.4s ease-in-out;
  border-radius: 20px;
  &.complete {
    margin-left: 0;
  }
  .review-complete {
    img {
      filter: var(--blueFilter);
    }
    text-align: center;
    h1 {
      color: var(--darkBlue);
      margin: 10px 0 20px 0;
    }
    h3 {
      color: var(--darkBlue);
      margin: 30px 0;
    }
  }
`;
