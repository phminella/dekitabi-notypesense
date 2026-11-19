import { ProfileContactStyles } from "./styles/ProfileContactStyles";
import Image from "next/legacy/image";
import React from "react";
const ProfileContact = ({ profile, t, user }) => {
  const shuffleContact = (string) => {
    const chars = string?.split("");
    chars?.sort(() => 0.5 - Math.random());
    const scrambled = chars?.join("");
    return scrambled;
  };
  return (
    <ProfileContactStyles>
      {profile?.contact &&
      (profile?.contact?.email !== "" ||
        profile?.contact?.phone !== "" ||
        profile?.contact?.skype !== "" ||
        profile?.contact?.whatsapp !== "" ||
        profile?.contact?.line !== "" ||
        profile?.contact?.wechat !== "" ||
        profile?.contact?.kakao !== "" ||
        profile?.contact?.qq !== "") ? (
        <div className="contact flex-wrapper-ten">
          {profile?.contact?.phone && (
            <p>
              <Image
                src="/img/icon-phone.svg"
                height={18}
                width={18}
                alt="dekitabi-tour-guide-phone"
              />
              {user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? profile?.contact?.phone
                : shuffleContact(profile?.contact?.phone)}
            </p>
          )}
          {profile?.contact?.email && (
            <p>
              <Image
                src="/img/icon-email.svg"
                height={13}
                width={18}
                alt="dekitabi-tour-guide-email"
              />
              {user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? profile?.contact?.email
                : shuffleContact(profile?.contact?.email)}
            </p>
          )}
          {profile?.contact?.line && (
            <p>
              <Image
                src="/img/icon-line.svg"
                height={20}
                width={20}
                alt="dekitabi-tour-guide-line"
              />
              {user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? profile?.contact?.line
                : shuffleContact(profile?.contact?.line)}
            </p>
          )}
          {profile?.contact?.whatsapp && (
            <p>
              <Image
                src="/img/icon-whatsapp2.svg"
                height={20}
                width={20}
                alt="dekitabi-tour-guide-whatsapp"
              />
              {user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? profile?.contact?.whatsapp
                : shuffleContact(profile?.contact?.whatsapp)}
            </p>
          )}
          {profile?.contact?.skype && (
            <p>
              <Image
                src="/img/icon-skype.svg"
                height={20}
                width={20}
                alt="dekitabi-tour-guide-skype"
              />
              {user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? profile?.contact?.skype
                : shuffleContact(profile?.contact?.skype)}
            </p>
          )}
          {profile?.contact?.wechat && (
            <p>
              <Image
                src="/img/icon-wechat.svg"
                height={20}
                width={20}
                alt="dekitabi-tour-guide-wechat"
              />
              {user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? profile?.contact?.wechat
                : shuffleContact(profile?.contact?.wechat)}
            </p>
          )}
          {profile?.contact?.qq && (
            <p>
              <Image src="/img/icon-qq.svg" height={20} width={20} alt="dekitabi-tour-guide-qq" />
              {user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? profile?.contact?.qq
                : shuffleContact(profile?.contact?.qq)}
            </p>
          )}
          {profile?.contact?.kakao && (
            <p>
              <Image
                src="/img/icon-kakao.svg"
                height={20}
                width={20}
                alt="dekitabi-tour-guide-kakao"
              />
              {user?.uid === profile?.uid ||
              user?.booked?.includes(profile?.uid)
                ? profile?.contact?.kakao
                : shuffleContact(profile?.contact?.kakao)}
            </p>
          )}
        </div>
      ) : (
        <p>{t("noContacts")}</p>
      )}
    </ProfileContactStyles>
  );
};
export default React.memo(ProfileContact);
