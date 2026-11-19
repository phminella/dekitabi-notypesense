import styled from "styled-components";
export const ChatInputStyles = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border: 1px solid lightgray;
  background: var(--lightGray);
  display: flex;
  padding: 10px;
  textarea {
    resize: none;
    max-width: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    overflow: hidden;
    padding: 10px;
    ::placeholder {
      font-size: 0.8em;
    }
  }
  button {
    display: flex;
    align-items: center;
    border: 1px solid white;
    background: var(--blue);
    color: white;
    padding: 10px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
      }
    }
  }
`;
