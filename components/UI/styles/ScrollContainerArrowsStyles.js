import styled from "styled-components";
export const ScrollContainerArrowsStyles = styled.div`
  .right-arrow,
  .left-arrow {
    background-color: #ebedef;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    position: absolute;
    margin: 0;
    top: -60px;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        svg rect {
          transition: 0.5s all ease-in-out;
          fill: lightgray;
        }
      }
    }
    &.disabled {
      opacity: 0.3;
      cursor: default;
      svg rect {
        fill: #ebedef;
      }
    }
  }
  .left-arrow {
    right: 40px;
  }
  .right-arrow {
    right: 0px;
  }
  @media (max-width: 500px) {
    &.normal-arrows {
      .right-arrow,
      .left-arrow {
        top: -30px;
      }
      .left-arrow {
        left: 0px;
      }
      .right-arrow {
        left: 40px;
      }
    }
  }
  &.tags {
    .left-arrow,
    .right-arrow {
      background-color: var(--lightGray);
      border: none;
      top: 50%;
    }
    .left-arrow {
      left: 0;
    }
    .right-arrow {
      right: 0;
    }
  }
  &.suggested-attractions {
    .left-arrow,
    .right-arrow {
      top: -30px;
    }
  }
`;
