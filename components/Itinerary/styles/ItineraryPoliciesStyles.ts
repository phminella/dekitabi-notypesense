import styled from "styled-components";
export const ItineraryPoliciesStyles = styled.div`
  height: 100%;
  overflow: auto;
  b,
  h4 {
    font-weight: 600;
  }
  .purchase-notice,
  .cancelation-policy,
  .reminders,
  .important {
    padding: 15px 10px;
    h2 {
      margin-bottom: 10px;
    }
    h3 {
      margin: 5px;
    }
    span {
      font-size: 0.8em;
    }
  }
  .important {
    background: var(--lightGray);
    padding: 10px;
    border-radius: 15px;
    img {
      filter: invert(72%) sepia(18%) saturate(1591%) hue-rotate(94deg)
        brightness(99%) contrast(87%);
      &.included {
        margin-top: 5px;
      }
      &.not-included {
        filter: invert(43%) sepia(81%) saturate(966%) hue-rotate(321deg)
          brightness(100%) contrast(98%);
        margin-top: 2px;
      }
    }
    ul {
      li {
        display: flex;
        gap: 3px;
      }
    }
    .more-important-notes {
      margin-top: 10px;
      .first-note,
      .last-note {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 1.1em;
      }
      a {
        color: var(--blue);
        text-decoration: underline;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--darkBlue);
          }
        }
      }
    }
  }
  .date-info {
    display: grid;
    gap: 10px;
    grid-template-columns: 50% 50%;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 10px;
    margin: 20px 0 15px 0;
  }
  .cancelation-policy {
    ul {
      border: 1px solid lightgray;
      border-radius: 5px;
      li {
        display: grid;
        grid-template-columns: 1fr 50px;
        padding: 10px;
        border-bottom: 1px solid lightgray;
        &:last-child {
          border-bottom: none;
        }
        .cancelation-fee {
          text-align: right;
        }
      }
    }
  }
  .reminders,
  .purchase-notice {
    ul li {
      display: grid;
      grid-template-columns: 10px 1fr;
      align-items: top;
      gap: 10px;
      .circle {
        margin-top: 5px;
        margin-left: 2px;
        width: 8px;
        height: 8px;
        border-radius: 50px;
        background-color: var(--pink);
      }
      margin-bottom: 7px;
    }
  }
`;
