import { useEffect, useState } from "react";
import { ActivityBookConfirmationStyles } from "./styles/ActivityBookConfirmationStyles";
import { useRouter } from "next/router";
import Spinner from "../../../../UI/Spinner";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore/lite";
import Image from "next/image";
import ActivityDetails from "./ActivityDetails";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import ConfirmationSignUp from "./Signup/ConfirmationSignUp";
import ActivityBookPrice from "./ActivityBookPrice";
import ActivityCheckoutWrapper from "./ActivityCheckoutWrapper";
import ActivityStatusInfo from "../../ActivityStatusInfo";

const ActivityBookConfirmation = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const currency = useSelector((state) => state?.app?.currency);
  const user = useSelector((state) => state?.app?.user);
  const language = useSelector((state) => state?.app?.language);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState();
  const [signUpTab, setSignUpTab] = useState("email");
  const [notFound, setNotFound] = useState(false);
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Fetch booking details based on the query
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (router?.query?.booking) {
        try {
          const orderDoc = await getDoc(doc(getFirestore(), "orders", router?.query?.booking));

          if (orderDoc.exists()) {
            if (orderDoc.data()?.status) {
              router.push(`/book/completed?booking=${orderDoc.data()?.id}`).then(() => {
                router.reload();
              });
            } else {
              const activityDoc = await getDoc(doc(getFirestore(), "activities", orderDoc.data().activityId));
              setBooking({
                ...orderDoc.data(),
                activity: activityDoc.data(),
              });
              setLoading(false);
            }
          } else {
            setNotFound(true);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching booking details:", error);
          setLoading(false);
          setNotFound(true);
        }
      }
    };
    
    fetchBookingDetails();
  }, [router]);

  // Update currency in order if it doesn't match
  useEffect(() => {
    if (
      booking?.currency?.code &&
      currency?.code &&
      currency?.code !== booking?.currency?.code &&
      booking?.activity?.withStripe
    ) {
      const updateCurrency = async () => {
        try {
          await updateDoc(doc(getFirestore(), "orders", booking?.id), { currency });
          router.reload();
        } catch (error) {
          console.error("Error updating currency:", error);
        }
      };
      updateCurrency();
    }
  }, [currency, booking]);

  if (notFound) {
    return <ActivityStatusInfo t={t} msg={t("shops:noReservation")} order={{ id: router?.query?.booking }} />;
  }

  if (loading || !user || !booking?.date) {
    return <Spinner />;
  }

  return (
    <ActivityBookConfirmationStyles>
      <h1 className="checkout-title">{t("shops:completeReservation")}</h1>
      {user && !user?.uid && (
        <ConfirmationSignUp
          t={t}
          signUpTab={signUpTab}
          setSignUpTab={setSignUpTab}
          formInput={formInput}
          setFormInput={setFormInput}
        />
      )}
      {!booking?.activity?.withStripe && (
        <p className="activity-pay-onsite">
          <Image src="/img/icon-info2.svg" alt="payment on site" height={25} width={25} />
          {t("shops:payOnSiteMsg")}
        </p>
      )}
      <ActivityDetails t={t} booking={booking} language={language} />
      <ActivityBookPrice t={t} booking={booking} />
      <ActivityCheckoutWrapper
        t={t}
        booking={booking}
        signUpTab={signUpTab}
        user={user}
        formInput={formInput}
        language={language}
        router={router}
      />
    </ActivityBookConfirmationStyles>
  );
};

export default ActivityBookConfirmation;
