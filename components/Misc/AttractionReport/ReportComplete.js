import { ReportCompleteStyles } from "./styles/ReportCompleteStyles";
import Image from "next/image";
const ReportComplete = ({ user, reportComplete, t }) => {
  return (
    <ReportCompleteStyles className={reportComplete ? "report-complete" : ""}>
      <div className="report-complete-wrapper">
        <Image src="/img/icon-report.svg" alt="report" height={70} width={70} />
        <h1>{t("reportSent")}!</h1>
        <p>
          <b>
            {t("thanksForReport", {
              guideName: user?.lastname ? user?.lastname : user?.username,
            })}
          </b>
          <br />
          {t("sorryNeedReport")} <br />
          {t("thankYou")}!
        </p>
      </div>
    </ReportCompleteStyles>
  );
};
export default ReportComplete;
