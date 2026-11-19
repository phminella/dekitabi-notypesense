import styled from "styled-components";
export const DragInfoStyles = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(25, 118, 210, 0.3);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  .drag-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 10px;
    p {
      text-align: center;
    }
    img {
      filter: var(--whiteFilter);
    }
  }
`;
