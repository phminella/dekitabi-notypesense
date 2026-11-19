import styled from "styled-components";
export const ItineraryNoGuidesStyles = styled.div`
  margin-top: 15px;
  font-size: 1.2em;
  margin: 15px auto 0 auto;
  /* text-align: center; */
  color: white;
  padding: 10px 20px;
  border-radius: 15px;
  .first-message {
    padding-bottom: 10px;
    border-bottom: 1px solid lightgray;
    font-weight: bold;
    text-align: center;
    .subtitle {
      font-weight: 400;
      /* font-size: 0.9em; */
    }
  }
  a {
    display: inline-flex;
    margin-top: 10px;
  }
  .or {
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3em;
    font-weight: bold;
  }
  .no-guides-wrapper {
    position: relative;
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
    padding-top: 10px;
    .contact-guide,
    .contact-us {
      padding: 20px;
      p,
      a {
        text-align: center;
        /* max-width: 350px; */
        margin: 0 auto;
      }
      a {
        display: block;
        margin-top: 10px;
        text-align: center;
      }
    }
    .contact-us {
      a {
        color: orange;
        text-decoration: underline;
        font-size: 1.1em;
      }
    }
    .contact-guide {
      border-right: 1px solid lightgray;
    }
  }
  @media (max-width: 750px) {
    .no-guides-wrapper {
      grid-template-columns: 1fr;
      .contact-guide {
        border: none;
      }
      .contact-us,
      .contact-guide {
        padding: 0;
      }
    }
    .or {
      position: relative;
      text-align: center;
      padding: 8px 0;
      color: var(--pink);
    }
  }
`;
