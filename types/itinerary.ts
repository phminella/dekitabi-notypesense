import { ItineraryGuide } from "./itineraryGuide";
import { Attraction } from "./attraction";

export interface TravelMode {
  type: string;
  time: number;
  mapTime?: number;
}

export interface ItineraryTime {
  duration: number;
  transitTime: number;
  attractionTransitTime: number[];
  arrivalDepartureTime: { arrival: number; departure?: number }[];
}

export interface Itinerary {
  id: string;
  name: string;
  url?: string;
  date: string;
  startTime: string;
  attractions: string[];
  itineraryAttractions?: Attraction[];
  description: string;
  photos: { src: string }[];
  person: number;
  travelModes: (string | TravelMode)[];
  durations: number[];
  createdBy: string;
  guide: string | false;
  guideData?: ItineraryGuide | false;
  published: boolean;
  status: boolean | string;
  lunch: number;
  meetingPlace?: Partial<Attraction> | "" | false;
  endPlace?: Partial<Attraction> | "" | false;
  locale?: string;
  translatedName?: Record<string, string>;
  currency?: string;
  ratingScore?: number;
  ratings?: any[];
  commentsCounter?: number;
  ratingCounter?: number;
  viewsCounter?: number;
  likesCounter?: number;
  guideFee?: number;
  price?: number;
  primaryLanguage?: string;
  notes?: string;
  translatedDescription?: Record<string, string>;
}

export interface ItinerarySsr extends Itinerary {
  itineraryAttractions?: Attraction[];
  locale?: string;
  translatedName?: Record<string, string>;
  currency?: string;
}

export interface ItineraryPhoto {
  src: string;
}

export interface CarouselPhoto {
  attraction: string;
  index: number;
  src?: string;
}

export interface ItineraryError {
  code: number;
  title: string;
  message: string;
}
