import { CheckoutNoPaymentButtonStyles } from "./styles/CheckoutNoPaymentButtonStyles";
import { useState } from "react";
import useUser from "../../../../../lib/useUser";
import axios from "axios";
import Image from "next/image";
const CheckoutNoPaymentButton = ({
  t,
  booking,
  signUpTab,
  user,
  formInput,
  router,
}) => {
  const { signUp, federatedSignIn, error: signUpError } = useUser();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const complete = async () => {
    setLoading(true);
    console.log({
      ...booking,
      customerId: user?.uid,
      shopId: booking?.activity?.shopId,
    });
    const completeOrder = (user) => {
      const completedBooking = axios({
        method: "post",
        url: `https://asia-northeast1-dekitabi.cloudfunctions.net/bookActivity`,
        data: {
          booking: {
            ...booking,
            customerId: user?.uid,
            shopId: booking?.activity?.shopId,
          },
        },
      })
        .then(async (data) => {
          router.push(`/book/completed?booking=${booking?.id}`).then(() => {
            router?.reload();
          });
        })
        .catch((err) => {
          console.log(err);
          setError("errorMsg");
          setLoading(false);
        });
    };
    if (user?.uid) {
      completeOrder(user);
    } else {
      if (signUpTab === "email") {
        if (formInput.password !== formInput.confirmPassword) {
          setError("passwordDoesNotMatch");
          setLoading(false);
        } else {
          signUp(false, formInput?.email, formInput?.password)
            .then((data) => {
              if (data) {
                console.log(data);
                completeOrder(data);
              } else {
                setTimeout(() => {
                  setError(signUpError ? signUpError : "errorMsg");
                  setLoading(false);
                }, 1000);
              }
            })
            .catch((err) => {
              setTimeout(() => {
                setError(err);
                setLoading(false);
              }, 1000);
            });
        }
      } else {
        federatedSignIn("Google")
          .then(async (data) => {
            if (data) {
              completeOrder(data);
            } else {
              setError("errorMsg");
              setLoading(false);
            }
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
      }
    }
  };
  console.log("LOADING", loading);
  return (
    <CheckoutNoPaymentButtonStyles>
      {error && <div className="error-message">&#9940;{t(error)}</div>}
      <button
        type="button"
        disabled={loading}
        className="normal-button"
        onClick={() => {
          complete();
        }}
      >
        {loading ? (
          <Image
            src="/img/icon-spinner-white.svg"
            alt="spinner"
            height={30}
            width={30}
          />
        ) : (
          t("shops:completeReservation")
        )}
      </button>
    </CheckoutNoPaymentButtonStyles>
  );
};
export default CheckoutNoPaymentButton;
