import styled from "styled-components";
export const ItineraryGuideStyles = styled.div`
  position: relative;
  overflow: hidden;
  color: white;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 50px 15px 15px;
  border-bottom: 1px solid #8694b3;
  @media (min-width: 450px) {
    &.creator {
      padding-top: 30px;
    }
  }
  .profile-pic-link {
    z-index: 1;
  }
  .guide-background-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
  }
  .itinerary-creator {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--pink);
    padding: 3px 5px;
    border-bottom-right-radius: 10px;
    max-width: 80%;
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
      background: rgb(7, 47, 73);
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
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    font-size: 1.2em;
    width: 100%;
    max-width: 250px;
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
    .language {
      gap: 5px;
      font-size: 0.8em;
      img {
        border-radius: 4px;
      }
    }
  }
  .max-people {
    font-size: 1.1em;
    img {
      filter: var(--pinkFilter);
    }
  }
  .guide-fees {
    color: white;
    flex-wrap: wrap;
    margin-top: 10px;
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
      filter: invert(56%) sepia(98%) saturate(1398%) hue-rotate(152deg)
        brightness(100%) contrast(108%);
    }
  }
  .transport {
    display: flex;
    gap: 5px;
    text-align: center;
    margin-top: 5px;
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
    top: 20px;
    right: 15px;
    background: #7c87b7;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--pink);
        img {
          filter: var(--whiteFilter);
        }
      }
    }
  }
  .guide-chat-button {
    position: absolute;
    top: 60px;
    right: 15px;
    display: flex;
    justify-content: right;
    z-index: 1;
  }
  .message-button {
    background-color: #00b3a4;
    position: static;
  }
  .choose-button {
    background-color: #6fcf97;
    top: 100px;
  }
  @media (max-width: 450px) {
    display: block;
    padding: 0 0 10px 0;
    margin-bottom: 15px;
    border-radius: 15px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    width: calc(100vw - 40px) !important;
    .guide-background-wrapper {
      width: 100%;
      height: 200px;
      margin-bottom: 10px;
      .guide-background {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        .wrapper-background {
          /* object-position: center 10%; */
        }
      }
    }
    .guide-chat-button {
      top: 48px;
    }
    .guide-button {
      top: 10px;
    }
    .choose-button {
      top: 86px;
    }
  }
`;
