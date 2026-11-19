/** A resolved language object used throughout the Home section. */
export interface Language {
  code: string;
}

/** A [lat, lng] geolocation pair. */
export type Geoloc = [number, number];

/** A single city/prefecture entry used in the HomeStep1 carousel. */
export interface Prefecture {
  country: string;
  _geoloc: Geoloc;
  url: string;
  city: string;
  translatedCity: Record<string, string>;
}

/** A less-visited prefecture shown in the HomePromotion section. */
export interface LessVisitedPrefecture {
  name: string;
  search: string;
}

/** Resolved URLs for one locale's rail pass links. */
export interface RailPassUrls {
  japanRailPassUrl: string;
  tohokuUrl: string;
  seishun18Url: string;
}

/** A single user review shown on the home page. */
export interface HomeReviewItem {
  platform: string;
  message: string;
  translation: string;
  store: "appstore" | "playstore" | "google";
  lang: string;
}

/** Shape of a single Typesense document hit (generic wrapper). */
export interface TypesenseHit<T = Record<string, unknown>> {
  document: T;
}

/** Shape of the itineraries data object passed to HomeItineraries. */
export interface ItinerariesData {
  city: Record<string, string>;
  prefecture?: {
    city: string;
  };
  itineraries?: TypesenseHit[];
}

/** Shape of a popular attraction item. */
export interface PopularAttraction {
  url: string;
  name: string;
  translatedName?: Record<string, string>;
  translatedState?: Record<string, string>;
}
