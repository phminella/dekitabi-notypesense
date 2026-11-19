import { PhotosCarouselStyles } from "./styles/PhotosCarouselStyles";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper styles
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import { getStorage, ref, deleteObject } from "firebase/storage";
const PhotosCarousel = ({
  photos,
  profile,
  setProfile,
  t,
  user,
  setShowCarousel,
}) => {
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const deleteImage = (index, photo) => {
    setLoading(true);
    let tempPhotos = [...profile?.photos];
    tempPhotos?.splice(index, 1);
    const userRef = doc(getFirestore(), "users", profile?.uid);
    updateDoc(userRef, { photos: tempPhotos })
      .then(() => {
        const fileRef = ref(storage, photo);
        deleteObject(fileRef)
          .then(() => {
            setLoading(false);
            setProfile({ ...profile, photos: tempPhotos });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <PhotosCarouselStyles>
      <button
        className="close-icon"
        onClick={() => {
          setShowCarousel(false);
        }}
      >
        <Image
          src="/img/icon-close.svg"
          height={40}
          width={40}
          alt="close-dekitabi-tour-guide-photos"
        />
      </button>
      <Swiper
        speed={400}
        navigation={true}
        modules={[Navigation]}
        lazyPreloadPrevNext={1}
        loop={true}
      >
        {photos?.map((photo, i) => (
          <SwiperSlide key={i}>
            {!loading && profile?.uid === user?.uid && (
              <button
                onClick={() => deleteImage(i, photo)}
                className="image-delete"
              >
                <Image
                  height={40}
                  width={40}
                  src="/img/icon-delete2.svg"
                  alt="delete-dekitabi-tour-guide-photo"
                ></Image>
                <br />
              </button>
            )}
            {loading && (
              <div className="spinner">
                <Image
                  height={120}
                  width={120}
                  src="/img/icon-spinner.svg"
                  alt="processing-tour-guide-deleting-photos"
                ></Image>
              </div>
            )}
            <div className="slide-background">
              <Image
                style={{ objectFit: "contain" }}
                src={photo?.url ? photo?.url : photo}
                alt="dekitabi-tour-guide-photo"
                fill
                quality={40}
              ></Image>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </PhotosCarouselStyles>
  );
};
export default React.memo(PhotosCarousel);
