import { useState } from "react";
import { CheckoutCouponStyles } from "./styles/CheckoutCouponStyles";
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore/lite";
const CheckoutCoupon = ({ t, setCoupon }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const applyCoupon = async (e) => {
    e.preventDefault();
    const getAffiliate = async (key, value) => {
      const usersRef = collection(getFirestore(), "affiliates");
      const q = query(usersRef, where(key, "==", value));
      const querySnapshot = await getDocs(q);
      let affiliates = [];
      querySnapshot.forEach(async (affiliate) => {
        affiliates?.push(affiliate?.data());
      });
      return affiliates?.length > 0 ? affiliates[0] : false;
    };
    getAffiliate("coupon", couponInput).then(affiliate => {
      if(affiliate) {
      setError(false);
      setCoupon(affiliate?.id);
    } else {
      setError(true);
    }
    })       
  };
  return (
    <CheckoutCouponStyles>
      <div className="input-wrapper">
        <form onSubmit={applyCoupon}>
          <input
            type="text"
            name="coupon"
            id="coupon"
            placeholder={t("insertCouponCode")}
            value={couponInput}
            autoComplete="off"
            onChange={(e) => {
              if (error) {
                setError(false);
              }
              setCouponInput(e?.target.value);
            }}
            disabled={loading}
            minLength={1}
            maxLength={25}
            required
          />
          <button className="normal-button">{t("apply")}</button>
        </form>
      </div>
      {error && (
        <p className="error-message">&#9940;{t("couponError")}</p>
      )}
    </CheckoutCouponStyles>
  );
};
export default CheckoutCoupon;
