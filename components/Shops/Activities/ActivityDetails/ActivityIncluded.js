import AddInformationButton from "../AddInformationButton";
import NoInformation from "../NoInformation";
import EditInformationButton from "../EditInformationButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ActivityIncludedStyles } from "./styles/ActivityIncludedStyles";
const ActivityIncluded = ({ activity, t, isOwner, setShowEditModal }) => {
  const language = useSelector((state) => state?.app?.language);
  const [included, setIncluded] = useState();
  useEffect(() => {
    let includedArray = [];
    let notIncludedArray = [];
    if (activity?.translatedIncluded) {
      Object.keys(activity?.translatedIncluded).forEach((key, i) => {
        includedArray.push(activity?.translatedIncluded[key][language?.code]);
      });
    }
    if (activity?.translatedNotIncluded) {
      Object.keys(activity?.translatedNotIncluded).forEach((key, i) => {
        notIncludedArray.push(
          activity?.translatedNotIncluded[key][language?.code]
        );
      });
    }
    let tempTotal = {
      included: includedArray?.length > 0 ? includedArray : activity?.included,
      notIncluded:
        notIncludedArray?.length > 0 ? notIncludedArray : activity?.notIncluded,
    };
    setIncluded(tempTotal);
  }, [
    activity?.included,
    activity?.notIncluded,
    activity?.translatedIncluded,
    activity?.translatedNotIncluded,
    language,
  ]);
  return (
    <ActivityIncludedStyles>
      {/* Is owner and no information */}
      {isOwner &&
        included?.included?.length < 1 &&
        included?.notIncluded?.length < 1 && (
          <AddInformationButton
            setShowModal={setShowEditModal}
            text={t(`shops:addIncluded`)}
            field={"included"}
          />
        )}
      {(included?.included.length > 0 ||
        included?.notIncluded.length > 0 ||
        !isOwner) && (
        <div className="shop-detail">
          {/* Is owner and information is added */}
          {isOwner && (
            <EditInformationButton
              setShowModal={setShowEditModal}
              field={"included"}
            />
          )}
          {/* Not owner */}
          <div className="label">{t("shops:included")}</div>
          <div className="value">
            {/* Not owner and no information */}
            {included?.included.length === 0 &&
              included?.notIncluded.length === 0 && (
                <NoInformation text={t(`shops:included`)} t={t} />
              )}
            {/* Information is added && STRING */}
            {included?.included.length > 0 && (
              <>
                {included?.included?.map((included, i) => {
                  return (
                    <div key={i} className="included">
                      <Image
                        height={15}
                        width={15}
                        src="/img/icon-check.svg"
                        alt="included"
                        className="included-icon"
                      ></Image>
                      {String(included).charAt(0).toUpperCase() +
                        String(included).slice(1)}
                    </div>
                  );
                })}
              </>
            )}
            {included?.notIncluded.length > 0 && (
              <>
                {included?.notIncluded?.map((notIncluded, i) => {
                  return (
                    <div key={i} className="included">
                      <Image
                        height={15}
                        width={15}
                        src="/img/icon-close.svg"
                        alt="not-included"
                        className="not-included-icon"
                      ></Image>
                      {String(notIncluded).charAt(0).toUpperCase() +
                        String(notIncluded).slice(1)}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </ActivityIncludedStyles>
  );
};
export default ActivityIncluded;
