import styled from "styled-components";
export const ItineraryAttractionOptionsStyles = styled.div`
  position: absolute;
  display: grid;
  gap: 5px;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 10px;
  z-index: 0;
  .options-icon {
    filter: var(--blueFilter);
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        filter: var(--purpleFilter);
      }
    }
  }
`;
