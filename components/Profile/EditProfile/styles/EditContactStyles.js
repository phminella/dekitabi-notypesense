import styled from "styled-components";
export const EditContactStyles = styled.section`
  ul {
    flex-wrap: wrap;
  }
  .contact ul li {
    display: flex;
    align-items: center;
    gap: 5px;
    background: var(--lightGray);
    border-radius: 5px;
    padding: 10px;
  }
  .mui-input-wrapper {
    position: relative;
    input {
      padding-left: 42px;
    }
    label {
      margin-left: 30px;
    }
    .contact-image {
      position: absolute;
      top: 20px;
      left: 12px;
      z-index: 1;
      font-size: 1.2em;
      color: gray;
    }
  }
  .edit-contact {
    .contact-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      @media (max-width: 500px) {
        grid-template-columns: 1fr;
      }
      gap: 10px;
    }
  }
`;
