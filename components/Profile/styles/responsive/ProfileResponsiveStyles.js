import styled from "styled-components";
export const ProfileResponsiveStyles = styled.div`
  @media (max-width: 800px) {
    h1 {
      margin-top: 0;
    }
    .profile-content {
      grid-template-columns: 1fr !important;
    }
    .profile-header-wrapper {
      text-align: center;
      h2,
      .profile-rating,
      .profile-created,
      .language,
      .profile-reply-time,
      .language,
      .max-people,
      .transport,
      .profile-likes {
        justify-content: center;
      }
      .profile-header-badge {
        text-align: center;
      }
      .profile-header-prices {
        justify-content: center;
        li {
          margin-right: 10px !important;
        }
      }
    }
  }
  @media (max-width: 1050px) {
    .tours-wrapper {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 560px) {
    .tours-wrapper {
      grid-template-columns: 1fr;
    }
  }
`;
