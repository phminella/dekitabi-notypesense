import { useEffect, useState } from "react";
import { ActivityBookConfirmationStyles } from "../Checkout/styles/ActivityBookConfirmationStyles";
import Spinner from "../../../../UI/Spinner";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore/lite";
import Image from "next/image";
import ActivityDetails from "../Checkout/ActivityDetails";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import ActivityBookPrice from "../Checkout/ActivityBookPrice";
import { ActivityBookCompletedStyles } from "./styles/ActivityBookCompletedStyles";
import { useRouter } from "next/router";
import Link from "next/link";
import ActivityStatusInfo from "../../ActivityStatusInfo";
import { getFunctions, httpsCallable } from "firebase/functions";
import { bookingCompleted } from "../../../../../lib/fbpixel";
const ActivityBookCompleted = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useSelector((state) => state?.app?.user);
  const language = useSelector((state) => state?.app?.language);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState();
  const [notFound, setNotFound] = useState(false);
  let functions;
  let retrieveStripePaymentIntent;
  let retrieveStripePaymentMethod;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    retrieveStripePaymentIntent = httpsCallable(
      functions,
      "retrieveStripePaymentIntent"
    );
    retrieveStripePaymentMethod = httpsCallable(
      functions,
      "retrieveStripePaymentMethod"
    );
  } catch (err) {
    console.log(err);
  }
  const completeBooking = async (tempBooking) => {
    if (!tempBooking?.paymentMethod) {
      const paymentIntent = await retrieveStripePaymentIntent(
        router.query.payment_intent
      );
      const paymentMethod = await retrieveStripePaymentMethod(
        paymentIntent.data?.payment_method
      );
      updateDoc(doc(getFirestore(), "orders", router?.query?.booking), {
        ...(paymentIntent?.data?.charges?.data[0]?.receipt_url && {
          receipt: paymentIntent.data?.charges.data[0].receipt_url,
        }),
        paymentIntentId: router.query.payment_intent,
        paymentMethod: {
          card: {
            brand: paymentMethod?.data?.card?.brand,
            country: paymentMethod?.data?.card?.country,
            exp_month: paymentMethod?.data?.card?.exp_month,
            exp_year: paymentMethod?.data?.card?.exp_year,
            last4: paymentMethod?.data?.card?.last4,
          },
          id: paymentMethod?.data?.id,
        },
      });
      setBooking(tempBooking);
      setLoading(false);
    } else {
      setBooking(tempBooking);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (router?.query?.booking) {
      getDoc(doc(getFirestore(), "orders", router?.query?.booking)).then(
        (orderDoc) => {
          if (orderDoc.exists()) {
            bookingCompleted(orderDoc?.data()?.total);
            getDoc(
              doc(getFirestore(), "activities", orderDoc?.data()?.activityId)
            )
              .then((activityDoc) => {
                if (activityDoc?.data()?.withAvailability) {
                  if (
                    activityDoc?.data()?.availability[orderDoc?.data()?.date]
                  ) {
                    console.log(
                      activityDoc?.data()?.withAvailability,
                      activityDoc?.data()?.availability[orderDoc?.data()?.date],
                      activityDoc?.data()?.availability[orderDoc?.data()?.date][
                        orderDoc?.data()?.time
                      ]
                    );
                  }
                }
                if (router?.query?.payment_intent) {
                  completeBooking({
                    ...orderDoc?.data(),
                    activity: activityDoc?.data(),
                  });
                } else {
                  setBooking({
                    ...orderDoc?.data(),
                    activity: activityDoc?.data(),
                  });
                  setLoading(false);
                }
              })
              .catch((err) => {
                setLoading(false);
              });
          } else {
            setLoading(false);
            setNotFound(true);
          }
        }
      );
    }
  }, [router]);
  if (notFound)
    return (
      <ActivityStatusInfo
        t={t}
        msg={t("shops:noReservation")}
        order={{ id: router?.query?.booking }}
      />
    );
  if (loading || !user || !booking?.id) return <Spinner />;
  return (
    <ActivityBookCompletedStyles>
      <ActivityBookConfirmationStyles>
        <h1 className="checkout-title">
          <Image
            height={95}
            width={95}
            src="/img/icon-check.svg"
            alt="completed"
            className="check-icon"
            priority
          ></Image>
          <br />
          {t("shops:bookingCompleted")}
        </h1>
        <p className="order-id">
          {t("orderId")}: {booking?.id}
        </p>
        <ul className="completed-list">
          {booking?.status === "confirmed" && !booking?.payment && (
            <li>
              <div className="circle"></div>
              {t(`shops:payOnSiteMsg`)}
            </li>
          )}
          {booking?.status === "pending" && booking?.payment === "pending" && (
            <li>
              <div className="circle"></div> {t("shops:completedWithStripe")}
            </li>
          )}
          {booking?.status === "pending" && !booking?.payment && (
            <li>
              <div className="circle"></div>
              {t("shops:completedWithoutStripe")}
            </li>
          )}
          {booking?.status === "pending" && (
            <li>
              <div className="circle"></div>
              {t("shops:completedWithoutAvailability")}
            </li>
          )}
          {booking?.status === "confirmed" && (
            <li>
              <div className="circle"></div>
              {t("shops:completedWithStripe2")}
            </li>
          )}
        </ul>
        <Link href={`/`} className="link" prefetch={false}>
          {t("goHomePage")}
        </Link>
        <ActivityDetails t={t} booking={booking} language={language} />
        <ActivityBookPrice t={t} booking={booking} />
      </ActivityBookConfirmationStyles>
    </ActivityBookCompletedStyles>
  );
};
export default ActivityBookCompleted;
