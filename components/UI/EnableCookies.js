import { useState } from "react";
import BasicModal from "./BasicModal";
import { EnableCookiesStyles } from "./styles/EnableCookiesStyles";
import Image from "next/image";
import { useTranslation } from "next-i18next";
const EnableCookies = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(true);
  return (
    <EnableCookiesStyles>
      <BasicModal showModal={showModal} setShowModal={setShowModal}>
        <Image
          height={100}
          width={100}
          src="/img/icon-cookie.svg"
          alt="cookie"
        ></Image>
        <h2>{t("enableCookies")}</h2>
        <h3>{t("enableCookiesTitle")}</h3>
        <ul>
          <li>
            <div className="circle"></div> {t("enableCookiesMsg1")}
          </li>
          <li>
            <div className="circle"></div> {t("enableCookiesMsg2")}
          </li>
          <li>
            <div className="circle"></div> {t("enableCookiesMsg3")}
          </li>
        </ul>
      </BasicModal>
    </EnableCookiesStyles>
  );
};
export default EnableCookies;
