import styled from "styled-components";
export const HomeResponsiveStyles = styled.div`
  .home-search-responsive {
    position: relative;
    width: 100%;
    .submit-button {
      position: absolute;
      top: 2px;
      right: 2px;
      height: 51px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      background-color: var(--pink);
      border-radius: 10px;
      img {
        filter: var(--whiteFilter);
      }
    }
  }
  .step2-wrapper {
    @media (max-width: 840px) {
      ul {
        grid-template-columns: 1fr !important;
      }
    }
  }
`;
