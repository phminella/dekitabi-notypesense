import Image from "next/image";
const HeaderAppDownload = ({ store, isPwa, setShowAppPopUp }) => {
  return (
    <>
      {!isPwa() && (
        <li className={!store ? "no-app-available" : ""}>
          <button
            className="mobile-button header-icon"
            onClick={() => setShowAppPopUp(true)}
          >
            <Image
              src="/img/icon-mobile.svg"
              height={28}
              width={28}
              alt="dekitabi-logo-mobile"
              priority={true}
            />
          </button>
        </li>
      )}
    </>
  );
};
export default HeaderAppDownload;
