import { ProfileCarouselAddPhotoStyles } from "./styles/ProfileCarouselAddPhotoStyles";
import Image from "next/legacy/image";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useState, useRef } from "react";
import autoId from "../../../lib/autoId";
const ProfileCarouselAddPhoto = ({ profile, setProfile, t }) => {
  const fileRef = useRef();
  const uploadedFilesRef = useRef();
  uploadedFilesRef.current = [...profile?.photos];
  const [loading, setLoading] = useState(false);
  const handleUploadImages = (files) => {
    if (files) {
      setLoading(true);
      if (profile?.photos?.length + files?.length < 21) {
        uploadImagesToStorage(files);
      }
    }
  };
  const uploadImagesToStorage = async (uploadedImages) => {
    const promises = [];
    let tempPhotos = [];
    await Promise.all(
      uploadedImages?.map(async (file) => {
        let photoExists = false;
        let randomName = autoId();
        const newFileName =
          randomName +
          "." +
          file?.name?.split(".")[file?.name?.split(".").length - 1];
        profile?.photos?.map((photo) => {
          if (
            photo?.split("%2F")[3].split("?")[0] ===
            newFileName + "_1000x1000.webp"
          ) {
            photoExists = true;
          }
        });
        if (!photoExists) {
          const imgRef = ref(
            getStorage(),
            `users/${profile?.uid}/photos/${newFileName}`
          );
          const uploadTask = uploadBytesResumable(imgRef, file);
          promises.push(uploadTask);
          uploadTask?.on(
            "state_changed",
            (snapshot) => {},
            (error) => {},
            async () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask?.snapshot?.ref).then(
                async (downloadURL, error) => {
                  const splittedUrl1 = downloadURL?.split(".");
                  const splittedUrl2 = splittedUrl1[5]?.split("?")[1];
                  const joinedUrl = [
                    splittedUrl1[0],
                    splittedUrl1[1],
                    splittedUrl1[2],
                    splittedUrl1[3],
                    splittedUrl1[4],
                  ].join(".");
                  const newUrl = joinedUrl + "_1000x1000.webp?" + splittedUrl2;
                  var intervalID = setInterval(function () {
                    getDownloadURL(
                      ref(
                        getStorage(),
                        `users/${profile?.uid}/photos/${
                          newUrl?.split("%2F")[3]?.split("?")[0]
                        }`
                      )
                    )
                      .then(onResolve, onReject)
                      .catch((err) => {});
                    function onResolve() {
                      clearInterval(intervalID);
                      tempPhotos?.unshift(
                        joinedUrl + "_1000x1000.webp?" + splittedUrl2
                      );
                      if (tempPhotos?.length === uploadedImages?.length) {
                        updateDoc(doc(getFirestore(), "users", profile?.uid), {
                          photos: [...tempPhotos, ...profile?.photos],
                        });
                        setProfile({
                          ...profile,
                          photos: [...tempPhotos, ...profile?.photos],
                        });
                        fileRef.current.value = null;
                        setLoading(false);
                      }
                    }
                    function onReject(error) {}
                  }, 1000);
                  setTimeout(function () {
                    clearInterval(intervalID);
                  }, 8000);
                }
              );
            }
          );
        }
      })
    );
  };
  return (
    <ProfileCarouselAddPhotoStyles>
      <label className="input-photos">
        <input
          ref={fileRef}
          id="file"
          type="file"
          accept="image/jpeg, image/jpg, image/png, image/gif"
          multiple
          onChange={(e) =>
            handleUploadImages(Array.prototype.slice.call(e.target.files))
          }
        />
        <div>
          {!loading && (
            <>
              <Image
                src="/img/icon-plus2.svg"
                height={40}
                width={40}
                alt="add-tour-guide-photo"
              />
              <h3>{t("clickHereUpload")}</h3>
              <br />
              <span>
                {t("uploadsLeft")} {20 - profile?.photos?.length}
              </span>
              <p>
                {t("uploadedNumber")} {profile?.photos?.length}
              </p>
            </>
          )}
          {loading && (
            <div className="spinner">
              <Image
                height={50}
                width={50}
                src="/img/icon-spinner.svg"
                alt="loading-new-tour-guide-photo"
              ></Image>
            </div>
          )}
        </div>
      </label>
    </ProfileCarouselAddPhotoStyles>
  );
};
export default React.memo(ProfileCarouselAddPhoto);
