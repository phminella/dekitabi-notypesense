import { AttractionOptionsStyles } from "./styles/AttractionOptionsStyles";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import isMobile from "../../../lib/isMobile";
const AttractionOptions = ({
  url,
  setShowItinerary,
  website,
  showOptions,
  attraction,
  setAttractionToAdd,
}) => {
  return (
    <AttractionOptionsStyles
      className={`attraction-options ${showOptions ? "show-options" : ""}`}
    >
      <div className="options-wrapper"></div>
      <div className="attraction-options-wrapper">
        <button
          onClick={() => {
            setAttractionToAdd(attraction);
            setShowItinerary(true);
          }}
        >
          <Image
            height={45}
            width={45}
            src="/img/icon-map-pin2.svg"
            alt="plus"
          ></Image>
        </button>
        <Link
          prefetch={false}
          href={`/attraction/${url}`}
          className="attraction-name"
          target={isMobile() ? "_self" : "_blank"}
          rel="noreferrer"
        >
          <Image
            height={30}
            width={30}
            src="/img/icon-info2.svg"
            alt="plus"
          ></Image>
        </Link>
        {website && (
          <a href={website} target="_blank" rel="noreferrer">
            <Image
              height={30}
              width={30}
              src="/img/icon-web.svg"
              alt="plus"
            ></Image>
          </a>
        )}
      </div>
    </AttractionOptionsStyles>
  );
};
export default React.memo(AttractionOptions);
