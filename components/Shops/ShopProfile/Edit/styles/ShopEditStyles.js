import styled from "styled-components";
export const ShopEditStyles = styled.div`
  .modal-wrapper {
    min-width: 500px;
    @media (max-width: 540px) {
      min-width: 0;
    }
  }
  .edit-buttons {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
    padding: 15px 0;
  }
`;
