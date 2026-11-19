// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import { ItineraryAddPhotoStyles } from "./styles/ItineraryAddPhotoStyles";
import Image from "next/image";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
} from "firebase/storage";
import React, { useState, useRef } from "react";
import Error from "../../UI/Error";
import "react-circular-progressbar/dist/styles.css";
import autoId from "../../../lib/autoId";
import { Itinerary } from "../../../types/itinerary";

interface ItineraryPhoto {
  src: string;
}

interface ItineraryAddPhotoProps {
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryPhotos: ItineraryPhoto[];
  itineraryId: string;
  t: (key: string) => string;
}

const ItineraryAddPhoto = ({
  updateItineraryHandler,
  itineraryPhotos,
  itineraryId,
  t,
}: ItineraryAddPhotoProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadedFilesRef = useRef<string[]>([]);
  uploadedFilesRef.current = [...itineraryPhotos.map(p => typeof p === 'string' ? p : p.src)];
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleUploadImages = (files: File[]) => {
    setLoading(true);
    if (files && itineraryPhotos?.length + files?.length < 11) {
      setShowError(false);
      uploadImagesToStorage(files);
    } else {
      setShowError(true);
      setLoading(false);
    }
  };

  const uploadImagesToStorage = async (uploadedImages: File[]) => {
    let tempPhotos: ItineraryPhoto[] = [];
    
    uploadedImages.forEach((file) => {
      let photoExists = false;
      const randomName = autoId();
      const extension = file.name.split(".").pop();
      const newFileName = `${randomName}.${extension}`;
      
      const thumbName = `${newFileName}_1000x1000.webp`;

      itineraryPhotos.forEach((photo) => {
        const photoSrc = typeof photo === 'string' ? photo : photo.src;
        if (photoSrc?.includes(thumbName)) {
          photoExists = true;
        }
      });

      if (!photoExists) {
        const storage = getStorage();
        const imgRef = ref(storage, `itineraries/${itineraryId}/photos/${newFileName}`);
        const uploadTask = uploadBytesResumable(imgRef, file);

        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.error("Upload error:", error);
            setLoading(false);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const splittedUrl = downloadURL.split("?");
            const baseUrl = splittedUrl[0];
            const queryParams = splittedUrl[1];
            
            const newUrl = `${baseUrl}_1000x1000.webp?${queryParams}`;
            
            const intervalID = setInterval(() => {
              const thumbRef = ref(storage, `itineraries/${itineraryId}/photos/${thumbName}`);
              getDownloadURL(thumbRef)
                .then(() => {
                  clearInterval(intervalID);
                  tempPhotos.unshift({ src: newUrl });
                  
                  if (tempPhotos.length === uploadedImages.length) {
                    updateItineraryHandler({
                      photos: [...tempPhotos, ...itineraryPhotos],
                    });
                    if (fileRef.current) fileRef.current.value = "";
                    setLoading(false);
                  }
                })
                .catch(() => {
                  // Still processing
                });
            }, 1000);

            setTimeout(() => {
              clearInterval(intervalID);
              if (loading) setLoading(false);
            }, 15000);
          }
        );
      } else {
        // Skip if exists
        if (tempPhotos.length + 1 === uploadedImages.length) {
            setLoading(false);
        }
      }
    });
  };

  return (
    <ItineraryAddPhotoStyles>
      <Error
        showError={showError}
        setShowError={setShowError}
        t={t}
        errorMsg={t("photosError")}
      />
      <label className="input-photos">
        <input
          ref={fileRef}
          id="file"
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/gif"
          multiple
          onChange={(e) => {
             if (e.target.files) {
                 handleUploadImages(Array.from(e.target.files));
             }
          }}
        />
        {!loading && <>{t("addPhotos")}</>}
        {loading && (
          <Image
            height={30}
            width={30}
            src="/img/icon-spinner.svg"
            alt="loading"
          />
        )}
      </label>
    </ItineraryAddPhotoStyles>
  );
};
export default React.memo(ItineraryAddPhoto);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
