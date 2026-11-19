import { ProfileTutorialStyles } from "./styles/ProfileTutorialStyles";
import Image from "next/legacy/image";
import Link from "next/link";
import { getFirestore, doc, updateDoc, deleteField } from "firebase/firestore/lite";
import DOMPurify from "isomorphic-dompurify";
const ProfileTutorial = ({ profile, setProfile, t }) => {
  const giveFeedback = (feedback) => {
    const userRef = doc(getFirestore(), "users", profile?.uid);
    updateDoc(userRef, {
      newUser: deleteField(),
    });
    setProfile({ ...profile, newUser: false });
  };
  return (
    <ProfileTutorialStyles>
      <div className="tutorial-bg"></div>
      <div className="tutorial-wrapper">
        <div className="tutorial-steps">
          <h2 className="title-dekitabi">
            <Image
              src="/img/icon-fireworks.svg"
              height={40}
              width={40}
              alt="welcome-to-dekitabi"
            />
            {t("welcome")}
          </h2>
          <h3 className="title-dekitabi">{t("tutorialTitle")}:</h3>
          {/* Step 1 */}
          <div className="steps-wrapper">
            <div className="step-1">
              <div className="step-1-title step-title">
                <h2>{t("step1")}:</h2>
                <button className="edit-profile-button" disabled>
                  <Image
                    src={`/img/icon-edit2.svg`}
                    height={20}
                    width={20}
                    alt="edit-dekitabi-profile-tutorial"
                  />
                  {t("editProfile")}
                </button>
              </div>
              <div
                className="step-1-message"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(`${t("step1Message")}`, {
                    USE_PROFILES: { html: true },
                  }),
                }}
              ></div>
            </div>
            {/* Step 2 */}
            <div className="step-2">
              <div className="step-2-title step-title">
                <h2>{t("step2")}:</h2>
                <Image
                  height={30}
                  width={30}
                  src="/img/icon-availability.svg"
                  alt="edit-dekitabi-availability-tutorial"
                />
              </div>
              <div className="step-2-message">{t("step2Message")}</div>
            </div>
            {/* Step 3 */}
            <div className="step-3">
              <div className="step-3-title step-title">
                <h2>{t("step3")}:</h2>
                <Image
                  src="/img/icon-itinerary2.svg"
                  height={35}
                  width={35}
                  alt="create-itinerary-tutorial"
                  className="audio-icon"
                />
              </div>
              <div className="step-3-message">{t("step3Message")}</div>
            </div>
            <div className="tutorial-buttons">
              <button onClick={() => giveFeedback(false)}>
                {t("tutorialFeedbackButton")}
              </button>
              <button onClick={() => giveFeedback(true)}>
                <Image
                  src="/img/icon-favorite.svg"
                  height={20}
                  width={20}
                  alt="tutorial-like"
                />
                {t("tutorialFeedbackButton2")}
              </button>
            </div>
            <div className="tutorial-links">
              <Link
                href="/guides-general-information"
                prefetch={false}
                target="_blank"
                rel="noreferrer"
              >
                {t("becomeGuide")}
              </Link>{" "}
              |{" "}
              <Link
                href="/payments-and-payouts-policy"
                prefetch={false}
                target="_blank"
                rel="noreferrer"
              >
                {t("paymentsPayoutPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProfileTutorialStyles>
  );
};
export default ProfileTutorial;
