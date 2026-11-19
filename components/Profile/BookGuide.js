import { BookGuideStyles } from "./styles/BookGuideStyles";
import useItinerary from "../../lib/useItinerary";
import { useRouter } from "next/router";
import { useState } from "react";
const BookGuide = ({ t, name }) => {
  const { newItinerary } = useItinerary();
  const router = useRouter();
  const [hideOptions, setHideOptions] = useState(false);
  if (hideOptions) return <></>;
  return (
    <BookGuideStyles>
      <p>{t("itineraryToBook", { name })}</p>
      <div className="buttons">
        <button
          className="normal-button"
          onClick={() => {
            newItinerary().then((data) => {
              router.push("/itinerary/" + data);
            });
          }}
        >
          {t("newItinerary")}
        </button>
        <button
          className="normal-button later"
          onClick={() => setHideOptions(true)}
        >
          {t("notNow")}
        </button>
      </div>
    </BookGuideStyles>
  );
};
export default BookGuide;
