import { useEffect, useCallback } from "react";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setCart, setShowCart } from "../store/appSlice";
import useLocalStorage from "./useLocalStorage";

const useCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user, shallowEqual);
  const cart = useSelector((state) => state.app.cart, shallowEqual);
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const language = useSelector((state) => state.app.language, shallowEqual);
  const { setItem } = useLocalStorage();

  const getUserRef = (uid) => doc(getFirestore(), "users", uid);

  const saveCart = useCallback(async (updatedCart, show = false) => {
    dispatch(setCart(updatedCart));
    setItem("cart", JSON.stringify(updatedCart));
    if (show) dispatch(setShowCart(true));
    if (user?.uid) {
      try {
        await updateDoc(getUserRef(user.uid), { cart: updatedCart });
      } catch (e) {
        console.error("Failed to update cart in Firestore:", e);
      }
    }
  }, [user?.uid, dispatch, setItem]);

  useEffect(() => {
    if (currency?.rate && cart?.items?.length > 0) {
      if (currency.code !== cart.currency?.code) {
        const updatedItems = cart.items.map((item) => ({ ...item, currency }));
        const updatedCart = { ...cart, items: updatedItems, currency };
        saveCart(updatedCart);
      }
    }
  }, [currency]);

  const updateCartItem = useCallback((id, updatedData) => {
    const updatedItems = (cart.items || []).map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    const updatedCart = { ...cart, items: updatedItems };
    saveCart(updatedCart);
  }, [cart, saveCart]);

  const isAddedToCart = useCallback((id) => {
    return cart.items?.find((item) => item.id === id) || false;
  }, [cart]);

  const addToCart = useCallback(
    async (item, currency, type, includeTransport, bookNow) => {
      if (type === "tour") {
        const baseAttraction = item.attractions?.[0] || {};
        const mapUrl = baseAttraction.mapUrl
          ? baseAttraction.mapUrl
          : `https://www.google.com/maps/place/${baseAttraction._geoloc?.[0]}+${baseAttraction._geoloc?.[1]}`;

        const tour = {
          ...item,
          attractions: [
            {
              name: baseAttraction.name,
              translatedName: baseAttraction.translatedName || "",
              mapUrl,
              attractionUrl: baseAttraction.url || "",
            },
          ],
          name:
            item.createdBy !== "Guest" && item.createdBy !== user?.uid
              ? item.translatedName?.[language.code]
              : item.name,
          tourBaseItinerary: item.tourBaseItinerary || false,
          price: Math.ceil(item.guideFee || item.price),
          currency: cart.currency,
          notes: item.notes || "",
          ...(includeTransport && { transportIncluded: true }),
          type,
        };

        const updatedCart = {
          ...cart,
          timer: new Date().getTime(),
          items: [...cart.items, tour],
        };

        await saveCart(updatedCart, !bookNow);
      }

      return true;
    },
    [cart, user?.uid, language.code, saveCart]
  );

  const removeFromCart = useCallback(
    async (id) => {
      let updatedCart = { ...cart };
      const index = updatedCart.items?.findIndex((item) => item.id === id);
      if (index > -1) {
        const updatedItems = [...updatedCart.items];
        updatedItems.splice(index, 1);
        updatedCart = {
          ...updatedCart,
          items: updatedItems,
          ...(updatedItems.length === 0 && { currency: "", timer: 0 }),
        };
        await saveCart(updatedCart, true);
        return true;
      }
      return false;
    },
    [cart, saveCart]
  );

  const getTotal = useCallback(() => {
    let total = 0;
    let tours = 0;

    for (const item of cart.items || []) {
      const price = item.price || 0;
      total += price;
      if (item.type === "tour") {
        tours += price;
      }
    }

    return { total, tours, rest: total - tours };
  }, [cart]);

  const clearCart = useCallback(async () => {
    const clearedCart = { currency: "", items: [], timer: 0 };
    await saveCart(clearedCart);
    return true;
  }, [saveCart]);

  return {
    isAddedToCart,
    addToCart,
    removeFromCart,
    getTotal,
    clearCart,
    updateCartItem,
  };
};

export default useCart;
