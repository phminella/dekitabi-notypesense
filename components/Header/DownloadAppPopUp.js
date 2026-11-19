import { DownloadAppPopUpStyles } from "./styles/DownloadAppPopUpStyles";
import BasicModal from "../UI/BasicModal";
import Image from "next/image";
import OrderBackground from "../OrderComplete/OrderBackground";
const DownloadAppPopUp = ({ showAppPopUp, setShowAppPopUp, t, store }) => {
  return (
    <DownloadAppPopUpStyles>
      <BasicModal showModal={showAppPopUp} setShowModal={setShowAppPopUp}>
        <div className="background-wrapper">
          <OrderBackground />
          <div className="apps-bg">
            <div className="apps">
              <a
                href="https://play.google.com/store/apps/details?id=com.dekitabi"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/img/icon-googleplay.svg"
                  alt="dekitabi-app-google-play"
                  width={129}
                  height={38}
                />
              </a>
              <a
                href="https://appgallery.huawei.com/#/app/C110443229"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/img/icon-huawei.svg"
                  alt="dekitabi-app-huawei"
                  width={170}
                  height={39}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="title">
            <div className="app-icon">
              <Image
                src="/img/logo-short.png"
                height={35}
                width={34}
                alt="dekitabi-logo-mobile"
              />
            </div>
            <h2>{t("openWithApp")}</h2>
          </div>
          <div className="message">
            <h3>{t("installApp")}</h3>
            <Image
              height={150}
              width={150}
              alt="dekitabi-app-qr-code"
              src={"/img/qr-code.svg"}
              className="qr-code"
            />
            <div className="apps">
              {store === "playStore" && (
                <a
                  href="https://play.google.com/store/apps/details?id=com.dekitabi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-googleplay.svg"
                    alt="dekitabi-app-google-play"
                    width={135}
                    height={38}
                  />
                </a>
              )}
              {store === "huaweiGallery" && (
                <a
                  href="https://appgallery.huawei.com/#/app/C110443229"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-huawei.svg"
                    alt="dekitabi-app-huawei"
                    width={137}
                    height={41}
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </BasicModal>
    </DownloadAppPopUpStyles>
  );
};
export default DownloadAppPopUp;
