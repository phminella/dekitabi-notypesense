import styled from "styled-components";
export const ReviewFormStyles = styled.div`
  background: url("/img/no-attractions/bg.webp");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 0;
  .review-wrapper {
    position: relative;
    max-width: 100lvh;
    margin: 0 auto 0 auto;
    padding: 20px;
    border-radius: 20px;
    background: white;
    overflow: hidden;
    @media (max-width: 600px) {
      margin: 0 10px;
    }
    .review-title,
    .review-intro {
      margin-bottom: 20px;
    }
    .review-title {
      border-bottom: 1px solid lightgray;
      padding-bottom: 10px;
    }
    .review-intro {
      h3 {
        color: var(--pink);
      }
      p {
      }
    }
    .ratings {
      margin: 20px 0;
      padding: 20px 10px;
      background: #f6f8fa;
      border-radius: 10px;
      font-size: 1.1em;
      .rating {
        margin-bottom: 20px;
        align-items:center;
        &:last-child {
          margin-bottom: 0;
        }
        .rating-stars {
          text-align: right;
        }
      }
        @media(max-width:450px) {
          padding:10px;
          .rating {
          grid-template-columns:1fr;
          .rating-stars {
            margin-top:10px;
            text-align:left;
          }}
        }
    }
    textarea {
      resize: none;
      width: 100%;
      max-width: 100%;
      height: 100px;
      border-radius: 5px;
      padding: 10px;
      border: none;
      background: #f6f8fa;
      &:focus {
        outline: none;
      }
    }
    .review-counter {
      font-size: 0.9em;
      line-height: 0.9em;
      text-align: right;
    }
    .submit-button {
      margin-top: 20px;
      .normal-button {
        img {
          filter: none;
        }
      }
      button {
        width: 100%;
        padding: 20px 0;
      }
    }
  }
`;
