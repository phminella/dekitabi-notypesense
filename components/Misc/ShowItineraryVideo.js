import { ShowItineraryVideoStyles } from "./styles/ShowItineraryVideoStyles";
import { useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "../UI/Spinner";
const ItineraryVideo = dynamic(() => import("./ItineraryVideo"), {
  loading: () => <Spinner />,
});
import BasicModal from "../UI/BasicModal";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
const ShowItineraryVideo = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const { t } = useTranslation();
  const language = useSelector((state) => state.app.language);
  return (
    <ShowItineraryVideoStyles className="show-itinerary-video">
      <BasicModal showModal={showVideoModal} setShowModal={setShowVideoModal}>
        <ItineraryVideo t={t} language={language} />
      </BasicModal>
      <button
        className="show-video-button"
        onClick={() => {
          setShowVideoModal(true);
        }}
      >
        <Image
          height={15}
          width={15}
          src="/img/icon-info2.svg"
          alt="info"
        ></Image>
        {t("twoMinuteVideo")}
      </button>
    </ShowItineraryVideoStyles>
  );
};
export default ShowItineraryVideo;
