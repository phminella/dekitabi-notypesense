export interface ItineraryGuide {
  username: string;
  firstname: string;
  lastname: string;
  languages: string[];
  email: string;
  fee: {
    halfDay: number;
    fullDay: number;
  };
  feeWithTransport?: {
    halfDay: number;
    fullDay: number;
  } | false;
  avatar: string;
  photos: string[]; 
  uid: string;
  maxPeople: number;
  maxPeopleTransport?: number;
  transportIncluded: "true" | "false";
  verified?: "true" | "false";
  licensed?: "true" | "false";
  canDrive?: "true" | "false";
}

export interface GuideInfo {
  guide?: string; 
  guideData: ItineraryGuide;
  guideFee: number; 
}
