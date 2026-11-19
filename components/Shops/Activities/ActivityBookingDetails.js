import { ShopDetailsStyles } from "../ShopProfile/Details/styles/ShopDetailsStyles";
const ActivityBookingDetails = ({ activity, t, isOwner, setShowEditModal }) => {
  return (
    <ShopDetailsStyles>
      <li className="shop-detail">
        <div className="label">{t(`shops:howToUseVoucher`)}</div>
        <div className="value">{t(`shops:howToUseVoucherMsg`)}</div>
      </li>
      <li className="shop-detail">
        <div className="label">{t(`shops:howToUseVoucherValidity`)}</div>
        <div className="value">{t(`shops:howToUseVoucherValidityMsg`)}</div>
      </li>
    </ShopDetailsStyles>
  );
};
export default ActivityBookingDetails;
