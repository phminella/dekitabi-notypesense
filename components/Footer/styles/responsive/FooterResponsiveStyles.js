import styled from "styled-components";
export const FooterResponsiveStyles = styled.footer`
  @media (max-width: 1100px) {
    .footer .footer-wrapper .footer-lists {
      grid-template-columns: 0.8fr 1fr 1.2fr 1fr;
      gap: 20px;
      .footer-options {
        display: none;
      }
    }
  }
  @media (max-width: 760px) {
    .footer {
      padding: 30px 20px 20px 20px;
      .footer-wrapper .footer-lists {
        grid-template-columns: 1fr 1fr !important;
      }
      .footer-options {
        display: block !important;
      }
      .app-wrapper-desktop {
        text-align: left !important;
      }
      .footer-links {
        justify-content: left !important;
      }
      .footer-end {
        grid-template-columns: 1fr !important;
        .footer-social-media {
          justify-content: left !important;
        }
      }
    }
  }
  @media (max-width: 470px) {
    .footer .footer-wrapper .footer-lists {
      grid-template-columns: 1fr !important;
    }
    .footer {
      padding-bottom: 70px;
    }
  }
`;
