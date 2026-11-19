import styled from "styled-components";
export const ShopProfileCarouselAddStyles = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #ececec; */
  border: 2px dashed lightgray;
  margin: 10px 0 20px 0;
  border-radius: 10px;
  .input-photos {
    width: 100%;
    height: 100%;
    font-size: 1.2em;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    cursor: pointer;
    .profile-title {
      margin-top: 10px;
      color: gray;
      font-size: 1.3em;
      font-weight: 600;
    }
    img {
      filter: brightness(0) saturate(100%) invert(55%) sepia(0%) saturate(2%)
        hue-rotate(183deg) brightness(91%) contrast(81%);
    }
    div {
      height: auto;
      text-align: center;
      line-height: 1.5em;
      span {
        font-size: 0.8em;
        color: var(--pink);
        font-weight: 400;
      }
    }
    input {
      display: none;
    }
    .error,
    .complete {
      color: #ff2e4a;
      font-weight: 400;
      font-size: 0.9em;
    }
    .complete {
      color: #03c03c;
    }
  }
  &:hover {
    .profile-title {
      color: var(--darkBlue);
    }
    border-color: var(--darkBlue);
    background-color: var(--lightGray);
    img {
      filter: var(--darkBlue);
    }
  }
`;
