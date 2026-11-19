export interface Affiliate {
  balance: number;
  completedTours: string[];
  email: string;
  id: string;
  signedUpGuides: string[];
  stripeAccountId: string;
  viewCounter: number;
  coupon?: string;
  payPalId?: string;
}

interface StripeBalanceAmount {
  /** Amount in the smallest currency unit (e.g., cents) */
  amount: number;
  /** Currency code, e.g., "usd", "jpy" */
  currency: string;
}

export interface StripeBalance {
  available: StripeBalanceAmount[];
  pending: StripeBalanceAmount[];
  stripeAccount: string;
  type?: string;
}
