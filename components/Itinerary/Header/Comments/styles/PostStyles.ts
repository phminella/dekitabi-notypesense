import styled from "styled-components";
export const PostStyles = styled.div`
  position: relative;
  padding-right: 50px;
  display: flex;
  gap: 10px;
  margin-top: 10px;
  &.comment {
    margin-top: 20px;
  }
  i {
    display: inline-block;
    background-color: lightgray;
    filter: blur(2px);
    width: 65px;
    height: 12px;
    overflow: hidden;
    font-size: 10px;
    border-radius: 10px;
  }
  b {
    font-weight: 600;
    color: var(--darkBlue);
  }
  .comment-details {
    font-size: 0.9em;
    color: gray;
    display: flex;
    gap: 7px;
  }
  button {
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .delete {
    filter: brightness(0) saturate(100%) invert(18%) sepia(90%) saturate(7473%)
      hue-rotate(359deg) brightness(111%) contrast(117%);
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        filter: var(--darkBlueFilter);
      }
    }
  }
  .flag {
  }
  .reply {
    color: gray;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .like-button {
    position: absolute;
    top: 0;
    right: 0;
    &.flag-button {
      right: 25px;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        filter: var(--pinkFilter);
      }
    }
  }
  .checked {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: white;
    color: var(--pink);
    padding: 0 3px;
    border-radius: 5px;
    img {
      filter: var(--pinkFilter);
    }
    &:hover {
      filter: none;
    }
  }
`;
