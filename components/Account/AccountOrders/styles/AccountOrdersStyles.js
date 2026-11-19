import styled from "styled-components";
export const AccountOrdersStyles = styled.div`
  margin: 120px auto 50px auto;
  max-width: 1200px;
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
      margin-bottom: 15px;
      color: gray;
    }
  }
  .show-more-wrapper {
    display: flex;
    justify-content: center;
    .show-more {
      border: 1px solid lightgray;
      height: 58px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 10px;
      padding: 10px;
      font-size: 1.1em;
      margin: 0 auto;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
    }
  }
`;
