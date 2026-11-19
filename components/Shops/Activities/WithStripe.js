import { WithStripeStyles } from "./styles/WithStripeStyles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { updateDoc, getFirestore, doc } from "firebase/firestore/lite";
const WithStripe = ({ activity, t, setActivity, user }) => {
  const [withStripe, setWithStripe] = useState(activity?.withStripe || false);
  return (
    <WithStripeStyles>
      <div className="checkbox-wrapper">
        <FormControlLabel
          control={
            <Checkbox
              disabled={user?.verified === "false"}
              style={{
                transform: "scale(1.5)",
              }}
              checked={withStripe}
              onChange={async () => {
                setActivity({
                  ...activity,
                  withStripe: !withStripe,
                });
                const updatedDoc = await updateDoc(
                  doc(getFirestore(), "activities", activity?.id),
                  {
                    withStripe: !withStripe,
                  }
                );
                setWithStripe(!withStripe);
              }}
              sx={{
                color: "var(--pink)",
                "&.Mui-checked": {
                  color: "var(--pink)",
                },
              }}
            />
          }
          label={t("shops:withStripe")}
        />
        <p className="checkbox-msg">{t("shops:withStripeMsg")}</p>
      </div>
    </WithStripeStyles>
  );
};
export default WithStripe;
