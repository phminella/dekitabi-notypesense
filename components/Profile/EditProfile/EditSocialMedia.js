import { EditSocialMediaStyles } from "./styles/EditSocialMediaStyles";
import React, { useState } from "react";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
const EditSocialMedia = ({ profile, setProfile, updateProfile, t }) => {
  const [saved, setSaved] = useState(false);
  const [editSocialMedia, setEditSocialMedia] = useState(false);
  const [socialMedia, setSocialMedia] = useState(
    profile?.socialMedia || {
      youtube: "",
      facebook: "",
      twitter: "",
      tiktok: "",
      instagram: "",
      substack: "",
      linkedin: "",
      tiktok: "",
      weibo: "",
    }
  );
  const updateSocialMedia = async () => {
    let tempSocialMedia = {
      youtube: socialMedia?.youtube?.split("/")[3]
        ? socialMedia?.youtube?.split("/")[3]
        : socialMedia?.youtube,
      facebook: socialMedia?.facebook?.split("/")[3]
        ? socialMedia?.facebook?.split("/")[3]
        : socialMedia?.facebook,
      twitter: socialMedia?.twitter?.split("/")[3]
        ? socialMedia?.twitter?.split("/")[3]
        : socialMedia?.twitter,
      tiktok: socialMedia?.tiktok?.split("/")[3]
        ? socialMedia?.tiktok?.split("/")[3]
        : socialMedia?.tiktok,
      instagram: socialMedia?.instagram?.split("/")[3]
        ? socialMedia?.instagram?.split("/")[3]
        : socialMedia?.instagram,
      tiktok: socialMedia?.tiktok?.split("/")[3]
        ? socialMedia?.tiktok?.split("/")[3]
        : socialMedia?.tiktok,
      substack: socialMedia?.substack?.split("//")[1]
        ? socialMedia?.substack?.split("//")[1]
        : socialMedia?.substack?.split("substack")[0]
        ? socialMedia?.substack?.split("substack")[0]?.split(".")[0]
        : socialMedia?.substack,
      linkedin: socialMedia?.linkedin?.split("/")[4]
        ? socialMedia?.linkedin?.split("/")[4]
        : socialMedia?.linkedin?.split("/")[3]
        ? socialMedia?.linkedin?.split("/")[3]
        : socialMedia?.linkedin,
    };
    if (updateProfile({ socialMedia: tempSocialMedia })) {
      setSocialMedia(tempSocialMedia);
      setEditSocialMedia(false);
      setProfile({ ...profile, socialMedia: tempSocialMedia });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  return (
    <EditSocialMediaStyles>
      <div className="title">
        <h3>
          {t("socialMedia")} <span>{t("optional")}</span>
        </h3>{" "}
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {profile?.socialMedia &&
          (socialMedia?.facebook !== "" ||
            socialMedia?.twitter !== "" ||
            socialMedia?.instagram !== "" ||
            socialMedia?.tiktok !== "" ||
            socialMedia?.weibo !== "" ||
            socialMedia?.youtube !== "" ||
            socialMedia?.substack !== " " ||
            socialMedia?.linkedin !== "") &&
          !editSocialMedia && (
            <button onClick={() => setEditSocialMedia(true)}>
              {t("edit")}
            </button>
          )}
        {(!profile?.socialMedia ||
          (socialMedia?.facebook === "" &&
            socialMedia?.twitter === "" &&
            socialMedia?.instagram === "" &&
            socialMedia?.tiktok === "" &&
            socialMedia?.weibo === "" &&
            socialMedia?.youtube === "" &&
            socialMedia?.substack === "" &&
            socialMedia?.linkedin !== "")) &&
          !editSocialMedia && (
            <button onClick={() => setEditSocialMedia(true)}>{t("add")}</button>
          )}
        {editSocialMedia && (
          <button onClick={() => setEditSocialMedia(false)}>
            {t("cancel")}
          </button>
        )}
      </div>
      {socialMedia?.facebook === "" &&
        socialMedia?.twitter === "" &&
        socialMedia?.instagram === "" &&
        socialMedia?.tiktok === "" &&
        socialMedia?.weibo === "" &&
        socialMedia?.youtube === "" &&
        socialMedia?.substack === "" &&
        socialMedia?.linkedin === "" &&
        !editSocialMedia && <p>{t("socialMediaEmpty")}</p>}
      {profile?.socialMedia && !editSocialMedia && (
        <div className="social-media">
          <ul className="flex-wrapper-ten">
            {profile?.socialMedia?.facebook && (
              <li>
                <a
                  href={`https://www.facebook.com/${profile?.socialMedia?.facebook}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-facebook.svg"
                    height={20}
                    width={20}
                    alt="facebook"
                  />
                  {profile?.socialMedia?.facebook}
                </a>
              </li>
            )}
            {profile?.socialMedia?.instagram && (
              <li>
                <a
                  href={`https://www.instagram.com/${profile?.socialMedia?.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-instagram.svg"
                    height={20}
                    width={20}
                    alt="instagram"
                  />
                  {profile?.socialMedia?.instagram}
                </a>
              </li>
            )}
            {profile?.socialMedia?.tiktok && (
              <li>
                <a
                  href={`https://www.tiktok.com/${profile?.socialMedia?.tiktok}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-tiktok.svg"
                    height={20}
                    width={20}
                    alt="tiktok"
                  />
                  {profile?.socialMedia?.tiktok}
                </a>
              </li>
            )}
            {profile?.socialMedia?.twitter && (
              <li>
                <a
                  href={`https://www.twitter.com/${profile?.socialMedia?.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-twitter.svg"
                    height={20}
                    width={20}
                    alt="twitter"
                  />
                  {profile?.socialMedia?.twitter}
                </a>
              </li>
            )}
            {profile?.socialMedia?.youtube && (
              <li>
                <a
                  href={`https://www.youtube.com/${profile?.socialMedia?.youtube}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-youtube.svg"
                    height={20}
                    width={20}
                    alt="youtube"
                  />
                  {profile?.socialMedia?.youtube}
                </a>
              </li>
            )}
            {profile?.socialMedia?.substack && (
              <li>
                <a
                  href={`https://${profile?.socialMedia?.substack}.substack.com`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-substack.svg"
                    height={20}
                    width={20}
                    alt="substack"
                  />
                  {profile?.socialMedia?.substack}
                </a>
              </li>
            )}
            {profile?.socialMedia?.linkedin && (
              <li>
                <a
                  href={`https://jp.linkedin.com/in/${profile?.socialMedia?.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-linkedin.svg"
                    height={20}
                    width={20}
                    alt="linkedin"
                  />
                  {profile?.socialMedia?.linkedin}
                </a>
              </li>
            )}
            {profile?.socialMedia?.weibo && (
              <li>
                <a
                  href={`https://www.weibo.com/${profile?.socialMedia?.weibo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-weibo.svg"
                    height={20}
                    width={20}
                    alt="weibo"
                  />
                  {profile?.socialMedia?.weibo}
                </a>
              </li>
            )}
            {profile?.socialMedia?.substack && (
              <li>
                <a
                  href={`https://${profile?.socialMedia?.substack}.substack.com/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/img/icon-substack.svg"
                    height={20}
                    width={20}
                    alt="substack"
                  />
                  {profile?.socialMedia?.substack}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
      {editSocialMedia && (
        <div className="edit-social-media">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateSocialMedia();
            }}
          >
            <div className="two-columns-wrapper">
              <ul>
                {/* facebook */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <a href="https://facebook.com/">
                        <Image
                          src="/img/icon-facebook.svg"
                          height={20}
                          width={20}
                          alt="facebook"
                        />
                      </a>
                    </div>
                    <TextField
                      name="facebook"
                      label="Facebook"
                      placeholder={t("facebookInput")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={socialMedia?.facebook}
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          facebook: e.target.value,
                        })
                      }
                    />
                  </div>
                </li>
                {/* instagram */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <a href="https://instagram.com/">
                        <Image
                          src="/img/icon-instagram.svg"
                          height={20}
                          width={20}
                          alt="instagram"
                        />
                      </a>
                    </div>
                    <TextField
                      name="instagram"
                      label="Instagram"
                      placeholder={t("instagramInput")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={socialMedia?.instagram}
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          instagram: e.target.value,
                        })
                      }
                    />
                  </div>
                </li>
                {/* tiktok */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <a href="https://tiktok.com/">
                        <Image
                          src="/img/icon-tiktok.svg"
                          height={20}
                          width={20}
                          alt="tiktok"
                        />
                      </a>
                    </div>
                    <TextField
                      name="tiktok"
                      label="TikTok"
                      placeholder={t("tiktokInput")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={socialMedia?.tiktok}
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          tiktok: e.target.value,
                        })
                      }
                    />
                  </div>
                </li>
                {/* substack */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <a href="https://www.substack.com/">
                        <Image
                          src="/img/icon-substack.svg"
                          height={20}
                          width={20}
                          alt="substack"
                        />
                      </a>
                    </div>
                    <TextField
                      name="substack"
                      label="Substack"
                      placeholder={t("substackInput")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={socialMedia?.substack}
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          substack: e.target.value,
                        })
                      }
                    />
                  </div>
                </li>
              </ul>
              <ul>
                {/* twitter */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <a href="https://twitter.com/">
                        <Image
                          src="/img/icon-twitter.svg"
                          height={20}
                          width={20}
                          alt="twitter"
                        />
                      </a>
                    </div>
                    <TextField
                      name="twitter"
                      label="Twitter"
                      placeholder={t("twitterInput")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={socialMedia?.twitter}
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          twitter: e.target.value,
                        })
                      }
                    />
                  </div>
                </li>
                {/* youtube */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <a href="https://youtube.com/">
                        <Image
                          src="/img/icon-youtube.svg"
                          height={20}
                          width={20}
                          alt="youtube"
                        />
                      </a>
                    </div>
                    <TextField
                      name="youtube"
                      label="Youtube"
                      placeholder={t("youtubeInput")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={socialMedia?.youtube}
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          youtube: e.target.value,
                        })
                      }
                    />
                  </div>
                </li>
                {/* weibo */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <a href="https://weibo.com/">
                        <Image
                          src="/img/icon-weibo.svg"
                          height={20}
                          width={20}
                          alt="weibo"
                        />
                      </a>
                    </div>
                    <TextField
                      name="weibo"
                      label="Weibo"
                      placeholder={t("weiboInput")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={socialMedia?.weibo}
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          weibo: e.target.value,
                        })
                      }
                    />
                  </div>
                </li>
                {/* linkedin */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <a href="https://www.linkedin.com/">
                        <Image
                          src="/img/icon-linkedin.svg"
                          height={20}
                          width={20}
                          alt="linkedin"
                        />
                      </a>
                    </div>
                    <TextField
                      name="linkedin"
                      label="Linkedin"
                      placeholder={t("linkedinInput")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={socialMedia?.linkedin}
                      onChange={(e) =>
                        setSocialMedia({
                          ...socialMedia,
                          linkedin: e.target.value,
                        })
                      }
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="edit-buttons">
              <button
                type="button"
                onClick={() => {
                  setEditSocialMedia(false);
                  setSocialMedia(
                    profile?.socialMedia || {
                      youtube: "",
                      facebook: "",
                      twitter: "",
                      tiktok: "",
                      instagram: "",
                      tiktok: "",
                    }
                  );
                }}
              >
                {t("cancel")}
              </button>{" "}
              <button type="submit">{t("save")}</button>
            </div>
          </form>
        </div>
      )}
    </EditSocialMediaStyles>
  );
};
export default React.memo(EditSocialMedia);
