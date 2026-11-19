import styled from "styled-components";
export const AffiliateStyles = styled.div`
  margin-top: -60px;
  .link {
    color: var(--blue);
    text-decoration: underline;
    font-size: 1em;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
    &.edit-button {
      width: 100%;
      text-align: center;
    }
  }
  .affiliate-wrapper {
    padding: 10px 15px;
    background: white;
    border-radius: 20px;
  }
`;
