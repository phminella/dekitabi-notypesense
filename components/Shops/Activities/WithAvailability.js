import { WithStripeStyles } from "./styles/WithStripeStyles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { updateDoc, getFirestore, doc } from "firebase/firestore/lite";
import { useState } from "react";
const WithAvailability = ({ activity, t, setActivity, setShowModal }) => {
  const [withAvailability, setWithAvailability] = useState(
    activity?.withAvailability || false
  );
  return (
    <WithStripeStyles>
      <div className="checkbox-wrapper">
        <FormControlLabel
          control={
            <Checkbox
              style={{
                transform: "scale(1.5)",
              }}
              checked={withAvailability}
              onChange={async () => {
                setActivity({
                  ...activity,
                  withAvailability: !withAvailability,
                  ...(withAvailability && {
                    withStripe: false,
                  }),
                });
                const updatedDoc = await updateDoc(
                  doc(getFirestore(), "activities", activity?.id),
                  {
                    withAvailability: !withAvailability,
                  }
                );
                setWithAvailability(!withAvailability);
              }}
              sx={{
                color: "var(--pink)",
                "&.Mui-checked": {
                  color: "var(--pink)",
                },
              }}
            />
          }
          label={t("shops:withAvailability")}
        />
        <p className="checkbox-msg">
          {t("shops:withAvailabilityMsg")}{" "}
          {withAvailability && (
            <button
              className="link"
              onClick={() => setShowModal("availability")}
            >
              {t("edit")}
            </button>
          )}
        </p>
      </div>
    </WithStripeStyles>
  );
};
export default WithAvailability;
