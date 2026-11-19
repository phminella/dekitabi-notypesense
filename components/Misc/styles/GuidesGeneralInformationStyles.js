import styled from "styled-components";
export const GuidesGeneralInformationStyles = styled.div`
  max-width: 800px;
  margin: 120px auto 50px auto;
  min-height: 350px;
  font-size: 1.1em;
  @media (max-width: 840px) {
    margin: 20px 10px;
  }
  .iframes {
    border-radius: 10px;
  }
  .manuals-wrapper {
    margin-top: 15px;
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 5px;
    li {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap: 10px;
      white-space: nowrap;
      div {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      @media (max-width: 500px) {
        display: block;
      }
    }
  }
  h1 span {
    color: var(--pink);
  }
  .video-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    video {
      margin-top: 15px;
      max-width: 100%;
      border-radius: 15px;
      &:first-child {
        margin-top: 0;
      }
    }
    video,
    .video-spinner {
      &.hide {
        display: none;
      }
    }
  }
  .video-language-button {
    margin: 10px 0 15px 0;
  }
  a,
  .video-language-button {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  ul {
    margin: 10px 0;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #e3e8ee;
    li {
      display: grid;
      align-items: top;
      grid-template-columns: 15px 1fr;
      gap: 5px;
      color: #414552;
      padding: 10px;
      &:nth-child(odd) {
        background: #f7fafc;
      }
      div:last-child {
        width: 100%;
        max-width: 250px;
        text-align: right;
      }
      .circle {
        margin-top: 5px;
        width: 12px;
        height: 12px;
        border-radius: 50px;
        background-color: var(--pink);
      }
    }
  }
  h3 {
    font-size: 1.8em;
    margin-bottom: 10px;
    span {
      color: var(--blue);
    }
  }
  section {
    position: relative;
    background: var(--lightGray);
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
  }
  .itinerary {
    margin-top: 30px;
    h1 {
      font-size: 2.5em;
      margin-bottom: 30px;
    }
  }
  .powered-by-stripe {
    padding-top: 0;
  }
`;
