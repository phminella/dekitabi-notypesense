import dynamic from "next/dynamic";
const EditInformationButton = dynamic(
  () => import("../../Activities/EditInformationButton"),
  {
    ssr: false,
  }
);
const NoInformation = dynamic(() => import("../../Activities/NoInformation"), {
  ssr: false,
});
const AddInformationButton = dynamic(
  () => import("../../Activities/AddInformationButton"),
  {
    ssr: false,
  }
);
import Link from "next/link";
import Image from "next/image";
import { getLanguageFlagSrc } from "../../../../lib/languageFlags";
const ShopDetail = ({ isOwner, shopProfile, setShowEditModal, field, t }) => {
  const type = field === "serviceLanguages" ? "array" : "string";
  return (
    <>
      {/* Is owner and no information */}
      {isOwner &&
        ((!shopProfile[field] && type === "string") ||
          (shopProfile[field]?.length === 0 && type === "array")) && (
          <AddInformationButton
            setShowModal={setShowEditModal}
            text={t(
              `shops:add${
                String(field).charAt(0).toUpperCase() + String(field).slice(1)
              }`
            )}
            field={field}
          />
        )}
      {((shopProfile[field] && type === "string") ||
        (shopProfile[field]?.length > 0 && type === "array") ||
        !isOwner) && (
        <div className="shop-detail">
          {/* Is owner and information is added */}
          {isOwner && (
            <EditInformationButton
              setShowModal={setShowEditModal}
              field={field}
            />
          )}
          {/* Not owner */}
          <div className="label">{t(`shops:${field}`)}</div>
          <div className="value">
            {/* Not owner and no information */}
            {((!shopProfile[field] && type === "string") ||
              (shopProfile[field]?.length === 0 && type === "array")) && (
              <NoInformation
                text={t(
                  `shops:no${
                    String(field).charAt(0).toUpperCase() +
                    String(field).slice(1)
                  }`
                )}
                t={t}
              />
            )}
            {/* Information is added && STRING */}
            {((shopProfile[field] && type === "string") ||
              (shopProfile[field]?.length > 0 && type === "array")) && (
              <>
                {type === "string" && field === "website" && (
                  <Link
                    href={shopProfile[field]}
                    target="_blank"
                    prefetch={false}
                  >
                    {shopProfile[field]}
                  </Link>
                )}
                {field === "persons" && type === "string" && (
                  <p>
                    {shopProfile[field]?.from === 1 &&
                    shopProfile[field]?.to === 1
                      ? "1"
                      : t("shops:activityPeople", {
                          from: shopProfile[field]?.from,
                          to: shopProfile[field]?.to,
                        })}
                  </p>
                )}
                {type === "string" &&
                  field !== "website" &&
                  (field !== "persons" || shopProfile[field] <= 1) && (
                    <p>
                      {shopProfile[
                        `translated${
                          String(field).charAt(0).toUpperCase() +
                          String(field).slice(1)
                        }`
                      ] &&
                      typeof shopProfile[
                        `translated${
                          String(field).charAt(0).toUpperCase() +
                          String(field).slice(1)
                        }`
                      ] === "string" &&
                      !isOwner
                        ? `${shopProfile[
                            `translated${
                              String(field).charAt(0).toUpperCase() +
                              String(field).slice(1)
                            }`
                          ]?.replace(
                            /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,
                            `<span>xxxxxxxxxxxxxxx</span>`
                          )}${field === "duration" ? t("min") : ""}`
                        : `${
                            field === "duration"
                              ? `${shopProfile[field]}${t("min")}`
                              : field === "persons"
                              ? shopProfile[field] > 1
                                ? t("shops:activityPeople", {
                                    amount: shopProfile[field],
                                  })
                                : 1
                              : shopProfile[field]
                          }`}{" "}
                      {shopProfile?._geoloc?.length === 2 &&
                        field === "address" && (
                          <a
                            href={`https://www.google.com/maps/place/${shopProfile?._geoloc[0]} + ${shopProfile?._geoloc[1]}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t("openWith")}
                          </a>
                        )}{" "}
                    </p>
                  )}
                {type === "array" && field === "serviceLanguages" && (
                  <ul>
                    {shopProfile[field]?.map((lang, i) => (
                      <li key={i}>
                        <Image
                          src={getLanguageFlagSrc(lang)}
                          height={12}
                          width={17}
                          alt={`dekitabi-tour-guide-language-${lang
                            ?.split(" ")
                            .join("-")}`}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        {lang}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ShopDetail;
