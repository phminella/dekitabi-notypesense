import styled from "styled-components";
export const AttractionStyles = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      .attraction-options {
        button,
        a {
          transform: scale(1, 1);
        }
      }
    }
  }
  .grid-wrapper {
    .attraction-image {
      width: 100% !important;
      height: 150px;
    }
    @media (max-width: 450px) {
      grid-template-columns: 1fr !important;
    }
    gap: 10px;
    min-height: 150px;
    @media (hover: hover) and (pointer: fine) {
      min-height: 130px;
    }
    overflow: hidden;
    @media (hover: hover) and (pointer: fine) {
      @media (max-width: 450px) {
        padding: 0;
      }
    }
    .attraction-marker-wrapper {
      position: absolute;
      top: 5px;
      left: 8px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 600;
      .attraction-marker {
        position: absolute;
        top: -2px;
        left: -5px;
        width: 30px;
        height: 30px;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: -250%;
        border: 3px solid white;
        background: var(--pink);
        transform: rotate(45deg);
        p {
          transform: rotate(-45deg);
        }
        &.selected {
          background: var(--darkBlue);
        }
      }
      p {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
    }
    .attraction-image {
      position: relative;
      width: 100%;
    }
    .attraction-wrapper {
      padding: 5px 3px;
      transition: 0.3s opacity ease-in-out;
      .attraction-description {
        display: flex;
        align-items: center;
        padding: 0 5px 5px 5px;
        padding-bottom: 0;
        flex-shrink: 0;
        .attraction-rating {
          font-weight: 600;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
          img {
            filter: var(--pinkFilter);
          }
          .attraction-rating-score {
            font-weight: 400;
            font-size: 0.9em;
            color: gray;
            flex-shrink: 0;
          }
        }
        .attraction-name {
          text-transform: capitalize;
          color: var(--darkBlue);
          font-weight: 600;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .attraction-more-info {
        border-radius: 20px;
        padding: 5px;
        padding-top: 0;
        flex-shrink: 0;
        .attraction-item {
          display: flex;
          gap: 5px;
          align-items: center;
          color: var(--darkBlue);
          b {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 95px;
          }
          img {
            filter: var(--darkBlueFilter);
            flex-shrink: 0;
          }
          span {
            display: flex;
            gap: 5px;
            align-items: center;
            flex-shrink: 0;
          }
        }
      }
    }
  }
`;
