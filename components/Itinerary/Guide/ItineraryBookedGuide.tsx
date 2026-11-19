import Image from "next/image";
import Guide from "../../S/Guides/Guide";
import { ItineraryBookedGuideStyles } from "./styles/ItineraryBookedGuideStyles";
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect } from "react";
import { User } from "../../../types/user";

import { ItineraryGuide as IGuide } from "../../../types/itineraryGuide";

interface ItineraryBookedGuideProps {
  itineraryGuideData: IGuide | false;
  t: (key: string, options?: any) => string;
  updateItineraryHandler: (data: any) => Promise<any>;
  setLoading: (loading: boolean) => void;
  setShowGuideList: (show: boolean) => void;
  includeTransport: boolean;
  currency?: any;
  user?: User;
}

const ItineraryBookedGuide = ({
  itineraryGuideData,
  t,
  updateItineraryHandler,
  setLoading,
  setShowGuideList,
  includeTransport,
}: ItineraryBookedGuideProps) => {
  const currency = useSelector((state: RootState) => state.app.currency, shallowEqual);
  const language = useSelector((state: RootState) => state.app.language, shallowEqual);

  const changeGuide = () => {
    setLoading(true);
    updateItineraryHandler({
      guideFee: 0,
      guide: false,
      guideData: false,
      primaryLanguage: "",
    });
  };

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  if (!itineraryGuideData)
    return (
      <div style={{ textAlign: "center", padding: "15px" }}>
        <Image
          src="/img/icon-spinner.svg"
          height={50}
          width={50}
          alt="icon-spinner"
        />
      </div>
    );

  return (
    <ItineraryBookedGuideStyles>
      <div className="guide-wrapper">
        <Guide
          {...{
            guide: itineraryGuideData,
            t: t,
            currency: currency,
            language: language,
            setShowGuideList: setShowGuideList,
            includeTransport: includeTransport
          } as any}
        />
        <div className="guide-content">
          <ul className="guide-info">
            <li>
              <div className="circle" />
              {t("guideChatMsg")}
            </li>
            <li>
              <div className="circle" />
              {t("guideConfirmMsg")}*
            </li>
            <li>
              <span>*{t("guideChangesMsg")}</span>
            </li>
          </ul>
          <div className="guide-change">
            <button
              className="normal-button guide-change-button"
              onClick={() => changeGuide()}
            >
              <Image
                src="/img/icon-close.svg"
                alt="check"
                height={15}
                width={15}
              />{" "}
              {t("remove")}
            </button>
            <button
              className="normal-button guide-change-button"
              onClick={() => {
                setShowGuideList(false);
              }}
            >
              <Image
                src="/img/icon-check.svg"
                alt="check"
                height={15}
                width={15}
              />
              {t("choose")}
            </button>
          </div>
        </div>
      </div>
    </ItineraryBookedGuideStyles>
  );
};
export default React.memo(ItineraryBookedGuide);
