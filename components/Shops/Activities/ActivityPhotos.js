import { ShopProfileCarouselStyles } from "../ShopProfile/styles/ShopProfileCarouselStyles";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper styles
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";
import ActivityPhotosAdd from "./ActivityPhotosAdd";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Image from "next/image";
const ActivityPhotos = ({ activity, isOwner, t }) => {
  const [photos, setPhotos] = useState(activity?.photos);
  const [loading, setLoading] = useState(false);
  let storage;
  const swiperRef = useRef();
  try {
    storage = getStorage();
  } catch (err) {
    console.log(err);
  }

  const sendToFirst = (index, photo) => {
    setLoading(true);
    let tempPhotos = [...photos];
    tempPhotos?.splice(index, 1);
    tempPhotos?.unshift(photo);
    const userRef = doc(getFirestore(), "activities", activity?.id);
    updateDoc(userRef, { photos: tempPhotos })
      .then(() => {
        setPhotos(tempPhotos);
        setTimeout(() => {
          swiperRef?.current?.swiper?.slideTo(0);
          setLoading(false);
        }, 0);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const deleteImage = (index, photo) => {
    setLoading(true);
    let tempPhotos = [...photos];
    tempPhotos?.splice(index, 1);
    const userRef = doc(getFirestore(), "activities", activity?.id);
    updateDoc(userRef, { photos: tempPhotos })
      .then(() => {
        const fileRef = ref(storage, photo);
        deleteObject(fileRef)
          .then(() => {
            setPhotos(tempPhotos);
            setLoading(false);
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
    <ShopProfileCarouselStyles>
      {photos?.length === 0 && isOwner && (
        <ActivityPhotosAdd
          activity={activity}
          photos={photos}
          setPhotos={setPhotos}
          t={t}
        ></ActivityPhotosAdd>
      )}
      {photos?.length === 0 && !isOwner && <></>}
      {photos?.length > 0 && (
        <Swiper
          modules={[Navigation]}
          speed={400}
          navigation={true}
          lazyPreloadPrevNext={0}
          loop={true}
          ref={swiperRef}
        >
          {photos.map((photo, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="slide-background">
                  <Image
                    fill
                    src={photo}
                    alt={`activity-photo-${i}`}
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    priority={i === 0 ? true : false}
                    quality={100}
                  />
                  {!loading && isOwner && i > 0 && (
                    <button
                      onClick={() => sendToFirst(i, photo)}
                      className="image-delete image-first"
                    >
                      <Image
                        height={20}
                        width={25}
                        src="/img/icon-move-first.svg"
                        alt="move-dekitabi-shop-photo"
                        quality={100}
                      ></Image>
                    </button>
                  )}{" "}
                  {!loading && isOwner && (
                    <button
                      onClick={() => deleteImage(i, photo)}
                      className="image-delete"
                    >
                      <Image
                        height={20}
                        width={20}
                        src="/img/icon-delete2.svg"
                        alt="delete-dekitabi-shop-photo"
                        quality={100}
                      ></Image>
                    </button>
                  )}{" "}
                  {!loading && isOwner && (
                    <div className="image-delete image-add">
                      <ActivityPhotosAdd
                        activity={activity}
                        photos={photos}
                        setPhotos={setPhotos}
                        t={t}
                      ></ActivityPhotosAdd>
                    </div>
                  )}
                  {loading && (
                    <Image
                      height={40}
                      width={40}
                      className="image-delete"
                      src="/img/icon-spinner.svg"
                      alt="loading"
                    ></Image>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </ShopProfileCarouselStyles>
  );
};
export default ActivityPhotos;
