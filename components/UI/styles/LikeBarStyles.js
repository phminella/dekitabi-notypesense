import styled from "styled-components";
export const LikeBarStyles = styled.div`
  .like-bar {
    position: relative;
    width: 100%;
    min-width: 200px;
    height: 24px;
    border-radius: 20px;
    background: white;
    margin: 10px 0;
    overflow: hidden;
    border: 2px solid white;
    .like-counter {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 1fr 1fr;
      position: absolute;
      left: 0;
      top: 0;
      color: var(--darkBlue);
      width: 100%;
      height: 100%;
      text-align: center;
      padding: 0 8px;
      font-size: 0.9em;
      font-weight: bold;
      p:first-child {
        text-align: left;
      }
      p:last-child {
        text-align: right;
      }
    }
    .like-bar-filled {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: var(--pink);
    }
  }
  .profile-likes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: white;
    font-weight: 600;
    b {
      font-weight: 600;
    }
    span {
      color: var(--pink);
    }
  }
`;
