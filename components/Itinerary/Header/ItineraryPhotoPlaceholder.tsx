import Image from "next/image";
import React from "react";
import { ItineraryPhotoPlaceholderStyles } from "./styles/ItineraryPhotoPlaceholderStyles";

interface ItineraryPhotoPlaceholderProps {
  bg: number | string;
}

const ItineraryPhotoPlaceholder = ({ bg }: ItineraryPhotoPlaceholderProps) => {
  return (
    <ItineraryPhotoPlaceholderStyles>
      <Image
        style={{
          objectFit: "cover",
          objectPosition: "center center",
        }}
        alt="background"
        fill
        priority={true}
        src={`/img/bg/Japan/${bg}.webp`}
        quality={10}
        sizes="100vw, (max-width: 280px) 50vw"
      />
    </ItineraryPhotoPlaceholderStyles>
  );
};
export default ItineraryPhotoPlaceholder;
