import styled from "styled-components";
export const PlaceAutoCompleteStyles = styled.div`
  position: relative;
  width: 100%;
  .autocomplete {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    z-index: 9999;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    .result {
      text-align: left;
      width: 100%;
      padding: 10px;
      .result-address {
        font-size: 0.8em;
        color: gray;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
    }
  }
`;
