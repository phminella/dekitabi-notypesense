import styled from "styled-components";
export const SuggestedAttractionStyles = styled.div`
  .attraction-image {
    position: relative;
    height: 200px;
    width: 200px;
    border-radius: 10px;
    overflow: hidden;
    z-index: -1;
  }
  a {
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--blue);
      }
    }
  }
  transition: 0.3s ease-in-out transform;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(0.96);
    }
  }
`;
