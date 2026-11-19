import styled from "styled-components";
export const AccountResponsiveStyles = styled.div`
  @media (max-width: 1000px) {
    margin: 0 10px;
  }
  @media (max-width: 880px) {
    .account-menu {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 515px) {
    .account-menu {
      grid-template-columns: 1fr;
    }
  }
`;
