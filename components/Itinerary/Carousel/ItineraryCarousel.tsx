import { ItineraryCarouselStyles } from "./styles/ItineraryCarouselStyles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import { getStorage, ref, deleteObject } from "firebase/storage";
import AttractionImage from "../../S/Attractions/AttractionImage";
import { User } from "../../../types/user";
import { Itinerary, ItineraryPhoto, CarouselPhoto } from "../../../types/itinerary";

interface ItineraryCarouselProps {
  itineraryPhotos: ItineraryPhoto[];
  photos: CarouselPhoto[];
  setShowCarousel: (show: boolean) => void;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryId: string;
  user: User;
  itineraryCreatedBy: string;
}

const ItineraryCarousel = ({
  itineraryPhotos,
  photos,
  setShowCarousel,
  updateItineraryHandler,
  itineraryId,
  user,
  itineraryCreatedBy,
}: ItineraryCarouselProps) => {
  const storage = getStorage();
  const [loading, setLoading] = useState(false);

  const deleteImage = (index: number, photo: ItineraryPhoto) => {
    setLoading(true);
    let tempPhotos = [...itineraryPhotos];
    tempPhotos.splice(index, 1);
    tempPhotos = tempPhotos.filter((p) =>
      p?.src?.includes("https://")
    );
    
    const itineraryRef = doc(getFirestore(), "itineraries", itineraryId);
    updateDoc(itineraryRef, { photos: tempPhotos })
      .then(() => {
        const fileRef = ref(storage, photo?.src);
        deleteObject(fileRef)
          .then(() => {
            updateItineraryHandler({ photos: tempPhotos });
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const allPhotos = [...(itineraryPhotos as any[]), ...(photos as any[])];

  return (
    <ItineraryCarouselStyles>
      <button
        className="close-icon"
        onClick={() => {
          setShowCarousel(false);
        }}
      >
        <Image src="/img/icon-close.svg" height={40} width={40} alt="close" />
      </button>
      <Swiper
        speed={400}
        navigation={true}
        modules={[Navigation]}
        lazyPreloadPrevNext={1}
        loop={allPhotos.length > 1}
      >
        {allPhotos.map((photo, i) => (
          <SwiperSlide key={i}>
            {!loading &&
              user?.guide === "true" &&
              itineraryCreatedBy === user?.uid &&
              photo?.src?.includes("https://") && (
                <button
                  onClick={() => deleteImage(i, photo)}
                  className="image-delete"
                >
                  <Image
                    height={40}
                    width={40}
                    src="/img/icon-delete2.svg"
                    alt="delete"
                  />
                </button>
              )}
            {loading && (
              <div className="spinner">
                <Image
                  height={120}
                  width={120}
                  src="/img/icon-spinner.svg"
                  alt="loading"
                />
              </div>
            )}
            <div className="slide-background">
              {photo?.attraction ? (
                <AttractionImage
                  attraction={photo.attraction}
                  size={1000}
                  index={photo.index}
                  sizes={"(max-width:700px) 100vw, 700px"}
                  priority={false}
                />
              ) : (
                <Image
                  style={{ objectFit: "cover" }}
                  src={photo?.src}
                  alt="tour-image"
                  fill
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </ItineraryCarouselStyles>
  );
};
export default React.memo(ItineraryCarousel);
