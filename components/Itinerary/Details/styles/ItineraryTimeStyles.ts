import styled from "styled-components";
export const ItineraryTimeStyles = styled.div`
  position: relative;
  width: 100%;
  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    /* background: lightgray; */
    .icon-around {
      filter: var(--pinkFilter);
    }
    li {
      display: grid;
      justify-content: center;
      /* color: white; */
      border: 2px solid #ededed;
      padding: 7px;
      border-radius: 10px;
      text-align: center;
      text-transform: capitalize;
      background-color: white;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px;
        span {
          font-weight: 600;
          font-size: 1.1em;
        }
      }
      .icon-wrapper {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        background: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-bottom: 5px;
        background: var(--darkBlue);
        border: 3px solid white;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        .icon {
          filter: var(--whiteFilter);
        }
      }
    }
  }
  @media (max-width: 380px) {
    span {
      font-size: 1em !important;
    }
  }
`;
