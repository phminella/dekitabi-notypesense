import { EditProfilePictureStyles } from "./styles/EditProfilePictureStyles";
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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BasicModal from "../../UI/BasicModal";
const EditProfilePicture = ({
  profile,
  setProfile,
  setEditPicture,
  editPicture,
  t,
  setLoadingProfilePicture,
}) => {
  const fileRef = useRef();
  const [imageSelected, setImageSelected] = useState(true);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState([]);
  const profilePictures = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ];
  const handleUploadImages = (files) => {
    if (files) {
      let uploaded = [...uploadedImages];
      files?.some((file) => {
        if (uploaded?.findIndex((f) => f?.name === file?.name) === -1) {
          uploaded?.push(file);
        }
      });
      setUploadedImages(uploaded);
    }
  };
  const updateProfilePicture = (avatar) => {
    updateDoc(doc(getFirestore(), "users", profile?.uid), {
      avatar: `/img/profile-pictures/avatar-${avatar}.webp`,
    });
    setProfile({
      ...profile,
      avatar: `/img/profile-pictures/avatar-${avatar}.webp`,
    });
    setEditPicture(false);
  };
  const uploadImagesToStorage = () => {
    setLoadingProfilePicture(true);
    const promises = [];
    if (uploadedImages?.length < 1) {
      setImageSelected(false);
      return false;
    }
    uploadedImages?.map((file) => {
      if (profile?.avatar !== "/img/avatar.png") {
        const folderRef = ref(getStorage(), `/users/${profile?.uid}/avatar`);
        listAll(folderRef)
          .then((listResults) => {
            const promises = listResults?.items?.map((item) => {
              return deleteObject(item);
            });
            Promise.all(promises);
          })
          .catch((err) => {
            console.log(err);
            setLoadingProfilePicture(false);
          });
      }
      const fileName = autoId();
      const imgRef = ref(
        getStorage(),
        `/users/${profile?.uid}/avatar/${fileName}.${
          file?.name?.split(".")[file?.name?.split(".").length - 1]
        }`
      );
      const uploadTask = uploadBytesResumable(imgRef, file);
      promises?.push(uploadTask);
      uploadTask?.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          setUploadProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          setLoadingProfilePicture(false);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask?.snapshot?.ref)
            .then((downloadURL) => {
              const splittedUrl1 = downloadURL?.split(".");
              const splittedUrl2 = splittedUrl1[5]?.split("?")[1];
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
                    `users/${profile?.uid}/avatar/${
                      newUrl?.split("%2F")[3]?.split("?")[0]
                    }`
                  )
                )
                  .then(onResolve, onReject)
                  .catch((err) => {
                    console.log(err);
                    setLoadingProfilePicture(false);
                  });
                function onResolve() {
                  clearInterval(intervalID);
                  updateDoc(doc(getFirestore(), "users", profile?.uid), {
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
            .catch((err) => {
              console.log(err);
              setLoadingProfilePicture(false);
            });
        }
      );
    });
    Promise.allSettled(promises)
      .then(() => {
        setUploadProgress(0);
        setUploadedImages([]);
        setEditPicture(false);
        fileRef.current.value = null;
      })
      .catch((err) => console.log(err));
  };
  return (
    <EditProfilePictureStyles>
      <BasicModal setShowModal={setEditPicture} showModal={editPicture}>
        <div className="profile-picture-wrapper">
          <div className="edit-picture-title">
            <h2>{t("selectImage")}</h2>
          </div>
          <div className="picture-options">
            {profilePictures?.map((profilePicture, i) => (
              <button
                key={i}
                onClick={() => updateProfilePicture(profilePicture)}
              >
                <img
                  width={"100%"}
                  height={"100%"}
                  src={`/img/profile-pictures/avatar-${profilePicture}.webp`}
                  alt="profile-picture"
                />
              </button>
            ))}
          </div>
          <div className="upload-wrapper">
            <div className="edit-picture-title">
              <h2>{t("orUploadFromFiles")}</h2>
            </div>
            <div className="picture-wrapper">
              <input
                ref={fileRef}
                id="file"
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                onChange={(e) =>
                  handleUploadImages(Array.prototype.slice.call(e.target.files))
                }
              />
              {uploadProgress < 1 && (
                <>
                  <button onClick={() => setEditPicture(false)}>
                    {t("cancel")}
                  </button>
                  <button onClick={uploadImagesToStorage}>{t("upload")}</button>
                </>
              )}
              {uploadProgress > 0 && (
                <div style={{ width: 50, height: 50 }}>
                  <CircularProgressbar
                    value={uploadProgress}
                    text={`${Math.round(uploadProgress)}%`}
                    styles={buildStyles({
                      pathColor: `var(--pink)`,
                      textColor: "var(--pink)",
                      trailColor: "#d6d6d6",
                    })}
                  />
                </div>
              )}
            </div>
            {uploadedImages?.length < 1 && !imageSelected && (
              <p className="error-message">⛔{t("profilePictureError")}</p>
            )}
          </div>
        </div>
      </BasicModal>
    </EditProfilePictureStyles>
  );
};
export default React.memo(EditProfilePicture);
