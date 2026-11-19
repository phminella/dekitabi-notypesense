import styled from "styled-components";
export const HeaderShopStyles = styled.div`
  position: absolute;
  right: 10px;
  top: 15px;
  width: 50px;
  cursor: pointer;
  &:hover {
    ul {
      display: block;
    }
  }
  ul {
    display: none;
    position: absolute;
    top: 80%;
    right: 0;
    background-color: white;
    border: 1px solid #ebebeb;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 10px;
    width: 100vw;
    max-width: 300px;
    text-align: center;
    overflow: hidden;
    li {
      position: relative;
      border-bottom: 1px solid lightgray;
      &:last-child {
        border: none;
      }
      a,
      button {
        padding: 10px;
        display: block;
        width: 100%;
        height: 100%;
        color: var(--darkBlue);
        font-weight: 600;
        &:hover {
          background-color: #ebebeb;
        }
      }
    }
  }
`;
