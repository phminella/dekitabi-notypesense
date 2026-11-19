import styled from "styled-components";
export const GuidesStyles = styled.div`
  position: relative;
  margin: 0 auto 50px auto;
  max-width: 1200px;
  @media (max-width: 1240px) {
    margin: 0 10px 50px 10px;
  }
  .spinner {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .guides-filter-wrapper {
    margin: 20px auto;
    .guides-filter {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding-bottom: 20px;
      border-bottom: 1px solid lightgray;
      .guides-filter-two {
        display: grid;
        grid-template-columns: 0.5fr 0.5fr;
        gap: 10px;
        position: relative;
        .filter-date {
          position: relative;
          width: 100%;
          .close-icon {
            position: absolute;
            top: 8px;
            right: 15px;
            border-radius: 50px;
            background: var(--lightGray);
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                background: lightgray;
              }
            }
          }
        }
      }
    }
  }
  .guides-wrapper {
    position: relative;
    width: calc(100%-10px);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: auto;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
  .pagination {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    button {
      font-size: 1.1em;
    }
    .Mui-selected {
      background: #1976d2;
      color: white;
    }
  }
`;
