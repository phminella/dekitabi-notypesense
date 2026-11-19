import { ProfileDesignOptionsStyles } from "./styles/ProfileDesignOptionsStyles";
import EditProfileBackground from "./EditProfileBackground";
import React from "react";
const ProfileDesignOptions = ({
  profile,
  setProfile,
  setLoadingBg,
  toursLength,
}) => {
  return (
    <ProfileDesignOptionsStyles>
      <div className="design-options-bg" />
      <EditProfileBackground
        setProfile={setProfile}
        profile={profile}
        setLoadingBg={setLoadingBg}
        toursLength={toursLength}
      />
    </ProfileDesignOptionsStyles>
  );
};
export default React.memo(ProfileDesignOptions);
