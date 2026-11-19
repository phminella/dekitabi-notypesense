import { CareersStyles } from "./styles/CareersStyles";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import Image from "next/image";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore/lite";
import { getFunctions, httpsCallable } from "firebase/functions";
import useForm from "../../lib/useForm";
import TextField from "@mui/material/TextField";
import OrderBackground from "../OrderComplete/OrderBackground";
const Careers = () => {
  const { validEmail } = useForm();
  const { t } = useTranslation();
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const sendCareerEmail = (e) => {
    e.preventDefault();
    if (validEmail(email) && email.length > 6) {
      setLoading(true);
      const jobsRef = doc(getFirestore(), "misc", "jobs");
      updateDoc(jobsRef, {
        emails: arrayUnion(email),
      })
        .then(() => {
          sendEmail({
            to: email,
            sender: "noreply@dekitabi.com",
            subject: `dekitabi | ${t("jobNotificationComplete")}`,
            body: `<div style="background:#ededed; font-family: Verdana, Geneva, Tahoma, sans-serif;">
            <h1 style="text-align:center; padding:40px 0 20px 0; color:#fc0165">dekitabi</h1>
            <section style="background:white;max-width:600px;margin: 20px auto;border-top:4px solid #fc0165;border-radius:5px;padding:20px; text-align:center">
             <h1 style="color: #fc0165; margin: 0">
            ${t("registrationComplete")}</h1>
              <h2>${t("hello")},</h2>
              <p style="margin: 0 0 20px 0; line-height:20px; text-align:left; padding:20px; border-radius:10px; background:#ededed">
              <b>${t("thanksUsingDekitabi")}</b> ${t(
              "jobNotificationCompleteMsg"
            )}</p>
            </section> 
            <section
            style="
              max-width: 600px;
              margin: 0 auto;
              position: relative;
              padding: 0 10px;
            "
          >
            <div>
              <img src="https://www.dekitabi.com/img/logo.png" height="30" width="90" />
              <ul style="margin: 10px 0 0 0; list-style: none; float: right; display: block">
                <li style="display: inline; margin-left:5px">
                  <a
                    href="https://www.instagram.com/dekitabi"
                    target="_blank"
                    rel="noreferrer"
                    style="text-decoration:none"
                  >
                    <img
                      src="https://www.dekitabi.com/img/icon-instagram.png"
                      alt="instagram"
                      height="20"
                      width="20"
                    />
                  </a>
                </li>
                <li style="display: inline; margin-left:5px">
                  <a
                    href="https://www.facebook.com/dekitabi"
                    target="_blank"
                    rel="noreferrer"
                    style="text-decoration:none"
                  >
                    <img
                      src="https://www.dekitabi.com/img/icon-facebook.png"
                      alt="facebook"
                      height="20"
                      width="20"
                    />
                  </a>
                </li>
                <li style="display: inline; margin-left:5px">
                  <a
                    href="https://www.threads.net/@dekitabi"
                    target="_blank"
                    rel="noreferrer"
                    style="text-decoration:none"
                  >
                    <img
                      src="https://www.dekitabi.com/img/icon-threads.png"
                      alt="threads"
                      height="20"
                      width="20"
                    />
                  </a>
                </li>
                <li style="display: inline; margin-left:5px">
                  <a
                    href="https://www.twitter.com/dekitabi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://www.dekitabi.com/img/icon-twitter.png"
                      alt="twitter"
                      height="20"
                      width="20"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <p style="font-size: 0.8em">
              〒160-0023<br />
              東京都新宿区西新宿三丁目3番13号　西新宿水間ビル6階.
            </p>
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=com.dekitabi"
                target="_blank"
                rel="noreferrer"
                style="margin-right: 5px; text-decoration:none"
              >
                <img
                  src="https://www.dekitabi.com/img/icon-googleplay.png"
                  alt="open"
                  width="100"
                  height="29"
                />
              </a>
              <a
                href="https://appgallery.huawei.com/#/app/C110443229"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.dekitabi.com/img/icon-huawei.png"
                  alt="open"
                  width="100"
                  height="29"
                />
              </a>
            </div>
          </section>
              <p
                style="
                  margin: 25px 0 0 0;
                  color: #adadad;
                  padding: 20px 0;
                  border-top: 1px solid #adadad;
                  font-size: 10px;
                  background:white;
                  text-align:center;
                "
              >
              ${t("doNotReplyEmail")}
              </p>
           </div>`,
          })
            .then(() => {
              setLoading(false);
              setSent(true);
              setEmail("");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <CareersStyles>
      <OrderBackground />
      <div className="careers-wrapper">
        <div className="careers-bg"></div>
        <h1>{t("currentlyNotHiring")}</h1>
        <p className="register">{t("registerForNotification")}</p>
        <p>
          {t("noSpam1")} <b> {t("noSpam2")}</b>
        </p>
        <form onSubmit={(e) => sendCareerEmail(e)}>
          <div className="mui-input-wrapper">
            <TextField
              name="email"
              type="email"
              label={t("email")}
              placeholder={t("email")}
              variant="filled"
              color="secondary"
              className="email"
              error={!validEmail(email)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={80}
              minLength={6}
              required
            />
            {!validEmail(email) && (
              <p className="error-message"> &#9940;{t("emailInvalid")} </p>
            )}
          </div>
          {loading ? (
            <div className="normal-button">
              <Image
                height={30}
                width={30}
                src="/img/icon-spinner.svg"
                alt="spinner"
              ></Image>
            </div>
          ) : (
            <button className="normal-button" type="submit">
              {t("send")}
            </button>
          )}
          {sent && (
            <p className="sent">
              <svg
                aria-hidden="true"
                className="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--check-svg Icon-color-svg Icon-color--green500-svg"
                height="12"
                width="12"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>sent</title>
                <path
                  d="M5.297 13.213.293 8.255c-.39-.394-.39-1.033 0-1.426s1.024-.394 1.414 0l4.294 4.224 8.288-8.258c.39-.393 1.024-.393 1.414 0s.39 1.033 0 1.426L6.7 13.208a.994.994 0 0 1-1.402.005z"
                  fillRule="evenodd"
                ></path>
              </svg>{" "}
              {t("jobRegistrationComplete")}
            </p>
          )}
        </form>
      </div>
    </CareersStyles>
  );
};
export default Careers;
