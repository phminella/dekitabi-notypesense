import { EditProfileTitleStyles } from "./styles/EditProfileTitleStyles";
import React from "react";
const EditProfileTitle = ({ setEditProfile, t }) => {
  return (
    <EditProfileTitleStyles>
      <h2>{t("editProfile")}</h2>
    </EditProfileTitleStyles>
  );
};
export default React.memo(EditProfileTitle);
