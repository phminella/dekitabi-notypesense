import AddInformationButton from "../AddInformationButton";
import NoInformation from "../NoInformation";
import EditInformationButton from "../EditInformationButton";
import Price from "../../../UI/Price";
import { useSelector } from "react-redux";
const ActivityPrice = ({ activity, t, isOwner, setShowEditModal }) => {
  let currency = useSelector((state) => state?.app?.currency);
  if (isOwner || !activity?.withStripe) {
    currency = { code: "JPY", rate: 1, symbol: "¥" };
  }
  const categories = [
    "general",
    "adult",
    "universityStudent",
    "highSchoolStudent",
    "elementarySchoolStudent",
    "preSchooler",
    "infant",
    "senior",
    "disabledPerson",
  ];
  return (
    <>
      {/* Is owner and no information */}
      {isOwner && Object.keys(activity?.price).length < 1 && (
        <AddInformationButton
          setShowModal={setShowEditModal}
          text={t(`shops:addPrice`)}
          field={"price"}
        />
      )}
      {(Object.keys(activity?.price).length > 0 || !isOwner) && (
        <div className="shop-detail">
          {/* Is owner and information is added */}
          {isOwner && (
            <EditInformationButton
              setShowModal={setShowEditModal}
              field={"price"}
            />
          )}
          {/* Not owner */}
          <div className="label">{t("price")}</div>
          <div className="value">
            {/* Not owner and no information */}
            {Object.keys(activity?.price).length === 0 && (
              <NoInformation text={t(`shops:noPrice`)} t={t} />
            )}
            {/* Information is added && STRING */}
            {Object.keys(activity?.price).length > 0 && (
              <div>
                {categories?.map((category, i) => {
                  if (activity?.price[category]) {
                    return (
                      <div key={i} className="price">
                        {(Object.keys(activity?.price).length > 1 ||
                          (category !== "general" && category !== "adult")) && (
                          <p className="price-details">
                            {t(`shops:${category}`)}
                          </p>
                        )}{" "}
                        <p className="price-value">
                          <b
                            style={{ fontSize: "1.1em", color: "var(--pink)" }}
                          >
                            <Price
                              value={activity?.price[category]}
                              conversionType={"priceWithoutFee"}
                              currency={currency}
                            />
                          </b>
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ActivityPrice;
