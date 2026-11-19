import Image from "next/image";
const RequestButtonPlugin = ({ t }) => {
  return (
    <div className="plugin">
      <Image
        height={15}
        width={15}
        src="/img/icon-info2.svg"
        alt="dekitabi-tour-guide-availability-info"
      ></Image>
      {t("canSelect")}
    </div>
  );
};
export default RequestButtonPlugin;
