import { useEffect, useRef, useState } from "react";
import HomeItineraries from "../../Home/HomeItineraries/HomeItineraries";
import { SuggestedAttractionsStyles } from "../SuggestedAttractions/styles/SuggestedAttractionsStyles";
import { createLocalSearchClient } from "../../../lib/search/client";

const SuggestedItineraries = ({
  t,
  itineraryAttractions,
  language,
  itineraryId,
}) => {
  const [suggested, setSuggested] = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    const fetchSuggestedItineraries = async () => {
      if (!itineraryAttractions || itineraryAttractions.length === 0) return;

      const baseAttraction = itineraryAttractions[0];
      if (!baseAttraction?._geoloc || baseAttraction._geoloc.length !== 2) return;

      try {
        if (!clientRef.current) {
          clientRef.current = createLocalSearchClient();
        }

        const client = clientRef.current;
        const [lat, lng] = baseAttraction._geoloc;

        const searchParams = {
          q: "",
          query_by: "name",
          filter_by: `_geoloc:(${lat}, ${lng}, 80km)`,
          sort_by: `_geoloc(${lat}, ${lng}):asc`,
          per_page: 6,
          page: 1,
        };

        const results = await client
          .collections("tours")
          .documents()
          .search(searchParams);

        const filtered = results?.hits?.filter(
          (hit) => hit.document?.id && hit.document.id !== itineraryId
        );

        if (filtered && filtered.length > 0) {
          setSuggested({
            itineraries: filtered,
            city: baseAttraction.translatedState,
            prefecture: baseAttraction,
          });
        }
      } catch (error) {
        console.error("Error fetching suggested itineraries:", error);
      }
    };

    fetchSuggestedItineraries();
  }, [itineraryAttractions, itineraryId]);

  if (!suggested?.itineraries?.length) return null;

  return (
    <SuggestedAttractionsStyles className="suggested-itineraries">
      <HomeItineraries
        t={t}
        language={language}
        itineraries={suggested}
        itineraryId={itineraryId}
        fromItinerary={true}
      />
    </SuggestedAttractionsStyles>
  );
};

export default SuggestedItineraries;
