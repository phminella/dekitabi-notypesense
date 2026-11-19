import { ItineraryAttractionOptionsStyles } from "./styles/ItineraryAttractionOptionsStyles";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { User } from "../../../types/user";
import { Attraction } from "../../../types/attraction";

interface ItineraryAttractionOptionsProps {
  itineraryStatus: boolean;
  setShowModal: (modal: string | boolean) => void;
  attraction: Attraction;
  openSendReport: (name: string) => void;
  user: User;
  setAttractionToDelete: (attr: Attraction | null) => void;
  t?: (key: string) => string;
  itineraryId?: string;
}

const ItineraryAttractionOptions = ({
  itineraryStatus,
  setShowModal,
  attraction,
  openSendReport,
  user,
  setAttractionToDelete,
}: ItineraryAttractionOptionsProps) => {
  // const language = useSelector((state: any) => state.app.language);
  return (
    <ItineraryAttractionOptionsStyles>
      {!itineraryStatus && (
        <button
          onClick={() => {
            setAttractionToDelete(attraction);
            setShowModal("deleteAttraction");
          }}
        >
          <Image
            className="options-icon"
            height={20}
            width={20}
            src="/img/icon-delete.svg"
            alt="delete"
          />
          <span />
        </button>
      )}
      {user?.guide === "true" && (
        <>
          <button
            onClick={() => {
              openSendReport(attraction?.name);
            }}
          >
            <Image
              className="options-icon"
              height={20}
              width={20}
              src="/img/icon-report.svg"
              alt="report"
            />
            <span />
          </button>
        </>
      )}
    </ItineraryAttractionOptionsStyles>
  );
};
export default React.memo(ItineraryAttractionOptions);
