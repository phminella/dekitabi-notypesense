import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import dottie from "dottie";
import ScrollContainer from "react-indiana-drag-scroll";

import { SuggestedAttractionsStyles } from "./styles/SuggestedAttractionsStyles";
import PopularAttractionsSkeleton from "../../Home/HomePopularAttractions/HomePopularAttractionsSkeleton";
import SuggestedAttractionSkeleton from "./SuggestedAttractionSkeleton";
import ScrollContainerArrows from "../../UI/ScrollContainerArrows";
import { createLocalSearchClient } from "../../../lib/search/client";

const SuggestedAttraction = dynamic(() => import("./SuggestedAttraction"), {
  loading: () => (
    <SuggestedAttractionsStyles>
      <PopularAttractionsSkeleton />
    </SuggestedAttractionsStyles>
  ),
});

const SuggestedAttractions = ({ t, itineraryAttractions, language }) => {
  const [loading, setLoading] = useState(true);
  const [suggestedAttractions, setSuggestedAttractions] = useState([]);
  const clientRef = useRef(null);
  const containerRef = useRef();

  useEffect(() => {
    const fetchSuggestedAttractions = async () => {
      if (!itineraryAttractions || itineraryAttractions.length === 0) return;

      const baseAttraction =
        itineraryAttractions[Math.floor(itineraryAttractions.length / 2)];

      if (!baseAttraction?._geoloc || baseAttraction._geoloc.length !== 2) return;

      try {
        if (!clientRef.current) {
          clientRef.current = createLocalSearchClient();
        }

        const [lat, lng] = baseAttraction._geoloc;
        const client = clientRef.current;

        const searchParams = {
          q: "",
          query_by: "url",
          filter_by: `_geoloc:(${lat}, ${lng}, 4km) && hide:="false"`,
          sort_by: "ratingCounter:desc",
          per_page: 25,
          page: 1,
        };

        const results = await client
          .collections("attractions")
          .documents()
          .search(searchParams);

        const filteredAttractions = results.hits
          .map((hit) => hit.document)
          .filter(
            (doc) =>
              doc?.url &&
              !itineraryAttractions.some((attr) => attr.url === doc.url)
          );

        setSuggestedAttractions(filteredAttractions);
      } catch (error) {
        console.error("Error fetching suggested attractions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedAttractions();
  }, [itineraryAttractions]);

  if (loading) return <SuggestedAttractionSkeleton />;
  if (!suggestedAttractions?.length) return null;

  return (
    <SuggestedAttractionsStyles>
      <h2 className="itinerary-titles">{t("nearbyAttractions")}</h2>
      <div className="attractions-wrapper">
        <ScrollContainerArrows
          containerRef={containerRef}
          itemWidth={200}
          suggestedAttractions={true}
        />
        <ScrollContainer className="scroll-container" innerRef={containerRef}>
          {suggestedAttractions.map((attraction, i) => (
            <SuggestedAttraction
              key={i}
              attraction={dottie.transform(attraction)}
              t={t}
              language={language}
            />
          ))}
        </ScrollContainer>
      </div>
    </SuggestedAttractionsStyles>
  );
};

export default SuggestedAttractions;
