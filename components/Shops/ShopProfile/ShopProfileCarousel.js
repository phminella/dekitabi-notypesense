import { ShopProfileCarouselStyles } from "./styles/ShopProfileCarouselStyles";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper styles
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const ShopProfileCarouselAdd = dynamic(
  () => import("./ShopProfileCarouselAdd"),
  {
    ssr: false,
  }
);
const ShopProfileCarousel = ({ shopProfile, isOwner, t, setMounted }) => {
  const [photos, setPhotos] = useState(shopProfile?.photos);
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef();
  const sendToFirst = async (index, photo) => {
    if (!isOwner) return;
    setLoading(true);
    try {
      const { doc, updateDoc, getFirestore } = await import(
        "firebase/firestore/lite"
      );

      let tempPhotos = [...photos];
      tempPhotos.splice(index, 1);
      tempPhotos.unshift(photo);

      const db = getFirestore();
      const userRef = doc(db, "shops", shopProfile?.uid);
      await updateDoc(userRef, { photos: tempPhotos });

      setPhotos(tempPhotos);
      setTimeout(() => {
        swiperRef?.current?.swiper?.slideTo(0);
      }, 0);
    } catch (err) {
      console.error("Error sending to first", err);
    } finally {
      setLoading(false);
    }
  };
  const deleteImage = async (index, photo) => {
    if (!isOwner) return;
    setLoading(true);
    try {
      const [
        { doc, updateDoc, getFirestore },
        { getStorage, ref, deleteObject },
      ] = await Promise.all([
        import("firebase/firestore/lite"),
        import("firebase/storage"),
      ]);

      let tempPhotos = [...photos];
      tempPhotos.splice(index, 1);

      const db = getFirestore();
      const userRef = doc(db, "shops", shopProfile?.uid);

      await updateDoc(userRef, { photos: tempPhotos });

      const storage = getStorage();
      const fileRef = ref(storage, photo);
      await deleteObject(fileRef);

      setPhotos(tempPhotos);
    } catch (err) {
      console.error("Error deleting photo", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ShopProfileCarouselStyles>
      {photos?.length === 0 && isOwner && (
        <ShopProfileCarouselAdd
          shopProfile={shopProfile}
          photos={photos}
          setPhotos={setPhotos}
          t={t}
        ></ShopProfileCarouselAdd>
      )}
      {shopProfile?.photos?.length > 0 && (
        <div className="slide-background first-image">
          <Image
            src={((u) => (u.searchParams.delete("token"), u.toString()))(
              new URL(shopProfile?.photos[0])
            )}
            alt="first shop image"
            layout="responsive"
            width={1000}
            height={1000}
            quality={65}
            sizes="(max-width: 768px) 90vw, (max-width: 1000px) 80vw, 1000px"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IC4AAACwAgCdASoEAAQAAVAfJZgCdLoA"
            priority
            loading="eager"
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>
      )}
      {(photos?.length > 0 ||
        (shopProfile?.videos?.length > 0 && !isOwner)) && (
        <Swiper
          modules={[Navigation]}
          speed={400}
          navigation={true}
          lazyPreloadPrevNext={0}
          loop={false}
          ref={swiperRef}
        >
          {photos.map((photo, i) => {
            return (
              <SwiperSlide key={i}>
                {i === 0 ? (
                  <></>
                ) : (
                  <div className="slide-background">
                    <Image
                      src={((u) => (
                        u.searchParams.delete("token"), u.toString()
                      ))(new URL(photo))}
                      alt={`shop-photo-${i}`}
                      layout="responsive" // Preserve the image's aspect ratio
                      width={1000} // Use the natural width of the image
                      height={1000} // Use the natural height of the image (1000x1000)
                      quality={65} // Optimize the image quality for performance
                      sizes="(max-width: 768px) 90vw, (max-width: 1000px) 80vw, 1000px" // Responsive sizing
                      priority={true} // Mark as high priority for LCP
                      loading="eager" // Ensure the image is loaded eagerly
                      style={{ objectFit: "contain", objectPosition: "center" }} // Image styling
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
                        ></Image>
                      </button>
                    )}
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
                        ></Image>
                      </button>
                    )}
                    {!loading && isOwner && (
                      <div className="image-delete image-add">
                        <ShopProfileCarouselAdd
                          shopProfile={shopProfile}
                          photos={photos}
                          setPhotos={setPhotos}
                          t={t}
                        ></ShopProfileCarouselAdd>
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
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </ShopProfileCarouselStyles>
  );
};
export default ShopProfileCarousel;
