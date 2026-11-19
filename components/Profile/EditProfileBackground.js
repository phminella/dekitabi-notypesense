import { useRef, useState } from "react";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import BasicModal from "../UI/BasicModal";
import { useTranslation } from "next-i18next";
import { EditProfileBackgroundResponsiveStyles } from "./styles/responsive/EditProfileBackgroundResponsiveStyles";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  toursLength,
} from "firebase/storage";
import autoId from "../../lib/autoId";
const EditProfileBackground = ({ profile, setProfile, setLoadingBg }) => {
  const { t } = useTranslation();
  const profileBgOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [showBgOptions, setShowBgOptions] = useState(false);
  const updateProfileBg = (bg) => {
    updateDoc(doc(getFirestore(), "users", profile?.uid), {
      bg: `bg${bg}`,
    });
    setProfile({
      ...profile,
      bg: `bg${bg}`,
    });
    setShowBgOptions(false);
  };
  const fileRef = useRef();
  const [imageSelected, setImageSelected] = useState(true);
  const [uploadedImage, setUploadedImage] = useState();
  const [uploadProgress, setUploadProgress] = useState();
  const [uploadingBg, setUploadingBg] = useState();
  //
  //
  //
  const handleUploadImages = (files) => {
    if (files) {
      setUploadedImage(files[0]);
    } else {
      setImageSelected(false);
    }
  };
  const uploadImagesToStorage = () => {
    setUploadingBg(true);
    if (uploadedImage) {
      const fileName = autoId();
      setLoadingBg(true);
      const promises = [];
      const folderRef = ref(getStorage(), `/users/${profile?.uid}/bg`);
      listAll(folderRef)
        .then((listResults) => {
          const promises = listResults?.items?.map((item) => {
            return deleteObject(item);
          });
          Promise.all(promises);
        })
        .catch((err) => console.log(err));
      const imgRef = ref(
        getStorage(),
        `/users/${profile?.uid}/bg/${fileName}.${
          uploadedImage?.name?.split(".")[
            uploadedImage?.name?.split(".").length - 1
          ]
        }`
      );
      const uploadTask = uploadBytesResumable(imgRef, uploadedImage);
      promises.push(uploadTask);
      uploadTask?.on(
        "state_changed",
        (snapshot) => {
          setUploadProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 60
          );
          console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 60);
        },
        (error) => {},
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
              const newUrl = joinedUrl + "_1920x1080.webp?" + splittedUrl2;
              let extraProgress = 70;
              var intervalID = setInterval(function () {
                setUploadProgress(extraProgress);
                extraProgress = extraProgress + 5;
                getDownloadURL(
                  ref(
                    getStorage(),
                    `users/${profile?.uid}/bg/${
                      newUrl?.split("%2F")[3].split("?")[0]
                    }`
                  )
                )
                  .then(onResolve, onReject)
                  .catch((err) => {});
                function onResolve() {
                  clearInterval(intervalID);
                  updateDoc(doc(getFirestore(), "users", profile?.uid), {
                    bg: newUrl,
                  }).then(() => {
                    setTimeout(() => {
                      setLoadingBg(false);
                      setUploadingBg(false);
                      setShowBgOptions(false);
                    }, 500);
                    setUploadedImage();
                    setImageSelected(true);
                    fileRef.current = null;
                  });
                  setProfile({
                    ...profile,
                    bg: newUrl,
                  });
                }
                function onReject(error) {}
              }, 1000);
              setTimeout(function () {
                clearInterval(intervalID);
                setLoadingBg(false);
                setUploadingBg(false);
                setShowBgOptions(false);
                setUploadProgress(100);
              }, 8000);
            })
            .catch((err) => console.log(err));
        }
      );
    } else {
      setImageSelected(false);
    }
  };
  if (!profile) return <></>;
  return (
    <EditProfileBackgroundResponsiveStyles>
      <button
        className="bg-icon"
        style={{
          background:
            profile?.bg?.length < 5 || !profile?.bg
              ? `url(/img/profile-background/${
                  profile?.bg ? profile?.bg : "bg13"
                }.webp)`
              : `url(${profile?.bg})`,
        }}
        onClick={() => setShowBgOptions(true)}
      ></button>
      {showBgOptions && (
        <BasicModal setShowModal={setShowBgOptions} showModal={showBgOptions}>
          <div className="edit-picture-title">
            <h2>{t("selectImage")}</h2>
          </div>
          <div className="bg-options">
            {profileBgOptions?.map((profileBgOption, i) => (
              <button key={i} onClick={() => updateProfileBg(profileBgOption)}>
                <Image
                  fill
                  src={`/img/profile-background/bg${profileBgOption}.webp`}
                  style={{ objectFit: "cover" }}
                  alt="background"
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
              {!uploadingBg && (
                <>
                  <button onClick={() => setShowBgOptions(false)}>
                    {t("cancel")}
                  </button>
                  <button onClick={uploadImagesToStorage}>{t("upload")}</button>
                </>
              )}
              {uploadProgress > 0 && uploadProgress < 100 && (
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
              {uploadingBg &&
                (uploadProgress === 0 || uploadProgress === 100) && (
                  <Image
                    src="/img/icon-spinner.svg"
                    height={35}
                    width={35}
                    alt="spinner"
                  />
                )}
            </div>
            {!uploadedImage && !imageSelected && (
              <p className="error-message">⛔{t("profilePictureError")}</p>
            )}
          </div>
        </BasicModal>
      )}
    </EditProfileBackgroundResponsiveStyles>
  );
};
export default EditProfileBackground;
