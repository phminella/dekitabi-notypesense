import Image from "next/image";
const EditAvailabilityButton = ({ setShowModal }) => {
  return (
    <button
      className="edit-availability-button normal-button"
      onClick={() => setShowModal("availability")}
    >
      <Image
        height={40}
        width={40}
        src="/img/icon-calendar.svg"
        alt="date"
        className="icons"
      ></Image>
    </button>
  );
};
export default EditAvailabilityButton;
