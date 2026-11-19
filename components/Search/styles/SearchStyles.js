import styled from "styled-components";
export const SearchStyles = styled.div`
  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: right;
    margin: 0 auto;
    width: 100%;
  }
  .suggestions-bg {
    position: fixed;
    background: var(--blue);
    opacity: 0.2;
    width: 100%;
    height: calc(100% - 60px);
    top: 60px;
    left: 0;
  }
`;
