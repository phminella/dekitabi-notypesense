import { ShopDescriptionStyles } from "./styles/ShopDescriptionStyles";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const EditInformationButton = dynamic(
  () => import("../../Activities/EditInformationButton"),
  {
    ssr: false,
  }
);
const AddInformationButton = dynamic(
  () => import("../../Activities/AddInformationButton"),
  {
    ssr: false,
  }
);
const ShopDescription = ({ shopProfile, isOwner, setShowEditModal, t }) => {
  const [showDescription, setShowDescription] = useState();
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  useEffect(() => {
    setDescriptionHeight(
      document.getElementById("description-p")?.scrollHeight
    );
  }, [shopProfile?.description]);
  return (
    <ShopDescriptionStyles>
      {shopProfile?.description && (
        <div
          className={`description-wrapper ${showDescription ? "show" : "hide"}`}
        >
          {" "}
          {isOwner && (
            <EditInformationButton
              setShowModal={setShowEditModal}
              field={"description"}
            />
          )}
          {descriptionHeight > 21 && (
            <button
              className="show-description link"
              onClick={() => setShowDescription(!showDescription)}
            >
              {showDescription ? <>{t("hide")} </> : <>{t("showMore")} </>}
            </button>
          )}
          <p
            id="description-p"
            className="description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                !isOwner &&
                  typeof shopProfile?.translatedDescription === "string"
                  ? shopProfile?.translatedDescription
                  : shopProfile?.description,
                {
                  USE_PROFILES: { html: true },
                }
              ),
            }}
          ></p>
        </div>
      )}
      {!shopProfile?.description && isOwner && (
        <AddInformationButton
          text={t("shops:addShopDescription")}
          field={"description"}
          setShowModal={setShowEditModal}
        />
      )}
    </ShopDescriptionStyles>
  );
};
export default ShopDescription;
