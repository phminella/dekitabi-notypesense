import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import autoId from "../../../lib/autoId";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import React, { useState, useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
const EditUploadGuidePicture = ({
  profile,
  setProfile,
  setEditPicture,
  t,
  setLoadingProfilePicture,
}) => {
  const fileRef = useRef();
  const handleUploadImages = (files) => {
    setLoadingProfilePicture(true);
    if (files) {
      uploadImagesToStorage(files);
    }
  };
  const uploadImagesToStorage = (uploadedImages) => {
    const promises = [];
    if (uploadedImages?.length < 1) {
      return false;
    }
    uploadedImages?.map((file) => {
      const folderRef = ref(getStorage(), `/users/${profile.uid}/avatar`);
      listAll(folderRef)
        .then((listResults) => {
          const promises = listResults?.items?.map((item) => {
            return deleteObject(item);
          });
          Promise.all(promises);
        })
        .catch((err) => console.log(err));
      const fileName = autoId();
      const imgRef = ref(
        getStorage(),
        `/users/${profile.uid}/avatar/${fileName}.${
          file?.name?.split(".")[file?.name?.split(".").length - 1]
        }`
      );
      const uploadTask = uploadBytesResumable(imgRef, file);
      promises.push(uploadTask);
      uploadTask?.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              const splittedUrl1 = downloadURL.split(".");
              const splittedUrl2 = splittedUrl1[5].split("?")[1];
              const joinedUrl = [
                splittedUrl1[0],
                splittedUrl1[1],
                splittedUrl1[2],
                splittedUrl1[3],
                splittedUrl1[4],
              ].join(".");
              const newUrl = joinedUrl + "_700x700.webp?" + splittedUrl2;
              var intervalID = setInterval(function () {
                getDownloadURL(
                  ref(
                    getStorage(),
                    `users/${profile.uid}/avatar/${
                      newUrl.split("%2F")[3].split("?")[0]
                    }`
                  )
                )
                  .then(onResolve, onReject)
                  .catch((err) => {});
                function onResolve() {
                  clearInterval(intervalID);
                  updateDoc(doc(getFirestore(), "users", profile.uid), {
                    avatar: newUrl,
                  });
                  setProfile({
                    ...profile,
                    avatar: newUrl,
                  });
                  setLoadingProfilePicture(false);
                }
                function onReject(error) {}
              }, 1000);
              setTimeout(function () {
                clearInterval(intervalID);
              }, 8000);
            })
            .catch((err) => console.log(err));
        }
      );
    });
    Promise.allSettled(promises)
      .then(() => {
        setEditPicture(false);
        fileRef.current.value = null;
      })
      .catch((err) => console.log(err));
  };
  return (
    <label className="upload-profile-pic">
      {t("uploadImage")}
      <input
        ref={fileRef}
        id="file"
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/gif"
        onChange={(e) =>
          handleUploadImages(Array.prototype.slice.call(e.target.files))
        }
      />
    </label>
  );
};
export default EditUploadGuidePicture;
