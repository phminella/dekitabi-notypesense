import styled from "styled-components";
export const EnableCookiesStyles = styled.div`
  .modal-wrapper {
    background: var(--blue);
    text-align: center;
    color: white;
    ul,
    h3 {
      text-align: left;
      li {
        display: flex;
        align-items: center;
        gap: 5px;
        .circle {
          flex-shrink: 0;
          background-color: yellow;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }
    }
  } `;
