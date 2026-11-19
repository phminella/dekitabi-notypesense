import styled from "styled-components";
export const HomePopularAttractionStyles = styled.div`
  .attraction-image {
    position: relative;
    height: 200px;
    width: 200px;
    border-radius: 10px;
    overflow: hidden;
    z-index: 0;
    -webkit-filter: contrast(108%) brightness(108%) sepia(8%);
    border: 3px solid #0cafff;
  }
  a {
    color: var(--darkBlue);
    font-weight: 600;
    text-decoration: none;
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
