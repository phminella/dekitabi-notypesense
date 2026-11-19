import styled from "styled-components";
export const AttractionsSkeletonStyles = styled.div`
  .skeleton-filter-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 15px 10px 0 10px;
    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }
  .skeleton-attractions-wrapper {
    display: none;
    position: relative;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 20px;
    overflow: hidden;
    margin: 30px 10px;
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
    .skeleton-attractions-items {
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      @media (max-width: 1350px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 380px) {
        grid-template-columns: 1fr;
      }
      @media (max-width: 450px) {
        .skeleton-attraction {
          height: 290px !important;
        }
      }
    }
    .skeleton-pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
  .skeleton-map {
    position: relative;
    @media (max-width: 800px) {
      display: none;
    }
    .skeleton-map-item {
      overflow: hidden;
      position: sticky;
    }
  }
`;
