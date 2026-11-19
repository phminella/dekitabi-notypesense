import { ProfilePhotosStyles } from "./styles/ProfilePhotosStyles.js";
import PhotosCarousel from "./PhotosCarousel.js";
import ProfileCarouselAddPhoto from "./ProfileCarouselAddPhoto.js";
import React, { useState } from "react";
import ProfilePhoto from "./ProfilePhoto.js";
const ProfilePhotos = ({ profile, setProfile, user, t, photos }) => {
  const [showCarousel, setShowCarousel] = useState(false);
  if (!photos) return <></>;
  return (
    <ProfilePhotosStyles>
      {profile?.uid === user?.uid && profile?.photos?.length === 0 && (
        <div className="carousel-add-photo-wrapper">
          <ProfileCarouselAddPhoto
            profile={profile}
            setProfile={setProfile}
            t={t}
          />
        </div>
      )}
      {profile?.photos?.length > 0 && (
        <>
          {showCarousel && (
            <PhotosCarousel
              setShowCarousel={setShowCarousel}
              photos={photos}
              profile={profile}
              setProfile={setProfile}
              t={t}
              user={user}
            />
          )}
          <div className="profile-photos">
            <div
              className={`profile-photos-wrapper ${
                photos?.length > 1 ? "two-grid" : ""
              }`}
            >
              <div className="left-frame">
                <ProfilePhoto src={photos[0]} />
                <div
                  onClick={() => setShowCarousel(true)}
                  className="left-frame-photo-wrapper"
                ></div>
                <button
                  className="view-all"
                  onClick={() => setShowCarousel(true)}
                >
                  {t("viewAllPhotos", { photosLength: photos?.length })}
                </button>
                {photos?.length < 20 && profile?.uid === user?.uid && (
                  <button className="add-photo-button">
                    <ProfileCarouselAddPhoto
                      profile={profile}
                      setProfile={setProfile}
                      t={t}
                    />
                  </button>
                )}
              </div>
              {photos?.length > 1 && (
                <div
                  className="right-frame"
                  onClick={() => setShowCarousel(true)}
                >
                  <div className="right-frame-top">
                    <ProfilePhoto src={photos[1]} />
                  </div>
                  {photos?.length > 2 && (
                    <div
                      className={`right-frame-bottom ${
                        photos?.length > 3 ? "two-grid" : ""
                      }`}
                    >
                      <div className="right-frame-bottom-left">
                        <ProfilePhoto src={photos[2]} />
                      </div>
                      {photos?.length > 3 && (
                        <div className="right-frame-bottom-right">
                          <ProfilePhoto src={photos[3]} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {profile?.uid === user?.uid && profile?.photos?.length > 0 && (
        <div className="uploads-left">
          {t("uploadsLeft")} <b>{20 - profile?.photos?.length}</b>
        </div>
      )}
    </ProfilePhotosStyles>
  );
};
export default React.memo(ProfilePhotos);
