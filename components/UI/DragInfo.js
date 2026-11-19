import { DragInfoStyles } from "./styles/DragInfoStyles";
import Image from "next/image";
import { useTranslation } from "next-i18next";
const DragInfo = ({ object = "itineraries" }) => {
  const { t } = useTranslation();
  return (
    <DragInfoStyles>
      <div className="drag-msg">
        <Image
          height={20}
          width={20}
          src={"/img/icon-drag.svg"}
          alt="drag"
        ></Image>
        <p>{t("drag", { object: t(object) })}</p>
      </div>
    </DragInfoStyles>
  );
};
export default DragInfo;
