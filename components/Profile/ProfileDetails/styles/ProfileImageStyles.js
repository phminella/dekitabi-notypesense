import styled from "styled-components";
export const ProfileImageStyles = styled.div`
  position: relative;
  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 15;
    height: 350px;
    width: 100%;
  }
  .image-bg {
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--darkBlue);
    opacity: 0.5;
    z-index: 0;
  }
  .image-options {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    .image-delete {
      color: white;
      text-align: center;
      font-size: 1.1em;
      img {
        filter: var(--whiteFilter);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--pink);
          img {
            filter: var(--pinkFilter);
          }
        }
      }
    }
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      .image-options {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .image-bg {
        display: block;
      }
    }
  }
`;
