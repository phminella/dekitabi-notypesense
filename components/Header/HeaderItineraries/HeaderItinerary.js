import { HeaderItineraryStyles } from "./styles/HeaderItineraryStyles";
import Link from "next/link";
import Image from "next/image";
import React from "react";
const HeaderItinerary = ({
  itinerary,
  setShowDeleteModal,
  setShowItineraries,
  setItineraryToDelete,
  dragging,
}) => {
  return (
    <HeaderItineraryStyles className={`${dragging ? "dragging" : ""}`}>
      <div className="chat-options">
        <Link
          prefetch={false}
          className={`itinerary-view`}
          href={`/itinerary/${itinerary.url ? itinerary.url : itinerary.id}`}
          onClick={() => setShowItineraries(false)}
        >
          <Image
            height={13}
            width={13}
            src="/img/icon-view.svg"
            alt="view-dekitabi-itinerary"
          />
        </Link>
        {!itinerary.status && (
          <button
            className="itinerary-delete"
            onClick={() => {
              setShowDeleteModal(true);
              setItineraryToDelete(itinerary);
            }}
          >
            <Image
              height={13}
              width={13}
              src="/img/icon-delete.svg"
              alt="dekitabi-delete-itinerary-from-itineraries"
            />
          </button>
        )}
      </div>
      <Link
        className={`itinerary-item flex-wrapper-five`}
        href={`/itinerary/${itinerary?.url ? itinerary?.url : itinerary?.id}`}
        onClick={() => setShowItineraries(false)}
        prefetch={false}
      >
        <Image
          height={15}
          width={15}
          src="/img/icon-marker.svg"
          alt="dekitabi-view-itinerary"
        />
        <p>{itinerary?.name}</p>
      </Link>
    </HeaderItineraryStyles>
  );
};
export default React.memo(HeaderItinerary);
