import BasicModal from "../../UI/BasicModal";
import { AttractionReportProblemStyles } from "./styles/AttractionReportProblemStyles";
import { useSelector, shallowEqual } from "react-redux";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReportComplete = dynamic(() => import("./ReportComplete"), {
  ssr: false,
});
const AttractionReportProblem = ({
  attractionName,
  showModal,
  setShowModal,
  t,
}) => {
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const user = useSelector((state) => state.app.user, shallowEqual);
  const [reportDetails, setReportDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportComplete, setReportComplete] = useState(false);
  const sendReport = (e) => {
    e.preventDefault();
    setLoading(true);
    sendEmail({
      to: "contact@dekitabi.com",
      sender: "noreply@dekitabi.com",
      subject: `dekitabi | ${attractionName} seems to have some issue`,
      body: `Attraction name: ${attractionName}</br>Guide id: ${user?.uid}</br>Guide firstname: ${user?.firstname}</br>Guide lastname: ${user?.lastname}</br>Guide contact: ${user?.email}Guide contact: ${user?.email}</br>Guide message: ${reportDetails}`,
    })
      .then(() => {
        setReportDetails("");
        setLoading(false);
        setReportComplete(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <AttractionReportProblemStyles>
      <BasicModal showModal={showModal} setShowModal={setShowModal}>
        <ReportComplete t={t} user={user} reportComplete={reportComplete} />
        <div className="modal-title">
          <h2>{t("reportProblemWith", { attractionName })}</h2>
          <p>{t("reportProblemMsg")}</p>
        </div>
        <div className="modal-body">
          <form>
            <textarea
              value={reportDetails}
              placeholder={`${t("letUsKnowDetails")}`}
              onChange={(e) => setReportDetails(e.target.value)}
              maxLength={1000}
              autoFocus
            ></textarea>
            <p className="reason-counter">
              {t("charRemaining")}: {500 - reportDetails.length}
            </p>
            <div className="report-button">
              {loading ? (
                <Image
                  src="/img/icon-spinner-white.svg"
                  alt="spinner"
                  height={40}
                  width={40}
                />
              ) : (
                <button className="normal-button" onClick={sendReport}>
                  {t("send")}
                </button>
              )}
            </div>
          </form>
        </div>
      </BasicModal>
    </AttractionReportProblemStyles>
  );
};
export default AttractionReportProblem;
