import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Image from "next/legacy/image";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore/lite";
import useLocalStorage from "../../lib/useLocalStorage";
import { setCart, setCurrency } from "../../store/appSlice";
const SelectCurrencyOptions = ({
  setShow,
  setShowSettings,
  t,
  currency,
  user,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.app.cart, shallowEqual);
  const popularCurrencyList = [
    { currency: t("jpYen"), code: "JPY", symbol: "¥" },
    { currency: t("usDollar"), code: "USD", symbol: "$" },
    { currency: t("euro"), code: "EUR", symbol: "€" },
    { currency: t("ausDollar"), code: "AUD", symbol: "$" },
    { currency: t("caDollar"), code: "CAD", symbol: "$" },
    { currency: t("pound"), code: "GBP", symbol: "£" },
    { currency: t("chineseYuan"), code: "CNY", symbol: "¥" },
    { currency: t("hkDollar"), code: "HKD", symbol: "$" },
    { currency: t("twDollar"), code: "TWD", symbol: "$" },
    { currency: t("skWon"), code: "KRW", symbol: "₩" },
    { currency: t("vnDong"), code: "VND", symbol: "₫" },
    { currency: t("phPeso"), code: "PHP", symbol: "₱" },
    { currency: t("idRupiah"), code: "IDR", symbol: "Rp" },
    { currency: t("thBaht"), code: "THB", symbol: "฿" },
    { currency: t("sgDollar"), code: "SGD", symbol: "$" },
  ];
  const currencyList = [
    { currency: t("brReal"), code: "BRL", symbol: "R$" },
    { currency: t("msRinggit"), code: "MYR", symbol: "RM" },
    { currency: t("daKrone"), code: "DKK", symbol: "kr" },
    { currency: t("emDirham"), code: "AED", symbol: "ﺩ.ﺇ" },
    { currency: t("inRupee"), code: "INR", symbol: "₹" },
    { currency: t("mxPeso"), code: "MXN", symbol: "$" },
    { currency: t("nzDollar"), code: "NZD", symbol: "$" },
    { currency: t("norKrone"), code: "NOK", symbol: "kr" },
    { currency: t("saRiyal"), code: "SAR", symbol: "SR" },
    { currency: t("swKrona"), code: "SEK", symbol: "kr" },
    { currency: t("swiFranc"), code: "CHF", symbol: "" },
    { currency: t("turLira"), code: "TRY", symbol: "₺" },
  ];
  const { setItem } = useLocalStorage();
  const updateProfile = async (currency) => {
    const userRef = doc(getFirestore(), "users", user.uid);
    await updateDoc(userRef, {
      currency: currency,
      cart: { ...cart, currency: currency },
    });
    return true;
  };
  const setCurrencyHandler = async (currency) => {
    const currenciesRef = doc(getFirestore(), "currencies/currencies");
    const currenciesSnap = await getDoc(currenciesRef);
    const currencies = currenciesSnap.data();
    const userCurrency = {
      ...currency,
      rate: currencies[currency?.code?.toLowerCase()],
    };
    if (user?.uid) {
      updateProfile(userCurrency);
      setItem("currency", JSON.stringify(userCurrency));
    } else {
      setItem("currency", JSON.stringify(userCurrency));
    }
    dispatch(setCurrency(userCurrency));
    //cart
    let tempCartItems = await Promise.all(
      cart.items.map((item) => {
        return { ...item, currency: userCurrency };
      })
    );
    const tempCart = { ...cart, currency: userCurrency, items: tempCartItems };
    dispatch(setCart(tempCart));
    setItem("currency", JSON.stringify(userCurrency));
    setItem("cart", JSON.stringify(tempCart));
    setShow(false);
    if (setShowSettings) {
      setShowSettings(false);
    }
  };
  return (
    <div className={`currency-wrapper`}>
      <div className="currency-flex">
        <div
          className={`currency-background`}
          onClick={() => {
            setShow(false);
            if (setShowSettings) {
              setShowSettings(false);
            }
          }}
        ></div>
        <div className={`currency-list`}>
          <button
            className="close-icon"
            onClick={() => {
              setShow(false);
              if (setShowSettings) {
                setShowSettings(false);
              }
            }}
          >
            <Image
              src="/img/icon-close.svg"
              height={20}
              width={20}
              alt="dekitabi-select-currency-close"
            />
          </button>
          <h2>{t("chooseCurrency")}</h2>
          <div className="currency-list-wrapper">
            <h3>{t("popularCurrencies")}</h3>
            <ul>
              {popularCurrencyList.map((item, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={() => setCurrencyHandler(item)}
                      className={currency?.code === item.code ? "active" : 0}
                    >
                      <div>
                        <p>
                          <span>{item.symbol}</span>
                          {item.code}
                        </p>
                        <p className="p-currency"> {item.currency}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
            <h3>{t("currencies")}</h3>
            <ul>
              {currencyList.map((item, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={() => setCurrencyHandler(item)}
                      className={currency?.code === item.code ? "active" : 0}
                    >
                      <div>
                        <p>
                          <span>{item.symbol}</span>
                          {item.code}
                        </p>
                        <p className="p-currency"> {item.currency}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectCurrencyOptions;
