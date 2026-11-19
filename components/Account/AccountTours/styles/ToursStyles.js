import styled from "styled-components";
export const ToursStyles = styled.div`
  .same-date {
    background: #7b3ed2;
    color: white;
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    gap: 5px;
    img {
      filter: var(--whiteFilter);
    }
  }
  .close-icon {
    filter: none;
    img {
      filter: var(--darkBlueFilter);
    }
  }
`;
