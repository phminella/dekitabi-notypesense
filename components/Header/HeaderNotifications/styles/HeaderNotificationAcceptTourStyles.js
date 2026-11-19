import styled from "styled-components";
export const HeaderNotificationAcceptTourStyles = styled.div`
  .notification-message {
    .tour-info {
      font-size: 0.8em;
      color: gray;
      margin-bottom: 3px;
      display: flex;
      gap: 5px;
    }
  }
  .tour-details {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 1em;
    a {
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
    img {
      filter: var(--pinkFilter);
    }
  }
  .notification-contact {
    display: grid;
    grid-template-columns: 110px 1fr;
    @media (max-width: 350px) {
      grid-template-columns: 1fr;
    }
    gap: 5px;
    margin-top: 5px;
    width: 100%;
    overflow: hidden;
    font-size: 0.9em;
    .contact-label {
      color: gray;
    }
    .contact-value {
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: -moz-pre-wrap; /* Mozilla */
      white-space: -hp-pre-wrap; /* HP printers */
      white-space: -o-pre-wrap; /* Opera 7 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: pre-wrap; /* CSS 2.1 */
      white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
      word-wrap: break-word; /* IE */
      word-break: break-all;
      a {
        color: var(--blue);
        text-decoration: underline;
      }
    }
  }
  .normal-button {
    margin: 10px 0;
    text-transform: capitalize;
  }
  .time-left {
    height: 15px;
  }
  .time-left-spinner {
    filter: var(--blueFilter);
    height: 14px;
  }
`;
