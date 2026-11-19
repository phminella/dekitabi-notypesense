import styled from "styled-components";
export const GuidesListStyles = styled.div`
  .subtitle {
    font-size: 1.5em;
    font-weight: bold;
  }
  .title-wrapper {
    margin: 100px auto 30px auto;
    max-width: 600px;
    ul {
      margin: 20px 0;
      li {
        display: grid;
        grid-template-columns: 35px 1fr;
        align-items: center;
        gap: 5px;
        font-size: 1.2em;
        img {
          flex-shrink: 0;
          &.verified {
            filter: invert(66%) sepia(76%) saturate(1411%) hue-rotate(44deg)
              brightness(105%) contrast(102%);
          }
          &.licensed {
            filter: invert(56%) sepia(98%) saturate(1398%) hue-rotate(152deg)
              brightness(100%) contrast(108%);
          }
          &.driver {
            filter: invert(77%) sepia(80%) saturate(914%) hue-rotate(358deg)
              brightness(102%) contrast(106%);
          }
        }
      }
    }
  }
  .guide-title {
    font-size: 3em;
    color: var(--blue);
    text-align: center;
    img {
      display: block;
      margin: 0 auto;
    }
  }
`;
