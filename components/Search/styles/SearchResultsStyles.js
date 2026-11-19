import styled from "styled-components";
export const SearchResultsStyles = styled.div`
  position: absolute;
  width: 100%;
  top: calc(100% + 10px);
  left: 0;
  z-index: 9999;
  background: white;
  padding: 10px;
  border-radius: 20px;
  max-width: 400px;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  .no-results {
    padding: 20px;
  }
  .suggestion {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.1em;
    padding: 10px;
    border-radius: 15px;
    text-transform: capitalize;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--lightGray);
      }
    }
    .marker-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      width: 45px;
      border-radius: 10px;
      background: var(--lightGray);
      img {
        filter: invert(73%) sepia(24%) saturate(9%) hue-rotate(315deg)
          brightness(103%) contrast(112%);
      }
    }
    .suggestion-country {
      font-size: 0.8em;
      color: gray;
    }
  }
`;
