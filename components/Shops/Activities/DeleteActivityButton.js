import Image from "next/legacy/image";
const DeleteActivityButton = ({ setShowDelete, t, text }) => {
  return (
    <button
      className="delete-activity-button"
      onClick={() => setShowDelete(true)}
    >
      <Image src="/img/icon-delete2.svg" height={15} width={15} alt="delete" />
      {text && <>{t(`shops:${text}`)}</>}
    </button>
  );
};
export default DeleteActivityButton;
