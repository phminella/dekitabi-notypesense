import styled from "styled-components";
export const SResponsiveStyles = styled.div`
  .results-wrapper {
    .results-tabs {
      @media (max-width: 1000px) {
        justify-content: center;
        margin: 0 10px;
        span {
          flex-shrink: 0;
        }
      }
      @media (max-width: 600px) {
        .tab-text {
          display: none;
        }
      }
    }
  }
  @media (max-width: 450px) {
    .badge {
      display: block !important;
    }
  }
  @media (max-width: 400px) {
    .attractions-prefecture {
      h1 {
        font-size: 4em !important;
      }
    }
  }
  @media (max-width: 370px) {
    .attractions-prefecture {
      h1 {
        font-size: 3.2em !important;
      }
    }
  }
`;
