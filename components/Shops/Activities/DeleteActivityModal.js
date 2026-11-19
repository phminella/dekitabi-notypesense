import { useRouter } from "next/router";
import Modal from "../../UI/Modal";
import React, { useState } from "react";
import Image from "next/image";
import { deleteDoc, doc, getFirestore } from "firebase/firestore/lite";
import { getStorage, ref, deleteObject } from "firebase/storage";
const DeleteActivityModal = ({
  activity,
  t,
  setShopProfile,
  shopProfile,
  setShowModal,
  index,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deleteActivity = async () => {
    if (activity?.photos?.length > 0) {
      const deletedPhotos = await activity?.photos?.map((photo) => {
        const fileRef = ref(getStorage(), photo);
        deleteObject(fileRef);
      });
    }
    const deletedActivity = await deleteDoc(
      doc(getFirestore(), "activities", activity?.id)
    );
    if (setShopProfile) {
      let tempActivities = { ...shopProfile?.activities };
      tempActivities.splice(index, 1);
      setShopProfile({ ...shopProfile, activities: tempActivities });
      setShowModal(false);
    } else {
      router.push(`/shop/${shopProfile?.url}`).then(() => {
        router.reload();
      });
    }
  };
  return (
    <Modal>
      <div style={{ paddingBottom: "15px" }}>
        <h3 className="modal-title">
          <Image height={25} width={25} src="/img/icon-alert.svg" alt="alert" />
          {t("shops:deleteActivity")}
        </h3>
        <p className="modal-message">
          {t("shops:deleteActivityMsg")} <span>({activity?.name})</span>
        </p>
        <div className="modal-buttons">
          {!loading ? (
            <button
              className="normal-button"
              onClick={() => {
                setLoading(true);
                deleteActivity();
              }}
            >
              {t("shops:deleteActivity")}
            </button>
          ) : (
            <div className="fake-button">
              <Image
                height={30}
                width={30}
                src="/img/icon-spinner.svg"
                alt="spinner"
              />
            </div>
          )}
          <button
            className="normal-button"
            onClick={() => setShowModal(false)}
            disabled={loading}
          >
            {t("no")}
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default React.memo(DeleteActivityModal);
