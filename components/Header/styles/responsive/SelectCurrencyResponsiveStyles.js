import styled from "styled-components";
export const SelectCurrencyResponsiveStyles = styled.div`
  @media (max-width: 1200px) {
    .currency-list {
      width: calc(100% - 20px);
    }
  }
  @media (max-width: 980px) {
    .currency-wrapper {
      .currency-list-wrapper {
        ul {
          grid-template-columns: repeat(4, 1fr) !important;
        }
      }
    }
  }
  @media (max-width: 715px) {
    .currency-wrapper {
      .currency-list-wrapper {
        ul {
          grid-template-columns: repeat(3, 1fr) !important;
        }
      }
    }
  }
  @media (max-width: 660px) {
    .currency-wrapper {
      .currency-list-wrapper {
        ul {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
    }
  }
  @media (max-width: 400px) {
    .currency-wrapper {
      .currency-list-wrapper {
        ul {
          grid-template-columns: repeat(1, 1fr) !important;
        }
      }
    }
  }
`;
