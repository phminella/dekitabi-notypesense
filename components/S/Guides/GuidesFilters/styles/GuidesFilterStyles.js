import styled from "styled-components";
export const GuidesFilterStyles = styled.div`
  .filter-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    height: 100%;
    border: 1px solid lightgray;
    border-radius: 10px;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
        color: white;
        img {
          filter: var(--whiteFilter);
        }
      }
    }
  }
  .modal-wrapper {
    min-width: 680px;
    max-width: 680px !important;
    padding: 0 !important;
  }
  .filters-title {
    padding: 20px 20px 0px 20px;
    h2 {
      margin: 0 !important;
    }
  }
  .filters {
    max-height: 65dvh;
    overflow: auto;
    padding: 20px;
    padding-top: 0;
    .filter-title {
      margin-bottom: 10px;
    }
    .filter {
      border-bottom: 1px solid lightgray;
      padding-bottom: 15px;
      margin-bottom: 15px;
      &:last-child {
        margin: 0;
      }
      .sub-title {
        font-size: 0.8em;
        color: gray;
      }
      &:last-child {
        border: none;
      }
    }
  }
`;
