import styled from "styled-components";
export const EditSocialMediaStyles = styled.section`
  padding-bottom: 15px;
  ul {
    flex-wrap: wrap;
  }
  .social-media ul li a {
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

  @media (max-width: 500px) {
    .two-columns-wrapper {
      grid-template-columns: 1fr;
    }
  }
`;
