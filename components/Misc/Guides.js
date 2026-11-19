import { GuidesListStyles } from "./styles/GuidesStyles";
import { GuidesStyles } from "../S/Guides/styles/GuidesStyles";
import { GuidesResponsiveStyles } from "../S/Guides/styles/responsive/GuidesResponsiveStyles";
import * as Scroll from "react-scroll";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NotFound from "../UI/NotFound";
import GuidesListSkeleton from "../S/Guides/GuidesListSkeleton";
import dynamic from "next/dynamic";
import GuideSkeleton from "../S/Guides/GuideSkeleton";
const Guide = dynamic(() => import("../S/Guides//Guide"), {
  loading: () => <GuideSkeleton />,
});
import dottie from "dottie";
import { useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { createLocalSearchClient } from "../../lib/search/client";
const GuidesList = () => {
  const clientRef = useRef();
  const { t } = useTranslation();
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const language = useSelector((state) => state.app.language, shallowEqual);
  const [searchLoading, setSearchLoading] = useState(true);
  const [guides, setGuides] = useState();
  const [resultDetails, setResultDetails] = useState({
    counter: 0,
    totalCounter: 0,
    perPage: 100,
  });
  const initSearch = useCallback(async (page, first) => {
    if (page) {
      const scroller = Scroll.scroller;
      scroller.scrollTo("results-details", {
        delay: 0,
        duration: 0,
        offset: -70,
      });
    }
    let searchParameters = {
      q: "",
      query_by: `firstname, lastname`,
      filter_by: `guide:="true" && verified:="true"`,
      per_page: resultDetails.perPage,
      page: page ? page : 1,
      exclude_fields: "availability, states",
      sort: Math.random() >= 0.5 ? "createdAt:asc" : "createdAt:desc",
    };
    if (typeof window === "undefined") return; // Safety check
    if (!clientRef.current) {
      clientRef.current = createLocalSearchClient();
    }
    clientRef.current
      .collections("users")
      .documents()
      .search(searchParameters)
      .then((data) => {
        let tempGuides = data.hits.filter(
          (guide) =>
            guide?.document?.photos?.length > 0 ||
            guide?.document?.avatar !== "/img/avatar.png"
        );
        setGuides(tempGuides.sort(() => Math.random() - 0.5).slice(0, 24));
        setResultDetails((prev) => ({
          ...prev,
          counter: data.found,
          totalCounter: data.out_of,
        }));
        setSearchLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setResultDetails((prev) => ({
          ...prev,
          counter: 0,
          totalCounter: 0,
        }));
        setGuides([]);
        setSearchLoading(false);
      });
  }, [resultDetails.perPage]);
  useEffect(() => {
    setSearchLoading(true);
    const timeOutId = setTimeout(() => {
      initSearch();
    }, 600);
    return () => clearTimeout(timeOutId);
  }, [initSearch]);
  return (
    <GuidesListStyles>
      <GuidesResponsiveStyles>
        <GuidesStyles>
          <div className="title-wrapper">
            <h1 className="guide-title">
              <Image src="/img/logo.png" height={45} width={141} alt="logo" />
              {t("guides")}
            </h1>
            <p className="subtitle">{t("guideListTitle")}</p>
            <ul>
              <li>
                <Image
                  className="verified"
                  src="/img/icon-verified.svg"
                  height={30}
                  width={30}
                  alt="verified"
                  title={t("verifiedId")}
                />
                {t("guideListMsg1")}
              </li>
              <li>
                <Image
                  className="licensed"
                  src="/img/icon-licensed.svg"
                  height={35}
                  width={35}
                  alt="licensed"
                  title={t("licensedGuide")}
                />
                {t("guideListMsg2")}
              </li>
              <li>
                <Image
                  className="driver"
                  src="/img/icon-driver.svg"
                  height={28}
                  width={28}
                  alt="driver"
                  title={t("canDrive")}
                />
                {t("guideListMsg3")}
              </li>
            </ul>
            <p className="subtitle">{t("guideListMsg4")}</p>
          </div>
          {!searchLoading && (
            <>
              {guides?.length === 0 && (
                <NotFound
                  message={`${t("guidesFound", { guidesFound: 0 })}.`}
                />
              )}
              <div className="guides-wrapper">
                {guides?.map((tour, i) => (
                  <Guide
                    language={language}
                    currency={currency}
                    guide={dottie.transform(tour.document)}
                    t={t}
                    key={i}
                    includeTransport={false}
                  />
                ))}
              </div>
            </>
          )}
          {searchLoading && <GuidesListSkeleton />}
        </GuidesStyles>
      </GuidesResponsiveStyles>
    </GuidesListStyles>
  );
};
export default GuidesList;
