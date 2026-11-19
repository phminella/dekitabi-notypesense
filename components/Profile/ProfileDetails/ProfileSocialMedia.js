import { ProfileSocialMediaStyles } from "./styles/ProfileSocialMediaStyles";
import Image from "next/legacy/image";
import React from "react";
const ProfileSocialMedia = ({ profile, t, user }) => {
  return (
    <ProfileSocialMediaStyles>
      <div className="social-media">
        {profile?.socialMedia?.facebook && (
          <a
            style={{
              pointerEvents:
                user?.uid === profile?.uid ||
                user?.booked?.includes(profile?.uid)
                  ? ""
                  : "none",
            }}
            href={
              user?.uid === profile?.uid || user?.booked?.includes(profile?.uid)
                ? `https://www.facebook.com/${profile?.socialMedia?.facebook}`
                : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/img/icon-facebook.svg"
              height={25}
              width={25}
              alt="dekitabi-tour-guide-facebook"
            />
          </a>
        )}
        {profile?.socialMedia?.instagram && (
          <a
            style={{
              pointerEvents:
                user?.uid === profile?.uid ||
                user?.booked?.includes(profile?.uid)
                  ? ""
                  : "none",
            }}
            href={
              user?.uid === profile?.uid || user?.booked?.includes(profile?.uid)
                ? `https://www.instagram.com/${profile?.socialMedia?.instagram}`
                : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/img/icon-instagram.svg"
              height={25}
              width={25}
              alt="dekitabi-tour-guide-instagram"
            />
          </a>
        )}
        {profile?.socialMedia?.tiktok && (
          <a
            style={{
              pointerEvents:
                user?.uid === profile?.uid ||
                user?.booked?.includes(profile?.uid)
                  ? ""
                  : "none",
            }}
            href={
              user?.uid === profile?.uid || user?.booked?.includes(profile?.uid)
                ? `https://www.tiktok.com/${profile?.socialMedia?.tiktok}`
                : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/img/icon-tiktok.svg"
              height={25}
              width={25}
              alt="dekitabi-tour-guide-tiktok"
            />
          </a>
        )}
        {profile?.socialMedia?.twitter && (
          <a
            style={{
              pointerEvents:
                user?.uid === profile?.uid ||
                user?.booked?.includes(profile?.uid)
                  ? ""
                  : "none",
            }}
            href={
              user?.uid === profile?.uid || user?.booked?.includes(profile?.uid)
                ? `https://www.twitter.com/${profile?.socialMedia?.twitter}`
                : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/img/icon-twitter.svg"
              height={25}
              width={25}
              alt="dekitabi-tour-guide-twitter"
            />
          </a>
        )}
        {profile?.socialMedia?.youtube && (
          <a
            style={{
              pointerEvents:
                user?.uid === profile?.uid ||
                user?.booked?.includes(profile?.uid)
                  ? ""
                  : "none",
            }}
            href={
              user?.uid === profile?.uid || user?.booked?.includes(profile?.uid)
                ? `https://www.youtube.com/${profile?.socialMedia?.youtube}`
                : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/img/icon-youtube.svg"
              height={25}
              width={25}
              alt="dekitabi-tour-guide-youtube"
            />
          </a>
        )}
        {profile?.socialMedia?.substack && (
          <a
            style={{
              pointerEvents:
                user?.uid === profile?.uid ||
                user?.booked?.includes(profile?.uid)
                  ? ""
                  : "none",
            }}
            href={
              user?.uid === profile?.uid || user?.booked?.includes(profile?.uid)
                ? `https://${profile?.socialMedia?.substack}.substack.com`
                : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/img/icon-substack.svg"
              height={25}
              width={25}
              alt="dekitabi-tour-guide-substack"
            />
          </a>
        )}{" "}
        {profile?.socialMedia?.linkedin && (
          <a
            style={{
              pointerEvents:
                user?.uid === profile?.uid ||
                user?.booked?.includes(profile?.uid)
                  ? ""
                  : "none",
            }}
            href={
              user?.uid === profile?.uid || user?.booked?.includes(profile?.uid)
                ? `https://jp.linkedin.com/in/${profile?.socialMedia?.linkedin}`
                : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/img/icon-linkedin.svg"
              height={25}
              width={25}
              alt="dekitabi-tour-guide-linkedin"
            />
          </a>
        )}
        {profile?.socialMedia?.weibo && (
          <a
            style={{
              pointerEvents:
                user?.uid === profile?.uid ||
                user?.booked?.includes(profile?.uid)
                  ? ""
                  : "none",
            }}
            href={
              user?.uid === profile?.uid || user?.booked?.includes(profile?.uid)
                ? `https://www.weibo.com/${profile?.socialMedia?.weibo}`
                : ""
            }
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/img/icon-weibo.svg"
              height={25}
              width={25}
              alt="dekitabi-tour-guide-weibo"
            />
          </a>
        )}
      </div>
    </ProfileSocialMediaStyles>
  );
};
export default React.memo(ProfileSocialMedia);
