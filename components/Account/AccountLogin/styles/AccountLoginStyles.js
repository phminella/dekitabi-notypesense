import styled from "styled-components";
export const AccountLoginStyles = styled.div`
  margin: 120px auto 50px auto;
  max-width: 1000px;
  @media (max-width: 1000px) {
    margin: 20px 10px;
  }
  .page-header {
    .breadcrumbs {
      font-size: 1.1em;
      display: flex;
      gap: 15px;
      @media (hover: hover) and (pointer: fine) {
        a:hover {
          color: var(--pink);
        }
      }
    }
    .title {
      margin-top: 10px;
    }
    .sub-title {
      font-size: 0.9em;
      margin-bottom: 50px;
      color: gray;
    }
  }
`;
