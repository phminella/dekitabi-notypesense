import AffiliateTabs from "./AffiliateTabs";
import { AffiliateHowItWorksStyles } from "./styles/AffiliateHowItWorksStyles";
const AffiliateHowItWorksGuides = () => {
  return (
    <AffiliateHowItWorksStyles>
      <AffiliateTabs />
      <div className="wrapper">
        <h2>Become an affiliate!</h2>
        <h3>How it works?</h3>
        <h4>Sign up</h4>
        <p>
          Create your account with us. Confirm your identity with Stripe (Our
          payment system if you live in Japan) or add your PayPal ID to your
          account, if you are not residing in Japan.
        </p>
        <p>
          More about Stripe:{" "}
          <a href="https://www.stripe.com" target="_blank" rel="noreferrer">
            Click here
          </a>
          <br />
          More about PayPal:{" "}
          <a href="https://www.paypal.com" target="_blank" rel="noreferrer">
            Click here
          </a>
        </p>
        <h4>Share</h4>
        <p>
          Guides registering using your coupon will pay only 5% service fee for
          their first 5 tours. And you will receive 5% of their guide fee
          transferred to your affiliate account. For example: If the guide fee
          is ¥10,000, our affiliate will receive ¥500 and the guide will have
          only 5% (¥500) service fee deducted from their fee, instead of our
          already low 10% service fee.
        </p>
        <h4>Get Paid</h4>
        <p className="title">
          <b>Stripe (Affiliates living in Japan)</b>
        </p>
        <p>
          Once your account is created, you will add your details to our payment
          system. Including your bank account.
          <br /> After a traveler you referenced has completed their tour, we
          will transfer the money to your dekitabi affiliate account balance.{" "}
          <br />
          And every Friday (Tokyo time), the balance will be transferred to your
          bank account automatically.
        </p>
        <p className="title paypal">
          <b>Paypal (Affiliates living outside Japan)</b>
        </p>
        <p>
          After signing up, you can add your PayPal ID to your account. After a
          traveler or guide you referenced completed their tour,{" "}
          <b>
            we will transfer the money to your dekitabi affiliate account
            balance in Japanese Yen
          </b>
          . <br />
          And every 1st and 15th of the month (Tokyo time),{" "}
          <b>if the balance is over ¥10,000</b>, the balance will be sent to
          your PayPal account, <b>using the currency rate of the day</b>. <br />
          If you would like to receive your money using a different method,
          please contact us directly using the email below.
        </p>
        <br />
        <p>
          If you have any questions, please contact us at{" "}
          <b style={{ color: "var(--blue)" }}>contact@dekitabi.com</b>
        </p>
      </div>
    </AffiliateHowItWorksStyles>
  );
};
export default AffiliateHowItWorksGuides;
