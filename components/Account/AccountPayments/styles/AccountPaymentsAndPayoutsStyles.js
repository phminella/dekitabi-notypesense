import styled from "styled-components";
export const AccountPaymentsAndPayoutsStyles = styled.div`
  max-width: 1000px;
  margin: 120px auto 50px auto;
  min-height: 300px;
  @media (max-width: 1000px) {
    margin: 40px 10px;
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
      margin-bottom: 30px;
      color: gray;
    }
  }
  .payouts-info {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px;
    background: var(--lightGray);
    color: gray;
    border-radius: 5px;
    margin-top: 20px;
    img {
      filter: invert(54%) sepia(0%) saturate(40%) hue-rotate(146deg)
        brightness(94%) contrast(79%);
    }
    a {
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color:var(--darkBlue);
        }
      }
    }
  }
`;
