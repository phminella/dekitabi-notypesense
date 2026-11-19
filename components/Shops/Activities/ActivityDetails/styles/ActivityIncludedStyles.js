import styled from "styled-components";
export const ActivityIncludedStyles = styled.div`
  .included {
    display: flex;
    gap: 5px;
    img {
      margin-top: 3px;
    }
    .not-included-icon {
      filter: brightness(0) saturate(100%) invert(32%) sepia(85%)
        saturate(2808%) hue-rotate(340deg) brightness(104%) contrast(99%);
    }
    .included-icon {
      filter: brightness(0) saturate(100%) invert(73%) sepia(47%) saturate(576%)
        hue-rotate(84deg) brightness(96%) contrast(100%);
    }
  }
`;
