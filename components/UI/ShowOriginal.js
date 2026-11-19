import { ShowOriginalStyles } from "./styles/ShowOriginalStyles";
const ShowOriginal = ({ t, showOriginal, setShowOriginal }) => {
  return (
    <ShowOriginalStyles className="show-original">
      {showOriginal ? t("translateMsg") : t("showOriginalMsg")}{" "}
      <button
        onClick={() => {
          setShowOriginal(!showOriginal);
        }}
      >
        {showOriginal ? t("translate") : t("showOriginal")}
      </button>
    </ShowOriginalStyles>
  );
};
export default ShowOriginal;
