import { HomeGuideStyles } from "./styles/HomeGuideStyles";
import Image from "next/image";
import useItinerary from "../../lib/useItinerary";
import { useRouter } from "next/router";
import { TFunction } from "next-i18next";
import type { RefObject } from "react";
import { Language } from "../../types/home";

interface HomeGuideProps {
  t: TFunction;
  stepsRef: RefObject<HTMLElement>;
  language: Language;
}

const HomeGuide = ({ t, stepsRef, language }: HomeGuideProps): JSX.Element => {
  const { newItinerary } = useItinerary();
  const router = useRouter();

  return (
    <HomeGuideStyles>
      <div className="guide-wrapper">
        <button
          className="new-itinerary-button"
          onClick={() => {
            newItinerary()
              .then((data: string | null) => {
                if (data) {
                  router.push("/itinerary/" + data);
                }
              })
              .catch((err) => {
                console.error("Failed to create itinerary:", err);
                alert(t("errorCreatingItinerary") || "Failed to create itinerary. Please try again.");
              });
          }}
        >
          <Image
            src="/img/icon-itinerary2.svg"
            alt="new-itinerary"
            height={30}
            width={30}
            priority
          />
          {String(t("startTrip2"))}
        </button>
      </div>
    </HomeGuideStyles>
  );
};

export default HomeGuide;
