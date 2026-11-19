import { ShopAddActivityStyles } from "./styles/ShopAddActivityStyles";
import Image from "next/image";
import Spinner from "../../../UI/Spinner";
import dynamic from "next/dynamic";
import { useState } from "react";
const ShopNewActivity = dynamic(
  () => import("../Activities/ShopNewActivity/ShopNewActivity"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
const ShopAddActivity = ({ t, shopProfile }) => {
  const [addNewActivity, setAddNewActivity] = useState(false);
  return (
    <>
      {addNewActivity && (
        <ShopNewActivity
          setShowModal={setAddNewActivity}
          t={t}
          shopProfile={shopProfile}
        />
      )}
      <ShopAddActivityStyles>
        <button
          onClick={() => {
            setAddNewActivity(true);
          }}
        >
          <Image
            src="/img/icon-plus2.svg"
            height={20}
            width={20}
            alt="add-information"
          />
          {t("shops:newActivity")} 
        </button>
      </ShopAddActivityStyles>
    </>
  );
};
export default ShopAddActivity;
