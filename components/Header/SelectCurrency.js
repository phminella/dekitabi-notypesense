import { SelectCurrencyStyles } from "./styles/SelectCurrencyStyles";
import { SelectCurrencyResponsiveStyles } from "./styles/responsive/SelectCurrencyResponsiveStyles";
import { useSelector, shallowEqual } from "react-redux";
import { useState } from "react";
import dynamic from "next/dynamic";
const SelectCurrencyOptions = dynamic(() => import("./SelectCurrencyOptions"));
const SelectCurrency = ({ user, t, setShowSettings }) => {
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const [show, setShow] = useState(false);
  return (
    <SelectCurrencyStyles>
      <SelectCurrencyResponsiveStyles>
        <button
          type="button"
          disabled={user?.guide === "true"}
          className="currency-button"
          onClick={() => {
            setShow(true);
          }}
        >
          <span>{currency?.symbol}</span>
          {currency?.code}
          <span className="arrow">&#9662;</span>
        </button>
        {show && (
          <SelectCurrencyOptions
            setShowSettings={setShowSettings}
            setShow={setShow}
            t={t}
            currency={currency}
            user={user}
          />
        )}
      </SelectCurrencyResponsiveStyles>
    </SelectCurrencyStyles>
  );
};
export default SelectCurrency;
