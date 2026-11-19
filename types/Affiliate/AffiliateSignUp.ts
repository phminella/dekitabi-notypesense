interface SendEmailRequest {
  sender: string;
  to: string;
  subject: string;
  body: string;
}

interface SendEmailResponse {
  data: {
    success: boolean;
    message: string;
  };
}

interface StripeAccountRequirements {
  currently_due: string[];
  eventually_due: string[];
  past_due: string[];
  pending_verification: string[];
  disabled_reason?: string | null;
  errors?: Array<{
    code: string;
    reason?: string;
    requirement?: string;
    type: string;
  }>;
}
interface CreateStripeAccountRequest {
  email: string;
}

interface CreateStripeAccountResponse {
  id: string;
  requirements: StripeAccountRequirements;
}

export type {
  SendEmailRequest,
  SendEmailResponse,
  CreateStripeAccountRequest,
  CreateStripeAccountResponse,
};
