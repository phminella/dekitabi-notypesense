import Image from "next/image";
import { HomeStepsStyles } from "./styles/HomeStepsStyles";
import { TFunction } from "next-i18next";

interface HomeStepsProps {
  t: TFunction;
}

const HomeSteps = ({ t }: HomeStepsProps): JSX.Element => {
  return (
    <HomeStepsStyles>
      <div className="steps-wrapper">
        <div className="step">
          <div className="text">
            <Image
              src={"/img/icon-itinerary.svg"}
              alt="marker"
              width={28}
              height={28}
            />
            <div className="text-wrapper">
              <p className="title">{String(t("createYourItinerary"))}</p>
              <p className="message">{String(t("createYourItineraryMsg"))}</p>
            </div>
          </div>
          {/* Removed deprecated layout="intrinsic" prop (WARNING-4) */}
          <Image
            src={"/img/home/steps/1.webp"}
            alt="home-step-1"
            width={577 * 0.5}
            height={761 * 0.5}
            className="step-screenshot"
          />
        </div>
        <div className="step">
          <div className="text">
            <Image
              src={"/img/icon-chat2.svg"}
              alt="marker"
              width={28}
              height={28}
            />
            <div className="text-wrapper">
              <p className="title">{String(t("chatWithTourGuides"))}</p>
              <p className="message">{String(t("chatWithTourGuidesMsg"))}</p>
            </div>
          </div>
          <Image
            src={"/img/home/steps/2.webp"}
            alt="home-step-2"
            width={519 * 0.5}
            height={765 * 0.5}
            className="step-screenshot"
          />
        </div>
        <div className="step">
          <div className="text">
            <Image
              src={"/img/icon-check.svg"}
              alt="marker"
              width={28}
              height={28}
            />
            <div className="text-wrapper">
              <p className="title">{String(t("completeYourBooking"))}</p>
              <p className="message">{String(t("completeYourBookingMsg"))}</p>
            </div>
          </div>
          <Image
            src={"/img/home/steps/3.webp"}
            alt="home-step-3"
            width={519 * 0.5}
            height={765 * 0.5}
            className="step-screenshot"
          />
        </div>
      </div>
    </HomeStepsStyles>
  );
};

export default HomeSteps;
