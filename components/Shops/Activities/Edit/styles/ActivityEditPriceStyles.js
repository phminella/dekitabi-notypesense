import styled from "styled-components";
export const ActivityEditPriceStyles = styled.div`
  margin-bottom: 20px;
  position: relative;
  .profile-field {
    padding-right: 60px;
    font-size: 1.2em;
    font-weight: 600;
    color: var(--darkBlue);
    margin-bottom: 5px;
  }
  .edit-information-button {
    top: -10px;
    right: 0;
  }
  .price {
    display: grid;
    gap: 10px;
    grid-template-columns: 150px 100px;
    overflow-wrap: break-word;
    .price-details {
      max-width: 150px;
      overflow: hidden;
      border-right: 1px solid lightgray;
    }
    @media (max-width: 550px) {
      grid-template-columns: 1fr;
      gap: 0;
      .price-details {
        border: none;
      }
    }
  }
  .mui-input-wrapper {
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 100px 50px;
    align-items: center;
    input {
      text-align: center;
    }
  }
  .access-button {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    color: var(--blue);
    min-height: 50px;
    font-size: 1.1em;
    img {
      filter: var(--blueFilter);
    }
    &:hover {
      background: var(--darkBlue);
      color: white;
      img {
        filter: var(--whiteFilter);
      }
    }
  }
`;
