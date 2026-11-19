import React, { useState } from "react";
import Image from "next/image";
import NoPhoto from "./NoPhoto";
import Skeleton from "@mui/material/Skeleton";
const AttractionImage = ({
  attraction,
  size,
  index = 1,
  quality = 70,
  sizes = "",
  height = 0,
  width = 0,
  priority,
}) => {
  const [loading, setLoading] = useState(true);
  const [noPhoto, setNoPhoto] = useState(false);
  if (noPhoto) return <NoPhoto />;
  return (
    <div className="attraction-image" style={{ height: "100%", width: "100%" }}>
      {loading && <Skeleton variant="rounded" width={"100%"} height={"100%"} />}
      {!noPhoto ? (
        <Image
          style={{ position: "absolute", top: "0" }}
          className="attraction-image-component"
          alt={`dekitabi-tour-${attraction}`}
          height={height}
          width={width}
          fill={width > 0 ? false : true}
          src={
            attraction?.includes("https://")
              ? attraction
              : `https://firebasestorage.googleapis.com/v0/b/dekitabi.appspot.com/o/attractions%2F${attraction}%2F${index}_${size}x${size}.webp?alt=media`
          }
          quality={quality}
          onLoad={(e) => {
            e.target.style.display = "block";
            setLoading(false);
            setNoPhoto(false);
          }}
          onError={(e) => {
            e.target.style.display = "none";
            setNoPhoto(true);
          }}
          sizes={sizes}
          priority={priority}
        />
      ) : (
        // <Image
        //   className="attraction-image-component"
        //   alt="background"
        //   fill
        //   src={
        //     attractionPhotos?.length > 0
        //       ? attractionPhotos[photo]?.includes("https://")
        //         ? attractionPhotos[photo]
        //         : `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${
        //             attractionPhotos?.length > 0
        //               ? attractionPhotos[photo]
        //               : "https://www.dekitabi.com/ok.png"
        //       : "https://www.dekitabi.com/ok.png"
        //   }
        //   quality={50}
        //   onLoad={(e) => {
        //     e.target.style.display = "block";
        //     setLoading(false);
        //   }}
        //   onError={(e) => {
        //     e.target.style.display = "none";
        //     if (attractionId && attractionPhotos?.length > photo) {
        //       console.log("will make changes on firestore");
        //       console.log(attractionId);
        //       setPhoto(photo + 1);
        //       const attractionRef = doc(
        //         getFirestore(),
        //         "attractions",
        //         attractionId
        //       );
        //       updateDoc(attractionRef, {
        //         photos: arrayRemove(attractionPhotos[photo]),
        //       }).then(() => {
        //         console.log("removed");
        //         if (removeErrorPhoto) {
        //           removeErrorPhoto(attractionPhotos[photo]);
        //         }
        //       });
        //     } else {
        //       if (attractionPhotos?.length > photo) {
        //         setPhoto(photo + 1);
        //       } else {
        //         console.log("SET NO PHOTO", attractionId);
        //         if (attractionId) {
        //           getPhotosFromGoogle(attractionId).then((photos) => {
        //             if (photos) {
        //               console.log(photos);
        //               setAttractionPhotos(photos);
        //               setPhoto(0);
        //             } else {
        //               setNoPhoto(true);
        //               setLoading(false);
        //             }
        //           });
        //         } else {
        //           setNoPhoto(true);
        //           setLoading(false);
        //         }
        //       }
        //     }
        //   }}
        // />
        <NoPhoto />
      )}
    </div>
  );
};
export default React.memo(AttractionImage);
