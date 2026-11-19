import styled from "styled-components";
export const SearchAttractionsResultsStyles = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  z-index: 9999;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  ul {
    padding: 10px;
  }
  li {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }

    button {
      display: flex;
      align-items: center;
      gap: 5px;
      width: 100%;
      color: var(--darkBlue);
      font-weight: 600;
      text-transform: capitalize;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
      .attraction-image-wrapper {
        position: relative;
        height: 45px !important;
        width: 45px !important;
        border-radius: 50% !important;
        overflow: hidden;
        border: 3px solid var(--darkBlue);
        flex-shrink: 0;
        overflow: hidden;
      }
      .attraction-image-wrapper-google {
        display: flex;
        align-items: center;
        justify-content: center;
        background: lightblue;
        img {
          filter: var(--darkBlueFilter);
        }
      }
      .attraction-content {
        p {
          text-align: left;
          margin-bottom: 0px;
          &.attraction-state {
            color: gray;
            font-size: 0.9em;
            font-weight: 400;
          }
        }
      }
    }
  }
  .no-attractions {
    padding: 10px;
  }
  .more {
    background: var(--blue);
    border-top: 1px solid lightgray;
    width: 100%;
    padding: 15px 5px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: 600;
    font-size: 1.1em;
    color: white;
    &:hover {
      background: var(--darkBlue);
      color: white;
    }
  }
  .prefecture {
    display: flex;
    justify-content: center !important;
    gap: 5px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: var(--lightGray);
    border-bottom: 1px solid lightgray;
    color: var(--blue);
    img {
      margin-top: -2px;
      filter: var(--blueFilter);
    }
    &:hover {
      img {
        filter: var(--whiteFilter);
      }
    }
  }
`;
