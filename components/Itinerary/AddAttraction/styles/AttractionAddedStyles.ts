import styled from "styled-components";
export const AttractionAddedStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--blue);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-left: -105%;
  transition: margin 0.2s ease-in-out;
  .added-wrapper {
    text-align: center;
  }
  h2 {
    color: white;
  }
  img {
    margin-bottom: 5px;
    filter: var(--whiteFilter);
  }
  &.added {
    margin: 0;
  }
  .attraction-added-content {
    text-align: center;
  }
`;
