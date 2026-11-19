import styled from "styled-components";
export const GuideStyles = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  padding: 15px 15px 10px 15px;
  min-height: 400px;
  color: white;
  margin: 0 auto;
  width: 100%;
  .itinerary-creator {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--pink);
    padding: 10px;
    border-bottom-right-radius: 30px;
    max-width: 210px;
  }
  a {
    color: white;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: white;
      }
    }
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      .guide-background img {
        border-radius: 15px;
        overflow: hidden;
        transition: all 3.5s linear;
        -webkit-mask-image: -webkit-gradient(
          linear,
          left top,
          left bottom,
          from(rgba(0, 0, 0, 1)),
          to(rgba(0, 0, 0, 1))
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 1)
        ) !important;
        transform: scale(1.2);
      }
    }
  }
  .guide-link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .guide-wrapper {
    position: absolute;
    width: 100%;
    bottom: 20px;
    left: 0;
    z-index: 1;
    border-radius: 15px;
    overflow: hidden;
  }
  .guide-name {
    gap: 3px;
    text-align: center;
    font-weight: 600;
    font-size: 1.2em;
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
    margin-top: 10px;
    padding: 0 10px;
    text-transform: capitalize;
    .guide-name-badges {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      span {
        flex-shrink: 0;
      }
      .guide-rating {
        justify-content: center;
        font-size: 0.8em;
        font-weight: 500;
        .star {
          filter: var(--pinkFilter);
        }
      }
      img {
        flex-shrink: 0;
        &.verified {
          filter: invert(66%) sepia(76%) saturate(1411%) hue-rotate(44deg)
            brightness(105%) contrast(102%);
        }
        &.licensed {
          filter: invert(56%) sepia(98%) saturate(1398%) hue-rotate(152deg)
            brightness(100%) contrast(108%);
        }
        &.driver {
          filter: invert(77%) sepia(80%) saturate(914%) hue-rotate(358deg)
            brightness(102%) contrast(106%);
        }
      }
    }
  }
  .guide-languages {
    padding: 5px;
    margin-bottom: 10px;
    ul {
      justify-content: center;
      flex-wrap: wrap;
    }
    .language {
      gap: 5px;
      font-size: 0.8em;
      img {
        border-radius: 4px;
      }
    }
  }
  .max-people {
    justify-content: center;
    font-size: 1.1em;
    img {
      filter: var(--pinkFilter);
    }
  }
  .guide-fees {
    color: white;
    justify-content: center;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    span {
      font-size: 1.4em;
      font-weight: 600;
    }
    img {
      filter: var(--pinkFilter);
    }
  }
  .transport {
    display: flex;
    gap: 5px;
    text-align: center;
    justify-content: center;
    font-size: 0.9em;
    img {
      margin-top: 1px;
      filter: var(--pinkFilter);
    }
    .car {
      margin-top: 3px;
    }
  }
  .guide-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: white;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      filter: var(--pinkFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--darkBlue);
        img {
          filter: var(--whiteFilter);
        }
      }
    }
  }
  .guide-chat-button {
    position: absolute;
    top: 55px;
    right: 5px;
    display: flex;
    justify-content: right;
    z-index: 1;
    .message-button {
      position: static;
    }
  }
  &.itinerary-guide {
    .choose-guide-button {
      margin: 0 auto;
      margin-top: 15px;
      width: calc(100% - 30px);
    }
  }
`;
