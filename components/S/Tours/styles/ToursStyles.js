import styled from "styled-components";
export const ToursStyles = styled.div`
  position: relative;
  .spinner {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tours-filter-wrapper {
    margin-top: 20px;
    border-bottom: 1px solid lightgray;
    .tags {
      max-width: 1200px;
      margin: 10px auto;
    }
    .tours-filter {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.5fr 0.5fr;
      gap: 10px;
      .attraction-search-wrapper {
        max-width: 1200px;
        width: 100%;
        margin: 0;
      }
      .attraction-search {
        width: 100% !important;
      }
    }
  }
  .tours-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    .show-itinerary-video {
      margin-top: 15px;
    }
    .show-original {
      margin-top: 15px;
      margin-bottom: 0 !important;
    }
    .tours-list {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      align-items: center;
      gap: 20px;
      justify-content: center;
      margin-top: 15px;
    }
    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      button {
        font-size: 1.1em;
      }
      .Mui-selected {
        background: #1976d2;
        color: white;
      }
    }
    .tours-map {
      position: relative;
    }
  }
`;
