import styled from "styled-components";
export const EditInformationButtonStyles = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  img {
    filter: var(--blueFilter);
  }
  &:hover {
    background-color: var(--darkBlue);
    img {
      filter: var(--whiteFilter);
    }
  }
`;
