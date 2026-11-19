import ProfileBackground from "./ProfileBackground";
import { ProfileHeaderStyles } from "./styles/ProfileHeaderStyles";
import dynamic from "next/dynamic";
import React from "react";
const ProfileDesignOptions = dynamic(() => import("./ProfileDesignOptions"));
const ProfileHeader = ({
  profile,
  setProfile,
  id,
  user,
  loadingBg,
  setLoadingBg,
  toursLength,
}) => {
  if (!profile) return <>loading...</>;
  return (
    <ProfileHeaderStyles>
      {profile?.uid === user?.uid && (
        <ProfileDesignOptions
          profile={profile}
          user={user}
          setProfile={setProfile}
          id={id}
          setLoadingBg={setLoadingBg}
          toursLength={toursLength}
        />
      )}
      <ProfileBackground src={profile?.bg} loadingBg={loadingBg} />
    </ProfileHeaderStyles>
  );
};
export default React.memo(ProfileHeader);
