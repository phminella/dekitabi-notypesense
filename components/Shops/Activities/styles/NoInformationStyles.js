import styled from "styled-components";
export const NoInformationStyles = styled.div`
  .example {
    display: inline-flex;
    background-color: var(--lightGray);
    padding: 5px;
    color: gray;
    border-radius: 5px;
    margin-bottom: 10px;
    flex-wrap: wrap;
    white-space: normal;
  }
  .message {
    display: flex;
    gap: 5px;
    font-size: 1.1em;
    color: gray;
    img {
      filter: brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(1%)
        hue-rotate(9deg) brightness(95%) contrast(83%);
    }
    p {
      white-space: normal;
    }
  }
`;
