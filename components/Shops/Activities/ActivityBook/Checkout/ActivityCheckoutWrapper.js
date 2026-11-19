import dynamic from "next/dynamic";
const CheckoutStripe = dynamic(() => import("./CheckoutStripe"));
const CheckoutNoPaymentButton = dynamic(() => import("./CheckoutNoPaymentButton"));
const ActivityCheckoutWrapper = ({
  booking,
  t,
  signUpTab,
  user,
  formInput,
  router,
  language,
}) => {
  return (
    <>
      {booking?.activity?.withStripe ? (
        <CheckoutStripe
          language={language}
          t={t}
          signUpTab={signUpTab}
          booking={booking}
          user={user}
          formInput={formInput}
        />
      ) : (
        <CheckoutNoPaymentButton
          t={t}
          booking={booking}
          signUpTab={signUpTab}
          user={user}
          formInput={formInput}
          router={router}
        />
      )}
    </>
  );
};
export default ActivityCheckoutWrapper;
