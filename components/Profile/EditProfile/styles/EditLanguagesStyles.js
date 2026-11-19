import styled from "styled-components";
export const EditLanguagesStyles = styled.section`
  .languages {
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .badge {
        display: flex;
        align-items: center;
        gap: 5px;
        text-transform: capitalize;
        background: var(--lightGray);
        border-radius: 5px;
        padding: 10px;
        img {
          display: none;
        }
      }
    }
  }
  .react-select__input-container {
    font-size: 30px !important;
    font-family: inherit !important;
  }
  .react-select__menu {
    z-index: 3;
  }
`;
