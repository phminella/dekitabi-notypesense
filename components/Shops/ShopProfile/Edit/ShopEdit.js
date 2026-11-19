import { ShopEditStyles } from "./styles/ShopEditStyles";
import BasicModal from "../../../UI/BasicModal";
import ShopEditString from "./ShopEditString";
import ShopEditLanguages from "./ShopEditLanguages";
import ShopEditCancellationPolicy from "./ShopEditCancellationPolicy";
import { useEffect, useRef } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore/lite";
import ShopEditOpeningHours from "./ShopEditOpeningHours";
import { useRouter } from "next/router";
const ShopEdit = ({
  setShowModal,
  showModal,
  t,
  setShopProfile,
  shopProfile,
  activity,
}) => {
  const router = useRouter();
  const addressRef = useRef();
  const contactEmailRef = useRef();
  const headlineRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const websiteRef = useRef();
  const phoneNumberRef = useRef();
  const serviceLanguagesRef = useRef();
  const openingHoursRef = useRef();
  const cancellationPolicyRef = useRef();
  const notificationRef = useRef();
  const updateProfile = async (field, value) => {
    setShopProfile({ ...shopProfile, [field]: value });
    const updatedDoc = await updateDoc(
      doc(getFirestore(), "shops", shopProfile?.uid),
      {
        [field]: value,
        ...(field === "name" && {
          url: value
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s\s+/g, " ")
            .toLowerCase()
            .trim()
            .split(" ")
            .join("-"),
        }),
      }
    ).then(() => {
      if (field === "name") {
        router
          .push({
            query: {
              id: value
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s\s+/g, " ")
                .toLowerCase()
                .trim()
                .split(" ")
                .join("-"),
            },
          })
          .then(() => {
            router.reload();
          });
      }
    });
    return true;
  };
  useEffect(() => {
    setTimeout(() => {
      if (showModal === "notificationRef") {
        notificationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "notification") {
        notificationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "headline") {
        headlineRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "address") {
        addressRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "contactEmail") {
        contactEmailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "name") {
        nameRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "description") {
        descriptionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "website") {
        websiteRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "phoneNumber") {
        phoneNumberRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "serviceLanguages") {
        serviceLanguagesRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "openingHours") {
        openingHoursRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 100);
  }, []);
  return (
    <ShopEditStyles>
      <BasicModal setShowModal={setShowModal} showModal={showModal} t={t}>
        <p className="profile-title">{t("shops:editShopInfo")}</p>
        {!activity && (
          <div ref={nameRef}>
            <ShopEditString
              field={"name"}
              updateProfile={updateProfile}
              t={t}
              shopProfile={shopProfile}
              showModal={showModal}
            />
          </div>
        )}
        {!activity && (
          <div ref={headlineRef}>
            <ShopEditString
              field={"headline"}
              updateProfile={updateProfile}
              t={t}
              shopProfile={shopProfile}
              showModal={showModal}
              maxChar={90}
            />
          </div>
        )}
        {!activity && (
          <div ref={descriptionRef}>
            <ShopEditString
              field={"description"}
              updateProfile={updateProfile}
              t={t}
              shopProfile={shopProfile}
              showModal={showModal}
            />
          </div>
        )}
        <div ref={notificationRef}>
          <ShopEditString
            field={"notification"}
            updateProfile={updateProfile}
            t={t}
            shopProfile={shopProfile}
            showModal={showModal}
            maxChar={1000}
          />
        </div>
        <div ref={addressRef}>
          <ShopEditString
            field={"address"}
            updateProfile={updateProfile}
            t={t}
            shopProfile={shopProfile}
            showModal={showModal}
            maxChar={100}
          />{" "}
        </div>
        <div ref={phoneNumberRef}>
          <ShopEditString
            field={"phoneNumber"}
            updateProfile={updateProfile}
            t={t}
            shopProfile={shopProfile}
            showModal={showModal}
            example={"03-9999-9999"}
            maxChar={17}
          />
        </div>
        <div ref={websiteRef}>
          <ShopEditString
            field={"website"}
            updateProfile={updateProfile}
            t={t}
            shopProfile={shopProfile}
            showModal={showModal}
            example={"https://www.dekitabi.com"}
          />
        </div>
        <div ref={contactEmailRef}>
          <ShopEditString
            field={"contactEmail"}
            updateProfile={updateProfile}
            t={t}
            shopProfile={shopProfile}
            showModal={showModal}
            example={"shops@dekitabi.com"}
            maxChar={60}
          />
        </div>
        <div ref={serviceLanguagesRef}>
          <ShopEditLanguages
            field={"serviceLanguages"}
            updateProfile={updateProfile}
            t={t}
            shopProfile={shopProfile}
            showModal={showModal}
          />
        </div>
        <div ref={cancellationPolicyRef}>
          <ShopEditCancellationPolicy
            field={"cancellationPolicy"}
            updateProfile={updateProfile}
            t={t}
            shopProfile={shopProfile}
            showModal={showModal}
          />
        </div>
        {!activity && (
          <div ref={openingHoursRef}>
            <ShopEditOpeningHours
              field={"openingHours"}
              updateProfile={updateProfile}
              t={t}
              shopProfile={shopProfile}
              showModal={showModal}
            />
          </div>
        )}
      </BasicModal>
    </ShopEditStyles>
  );
};
export default ShopEdit;
