import { getFunctions, httpsCallable } from "firebase/functions";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import isPwa from "../../lib/isPwa";
import { useTranslation } from "next-i18next";
const StripeLink = ({ children, onClick, buttonText }) => {
  let functions;
  let createStripeExpressLink;
  let createStripeLink;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    createStripeLink = httpsCallable(functions, "createStripeLink");
    createStripeExpressLink = httpsCallable(
      functions,
      "createStripeExpressLink"
    );
  } catch (err) {
    console.log(err);
  }
  const { t } = useTranslation();
  const user = useSelector((state) => state.app.user);
  const [link, setLink] = useState("");
  const getAccountLink = async () => {
    let stripeLink;
    if (user?.stripeFirstTime) {
      stripeLink = await createStripeLink({
        id: user?.stripeAccountId,
      });
    } else {
      stripeLink = await createStripeExpressLink({
        id: user?.stripeAccountId,
      });
    }
    console.log(stripeLink);
    setLink(stripeLink.data.url);
  };
  useEffect(() => {
    if (user?.stripeAccountId) {
      getAccountLink();
    }
  }, [user?.stripeAccountId]);
  if (!link && buttonText && buttonText !== "View all")
    return <a style={{ color: "lightgray" }}>{t("loading")}...</a>;
  if (!link && (!buttonText || buttonText === "View all")) return <></>;
  return (
    <a
      onClick={onClick}
      href={link}
      target={isPwa() || !user?.stripeFirstTime ? "_blank" : "_self"}
      rel="noreferrer"
    >
      {children ? children : buttonText}
    </a>
  );
};
export default StripeLink;
