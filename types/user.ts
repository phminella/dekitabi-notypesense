export interface LanguageOption {
  language: string;
  code: string;
}

export interface Currency {
  currency: string;
  code: string;
  symbol: string;
  rate: number;
}

export interface StripeAccountData {
  id: string;
  requirements: any;
}

export interface ContactInfo {
  line: string;
  phone: string;
  email: string;
  whatsapp: string;
  kakao: string;
  skype: string;
  qq: string;
  wechat: string;
}

export interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  weibo: string;
  twitter: string;
  tiktok: string;
  substack: string;
  linkedin: string;
}

export interface NotificationsSettings {
  availabilityReminder: boolean;
  chatMessage: boolean;
  itineraryComment: boolean;
  itineraryLike: boolean;
  profileVisit: boolean;
}

export interface Chats {
  chatUser: string;
}

export interface CancellationPolicy {
  days: number;
  fee: number;
}
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface ShopUser {
  name: string;
  chats: Chats[];
  shopId: string;
  url: string;
  guide: "true";
  viewCounter: number;
  bookingCounter: number;
  shopFee: number;
  activities: any[];
  itineraries: string[];
  address: string;
  languages: string[];
  cancellationPolicy: CancellationPolicy[];
  contactEmail: string;
  description: string;
  photos: string[];
  openingHours: {
    [day in Weekday]: [string, string]; // e.g., { 0: ["09:00", "22:00"] }
  };
  phoneNumber: string;
  serviceLanguages: string[];
  website: string;
  email: string;
  uid: string;
  stripeUnverified?: string;
  stripeAccountId: string;
  stripeAccountRequirements: any;
  stripeFirstTime?: boolean;
  createdAt: number;
  lastVisit: number;
  sample?: boolean;
  language: LanguageOption;
}

export interface GuideUser {
  acceptTourFrom: number;
  newUser: boolean;
  completedTours: number;
  stripeAccountId: string;
  stripeAccountRequirements: any;
  stripeFirstTime: boolean;
  licensed: "false" | "true";
  bg: string;
  maxPeople: number;
  tours: string[];
  availability: any[];
  states: string[];
  country: string;
  canDrive: "false" | "true";
  verified: "false" | "true";
  stripeUnverified?: "true";
  replyTime: number;
  replyTimeList: any[];
  fee: {
    halfDay: number;
    fullDay: number;
  };
  getCards: boolean;
  firebaseLanguages: string[];
  description: string;
  contact: ContactInfo;
  socialMedia: SocialMediaLinks;
  photos: string[];
  ratings: any[];
  ratingScore: number;
  ratingCounter: number;
}

export interface TravelerUser {
  cart?: any[];
  stripeCustomerId?: string;
  ordersCounter?: number;
  booked?: any[];
}

export interface BaseUser {
  avatar: string;
  likesCounter: number;
  uid: string;
  username: string;
  guide: "true" | "false";
  email: string;
  chats: any[];
  firstname: string;
  lastname: string;
  createdAt: number;
  lastVisit: number;
  itineraries: string[];
  language: LanguageOption;
  languages: string[];
  currency: Currency;
  notificationsCounter: number;
  notificationsSettings: NotificationsSettings;
  firebaseMessagingTokens: string[];
  affiliateId?: string;
  couponsLeft?: number;
}

export type User =
  | ShopUser
  | (BaseUser & { guide: "true" } & GuideUser)
  | (BaseUser & { guide: "false" } & TravelerUser);
