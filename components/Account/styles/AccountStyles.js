import styled from "styled-components";
export const AccountStyles = styled.div`
  max-width: 1000px;
  margin: 120px auto 50px auto;
  .go-to-profile {
    h2 {
      font-weight: 400;
      a {
        font-weight: 400;
        text-decoration: underline;
        color: var(--blue);
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--darkBlue);
          }
        }
      }
    }
  }
  .account-menu {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 50px;
    li {
      a {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        justify-content: start;
        text-align: left;
        padding: 55px 15px 15px 15px;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        transition: box-shadow 0.3s ease-in-out;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            box-shadow: rgba(0, 0, 0, 0.05) 0px 3px 8px;
          }
        }
        img {
          position: absolute;
          top: 15px;
          left: 15px;
        }
        h5 {
          font-size: 1.2em;
          font-weight: 400;
          margin-bottom: 10px;
        }
        p {
          color: gray;
        }
      }
    }
  }
`;
