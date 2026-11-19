import React, { useState } from "react";
import { EditCanDriveStyles } from "./styles/EditCanDriveStyles";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import EditTransportFee from "./EditTransportFee";
import EditMaxPeopleTransport from "./EditMaxPeopleTransport";
const EditCanDrive = ({ profile, setProfile, updateProfile, t }) => {
  const [transportIncluded, setTransportIncluded] = useState(
    profile?.transportIncluded === "true" ? true : false
  );
  const [canDrive, setCanDrive] = useState(
    profile?.canDrive === "true" ? true : false
  );
  const updateCanDrive = async (e) => {
    if (
      updateProfile({
        canDrive: canDrive ? "false" : "true",
        ...(canDrive && {
          transportIncluded: "false",
          maxPeopleTransport: 1,
          feeWithTransport: false,
        }),
      })
    ) {
      if (setProfile) {
        setProfile({
          ...profile,
          canDrive: canDrive ? "false" : "true",
          ...(canDrive && {
            transportIncluded: "false",
            maxPeopleTransport: 1,
            feeWithTransport: false,
          }),
        });
      }
      if (canDrive) {
        setTransportIncluded(false);
      }
      setCanDrive(!canDrive);
    }
  };
  return (
    <EditCanDriveStyles>
      <div className="title">
        <h3>
          {t("transportCanDrive")} <span>{t("optional")}</span>
        </h3>
        <p className="warning">{t("driversLicenseWarning")}</p>
      </div>
      <div className="switch-wrapper">
        <p className={!canDrive ? "can-drive" : ""}>{t("no")}</p>
        <label className="switch">
          <input
            type="checkbox"
            value={canDrive}
            defaultChecked={canDrive}
            onChange={(e) => updateCanDrive(e)}
            name="canDrive"
          />
          <span className="slider round"></span>
        </label>
        <p className={canDrive ? "can-drive" : ""}>{t("yes")}</p>
      </div>
      {profile?.licensed !== "true" && (
        <p className="upload-license">
          <Image
            height={16}
            width={16}
            src="/img/icon-info2.svg"
            alt="info"
          ></Image>
          {t("uploadLicenseForTransport")}
        </p>
      )}
      {profile?.licensed === "true" && profile?.canDrive === "true" && (
        <div className="transport-included">
          <FormControlLabel
            control={
              <Checkbox
                style={{
                  transform: "scale(1.2)",
                }}
                checked={transportIncluded}
                onChange={() => {
                  console.log(transportIncluded);
                  if (
                    updateProfile({
                      transportIncluded: transportIncluded ? "false" : "true",
                      ...(transportIncluded && {
                        maxPeopleTransport: 1,
                        feeWithTransport: false,
                      }),
                    })
                  ) {
                    if (setProfile) {
                      setProfile({
                        ...profile,
                        transportIncluded: transportIncluded ? "false" : "true",
                        ...(transportIncluded && {
                          maxPeopleTransport: 1,
                          feeWithTransport: false,
                        }),
                      });
                    }
                    setTransportIncluded(!transportIncluded);
                  }
                }}
                sx={{
                  color: "var(--pink)",
                  "&.Mui-checked": {
                    color: "var(--pink)",
                  },
                }}
              />
            }
            label={t("transportIncluded")}
          />
        </div>
      )}
      {profile?.transportIncluded === "true" && (
        <>
          <EditMaxPeopleTransport
            profile={profile}
            setProfile={setProfile}
            updateProfile={updateProfile}
            t={t}
          />

          <EditTransportFee
            profile={profile}
            setProfile={setProfile}
            updateProfile={updateProfile}
            t={t}
          />
        </>
      )}
    </EditCanDriveStyles>
  );
};
export default React.memo(EditCanDrive);
