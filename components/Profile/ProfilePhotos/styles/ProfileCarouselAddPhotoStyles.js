import styled from "styled-components";
export const ProfileCarouselAddPhotoStyles = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .input-photos {
    font-size: 1.2em;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    cursor: pointer;
    color: white;
    img {
      filter: var(--whiteFilter);
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
`;
