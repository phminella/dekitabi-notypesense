export type LanguageCode =
  | "en"
  | "ja"
  | "zh-CN"
  | "zh-TW"
  | "ko"
  | "fil"
  | "th"
  | "vi"
  | "ms"
  | "fr"
  | "es"
  | "it"
  | "pt"
  | "id";
interface AttractionReview {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}
export interface Attraction {
  address?: string | Record<LanguageCode, string>;
  description?: string;
  _geoloc: [number, number]; // [latitude, longitude]
  area?: string;
  city?: string;
  closedDays?: string;
  country?: string;
  duration: number;
  hide: string; // looks like "false" or "true" stored as string
  id: string;
  mapUrl?: string;
  name: string;
  openingHours?: string[] | string;
  openingPeriods?: {
    open: {
      day: number;
      time: string; // e.g. "1000"
    };
    close: {
      day: number;
      time: string; // e.g. "2100"
    };
  }[] | string;
  phoneNumber?: string;
  photos: string[];
  rating?: number;
  ratingCounter?: number;
  reviews?: Record<LanguageCode, AttractionReview[]> | AttractionReview[];
  state?: string;
  tags: string[];
  translatedArea?: Record<LanguageCode, string>;
  translatedCity?: Record<LanguageCode, string>;
  translatedName?: Record<LanguageCode, string>;
  translatedState?: Record<LanguageCode, string>;
  translatedDescription?: Record<LanguageCode, string>;
  url: string;
  website?: string;
  photosCounter?: number;
  date?: {
    from: number;
    to: number;
  };
}
