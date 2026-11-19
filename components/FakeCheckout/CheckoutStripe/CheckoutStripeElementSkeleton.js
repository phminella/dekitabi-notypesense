import { CheckoutStripeElementSkeletonStyles } from "./styles/CheckoutStripeElementSkeletonStyles";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
const CheckoutStripeElementSkeleton = ({ user, withSignUp, t }) => {
  return (
    <CheckoutStripeElementSkeletonStyles>
      <h2>
        <Image
          height={25}
          width={25}
          src="/img/icon-payment.svg"
          alt="payment"
        />{" "}
        3. {t("payment")}
      </h2>
      {!withSignUp && !user?.uid && (
        <>
          {" "}
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={10}
            style={{ margin: "5px 0" }}
          />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={70}
            style={{ marginBottom: "10px" }}
          />
        </>
      )}
      {/* <div className="payment-method">
        <Skeleton variant="rounded" width={"100%"} height={70} />
        <Skeleton variant="rounded" width={"100%"} height={70} />
        <Skeleton variant="rounded" width={"100%"} height={70} />
      </div> */}
      <Skeleton variant="rounded" width={"100%"} height={70} />
      <div className="cc-details">
        <Skeleton variant="rounded" width={"100%"} height={70} />
        <Skeleton variant="rounded" width={"100%"} height={70} />
      </div>
      <Skeleton variant="rounded" width={"100%"} height={70} />
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={10}
        style={{ marginTop: "5px" }}
      />
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={10}
        style={{ marginTop: "5px" }}
      />
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={60}
        style={{ marginTop: "10px" }}
      />
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={10}
        style={{ marginTop: "10px" }}
      />
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={10}
        style={{ marginTop: "5px" }}
      />
    </CheckoutStripeElementSkeletonStyles>
  );
};
export default CheckoutStripeElementSkeleton;
