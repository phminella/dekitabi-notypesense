import styled from "styled-components";
export const HomeNewGuidesStyles = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  .scroll-container {
    position: relative;
    display: flex;
    gap: 10px;
    cursor: grab;
    .drag-info {
      z-index: 1;
    }
    .guide-wrapper {
      max-width: 280px;
      min-width: 280px;
      .guide {
        max-width: 280px;
        min-width: 280px;
      }
    }
  }
`;
