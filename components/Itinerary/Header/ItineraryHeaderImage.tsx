import { ItineraryHeaderImageStyles } from "./styles/ItineraryHeaderImageStyles";
import React from "react";
import Image from "next/image";

interface ItineraryHeaderImageProps {
  src: string;
}

const ItineraryHeaderImage = ({ src }: ItineraryHeaderImageProps) => {
  return (
    <ItineraryHeaderImageStyles>
      <Image
        style={{ objectFit: "cover" }}
        alt="background"
        fill
        src={src}
        quality={80}
      />
    </ItineraryHeaderImageStyles>
  );
};
export default React.memo(ItineraryHeaderImage);
