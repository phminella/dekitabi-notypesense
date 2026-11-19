import styled from "styled-components";
export const AccountPaymentsStyles = styled.ul`
  margin-top: 20px;
  li {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 8px;
    border-bottom: 1px solid var(--lightGray);
    &:last-child {
      border-bottom: none;
    }
    .amount {
      font-weight: 600;
      min-width: 80px;
    }
    .failed {
      background: #fd5c63;
      color: white;
      padding: 2px 4px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      font-size: 0.9em;
    }
    .succeeded {
      background: #d7f7c2;
      color: #006908;
      padding: 2px 4px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      font-size: 0.9em;
      svg {
        filter: invert(21%) sepia(93%) saturate(1725%) hue-rotate(116deg)
          brightness(90%) contrast(107%);
      }
    }
    .created {
      position: absolute;
      right: 0;
      font-size: 0.9em;
    }
  }
  .pagination {
    position: relative;
    padding: 20px;
    border: 1px solid var(--lightGray);
    margin-top: 20px;
    min-height: 80px;
    button {
      &.next {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
`;
