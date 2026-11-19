import styled from "styled-components";
export const HomeNewsStyles = styled.section`
  max-width: 1200px;
  margin: 30px auto 0 auto;
  @media (max-width: 1250px) {
    margin: 0 10px 0 10px;
  }
  background-image: linear-gradient(
    95.2deg,
    rgba(173, 252, 234, 1) 26.8%,
    rgba(192, 229, 246, 1) 64%
  );
  border-radius: 20px;
  padding: 10px;
  .news-title {
    padding-bottom: 5px;
    padding-right: 10px;
    border-right: 5px solid white;
  }
  .pass-name,
  .news-title {
    line-height: 1.1em;
    font-weight: bold;
    font-size: 1.7em;
    color: var(--darkBlue);
  }
  .announcements {
    border-radius: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 1em;
    display: grid;
    grid-template-columns: 300px 1fr;
    align-items: center;
    .news {
      border-radius: 5px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: start;
      width: 100%;
      gap: 10px;
      li {
        &.news-mobile {
          text-align: center;
          padding: 12px 5px;
          .rail-pass {
            border-radius: 50%;
            border: 5px solid white;
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
    }
  }
  @media (max-width: 870px) {
    .announcements {
      display: block;
      .news-title {
        border: none;
      }
    }
  }
  @media (max-width: 430px) {
    .news {
      grid-template-columns: 1fr !important;
    }
  }
`;
