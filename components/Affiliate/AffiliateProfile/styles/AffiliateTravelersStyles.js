import styled from "styled-components";
export const AffiliateTravelersStyles = styled.div`
  .title {
    text-align: center;
    font-size: 1.3em;
    font-weight: bold;
    color: var(--darkBlue);
  }
  .link {
    width: 100%;
    text-align: center;
    font-size: 0.9em;
  }
  .tour-wrapper {
    border-radius: 20px;
    position: relative;
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 10px;
    align-items: center;
    overflow: hidden;
    margin-bottom: 10px;
    border: 1px solid lightgray;
    &:last-child {
      margin-bottom: 0;
    }
    .image-wrapper {
      position: relative;
      min-height: 100px;
      overflow: hidden;
    }
    p {
      font-size: 0.8em;
    }
    .date {
      color: var(--pink);
    }
    b {
      font-size: 1.2em;
    }
  }
  .guide-wrapper {
    display: grid;
    grid-template-columns: 70px 1fr;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
    border: 1px solid lightgray;
    padding: 5px 3px;
    border-radius: 20px;
    p {
      font-size: 0.9em;
      line-height: 1.2em;
    }
    &:last-child {
      margin-bottom: 0;
    }
    .registered {
      font-size: 0.8em;
      color: var(--pink);
    }
  }
  select {
    margin: 20px 0;
    border: 1px solid lightgray;
  }
  .not-found {
    text-align: center;
    font-size: 1.3em;
    color: var(--darkBlue);
  }
  .show-more-wrapper {
    display: flex;
    justify-content: center;
    .show-more {
      border: 1px solid lightgray;
      height: 48px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 10px;
      padding: 10px;
      margin: 0 auto;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
    }
  }
  .close-icon {
    background: none !important;
  }
  .loading-more {
    display: flex;
    justify-content: center;
  }
`;
