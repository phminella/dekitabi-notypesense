import { EditVerifiedStyles } from "./styles/EditVerifiedStyles";
import Image from "next/legacy/image";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import React, { useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getFunctions, httpsCallable } from "firebase/functions";
const EditVerified = ({ profile, setProfile, t }) => {
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const [invalidFile, setInvalidFile] = useState(false);
  const fileRef = useRef("");
  const [uploadedImages, setUploadedImages] = useState([]);
  let images = [];
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const handleUploadImages = (files) => {
    console.log(files);
    setInvalidFile(false);
    if (files) {
      let uploaded = [...uploadedImages];
      files?.some((file) => {
        if (uploaded?.findIndex((f) => f?.name === file?.name) === -1) {
          uploaded?.push(file);
        }
      });
      if (uploaded?.length > 0) {
        setUploadedImages(uploaded);
      }
    }
  };
  const uploadImagesToStorage = () => {
    if (uploadedImages?.length > 0) {
      const promises = [];
      uploadedImages?.map((file) => {
        const imgRef = ref(
          getStorage(),
          `img/verified-users/${profile?.uid}/${file?.name}`
        );
        const uploadTask = uploadBytesResumable(imgRef, file);
        promises.push(uploadTask);
        uploadTask?.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            setUploadProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {},
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              images?.push({ url: downloadURL, alt: "verified" });
            });
          }
        );
      });
      Promise.allSettled(promises)
        .then(() => {
          // setTimeout(() => {
          //   setDoc(doc(getFirestore(), "userPhotoId", profile.uid), {
          //     images,
          //   });
          // }, 2000);
          setTimeout(() => {
            updateDoc(doc(getFirestore(), "users", profile?.uid), {
              checkingDocument: images,
            })
              .then(() => {
                sendEmail({
                  to: "contact@dekitabi.com",
                  subject: `dekitabi | A guide has sent his license for verification`,
                  body: `email: ${profile?.email}, first name: ${profile?.firstname}, last name: ${profile?.lastname}, stripe account id: ${profile?.stripeAccountId}, user uid: ${profile?.uid}`,
                })
                  .then(() => {
                    setUploadComplete(true);
                    setUploadProgress(0);
                    setUploadedImages([]);
                    setProfile({ ...profile, checkingDocument: true });
                    fileRef.current.value = null;
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }, 1000);
        })
        .catch((err) => console.log(err));
    } else {
      setInvalidFile(true);
    }
  };
  return (
    <EditVerifiedStyles>
      <div className="title">
        <h3>
          {t("licensedGuide")} <span>{t("optional")}</span>
        </h3>
      </div>
      {!uploadComplete && (
        <p className="sub-title">
          {t("licensedBadge")}
          <Image
            className="licensed"
            src="/img/icon-licensed.svg"
            height={20}
            width={20}
            alt="licensed"
          />
        </p>
      )}
      <div className="verified-licensed">
        {uploadComplete && (
          <div className="upload-complete">
            <h4>✅ {t("uploadComplete")}</h4>
            <p>
              {t("uploadReply")} (<b>{profile?.email}</b>)
            </p>
          </div>
        )}
        {!uploadComplete && (
          <>
            {profile?.checkingDocument && uploadProgress === 0 && (
              <div className="checking">
                <Image
                  src="/img/icon-checking.svg"
                  height={35}
                  width={35}
                  alt="error"
                />
                {t("uploadChecking")}
                <br /> {t("uploadChecking2")} ({profile?.email})
              </div>
            )}
            {profile?.licensed === "true" && !profile?.checkingDocument && (
              <div className="valid-until">
                {profile?.licensed === "false" && (
                  <div className="not-licensed">
                    <Image
                      className="licensed"
                      src="/img/icon-licensed.svg"
                      height={50}
                      width={50}
                      alt="licensed"
                    />
                    {t("documentIfLicensed")}
                  </div>
                )}
              </div>
            )}
            <div className="verified-wrapper">
              <input
                ref={fileRef}
                id="file"
                type="file"
                multiple
                accept="image/jpeg, image/jpg, image/png, .pdf"
                onChange={(e) =>
                  handleUploadImages(Array.prototype.slice.call(e.target.files))
                }
              />
              {uploadProgress < 1 && (
                <button onClick={uploadImagesToStorage}>{t("upload")}</button>
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
              {uploadProgress === 100 && (
                <Image
                  src="/img/icon-spinner.svg"
                  height={50}
                  width={50}
                  alt="icon-spinner"
                />
              )}
            </div>
          </>
        )}
        {invalidFile && (
          <div className="error-message">
            &#9940;{t("verification_document_corrupt")}
          </div>
        )}
      </div>
    </EditVerifiedStyles>
  );
};
export default React.memo(EditVerified);
