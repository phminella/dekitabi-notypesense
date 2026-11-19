import styled from "styled-components";
export const ItineraryGuideListStyles = styled.div`
  .spinner {
    span {
      border-color: white transparent transparent transparent;
    }
  }
  .guides-title {
    position: relative;
    gap: 0 10px;
    width: 100%;
    color: white;
    padding: 0 60px 0 15px;
    p {
      font-size: 2.1em;
      font-weight: bold;
    }
    button {
      display: inline;
      margin-top: 3px;
      height: 35px;
    }
    .itinerary-date {
      margin: 0;
      form {
        height: 100%;
        grid-template-columns: 1fr;
        .input-time-wrapper {
          display: none;
        }
        input {
          height: 35px;
        }
      }
    }
    .guides-date-wrapper {
      display: flex;
      gap: 10px;
      button {
        margin: 0;
        height: 41px;
      }
    }
  }
  .guide-search {
    display: grid;
    grid-template-columns: 1fr 50px;
    gap: 10px;
    margin: 15px 0;
    padding: 0 15px;
    input {
      padding: 10px;
      border: 1px solid hsl(0, 0%, 80%);
    }
    .filter-button {
      border: none;
      background-color: var(--blue);
      span {
        display: none;
      }
      img {
        filter: var(--whiteFilter);
      }
    }
  }
  .guide-result {
    margin: 10px 0;
    background: var(--lightGray);
    padding: 7px;
    border-radius: 10px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 150px;
  }
  .guides-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    height: auto;
    align-items: center;
    justify-content: center;
    .guide {
      width: 100%;
    }
    .guide-skeleton {
      border-radius: 10px !important;
      overflow: hidden;
      min-height: 310px !important;
      margin: 0 auto !important;
    }
  }
  .pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    @media (max-width: 450px) {
      margin-top: 20px;
    }
    button {
      font-size: 1.1em;
      color: white;
      border-color: white;
      &:hover {
        background-color: var(--blue);
      }
    }
    .Mui-selected {
      background: var(--blue);
      color: white;
      &:hover {
        background-color: var(--blue);
      }
    }
  }
  .not-found {
    padding: 0;
    justify-content: left !important;
    div {
      display: flex;
      justify-content: left !important;
      img {
        margin-top: 15px;
        width: 150px;
      }
    }
  }
`;
