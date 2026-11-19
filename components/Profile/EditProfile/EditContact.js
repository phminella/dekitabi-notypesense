import { EditContactStyles } from "./styles/EditContactStyles";
import React, { useState } from "react";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
const EditContact = ({ profile, setProfile, updateProfile, t }) => {
  const [saved, setSaved] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [contact, setContact] = useState(
    profile?.contact || {
      email: "",
      phone: "",
      whatsapp: "",
      line: "",
      skype: "",
      wechat: "",
      qq: "",
      kakao: "",
    }
  );
  const updateContact = async () => {
    if (updateProfile({ contact: contact })) {
      setEditContact(false);
      setProfile({ ...profile, contact });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
  };
  return (
    <EditContactStyles>
      <div className="title">
        <h3>
          {t("contactDetails")} <span>{t("optional")}</span>
        </h3>{" "}
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {profile?.contact &&
          (contact?.email !== "" ||
            contact?.phone !== "" ||
            contact?.skype !== "" ||
            contact?.whatsapp !== "" ||
            contact?.line !== "" ||
            contact?.wechat !== "" ||
            contact?.kakao !== "" ||
            contact?.qq !== "") &&
          !editContact && (
            <button onClick={() => setEditContact(true)}>{t("edit")}</button>
          )}
        {(!profile?.contact ||
          (contact?.email === "" &&
            contact?.phone === "" &&
            contact?.skype === "" &&
            contact?.whatsapp === "" &&
            contact?.line === "" &&
            contact?.wechat === "" &&
            contact?.kakao === "" &&
            contact?.qq === "")) &&
          !editContact && (
            <button onClick={() => setEditContact(true)}>{t("add")}</button>
          )}
        {editContact && (
          <button onClick={() => setEditContact(false)}>{t("cancel")}</button>
        )}
      </div>
      {contact?.email === "" &&
        contact?.phone === "" &&
        contact?.skype === "" &&
        contact?.whatsapp === "" &&
        contact?.line === "" &&
        contact?.wechat === "" &&
        contact?.kakao === "" &&
        contact?.qq === "" &&
        !editContact && <p>{t("noContacts")}</p>}
      {profile?.contact && !editContact && (
        <div className="contact">
          <ul className="flex-wrapper-ten">
            {profile?.contact?.phone && (
              <li>
                <Image
                  src="/img/icon-phone.svg"
                  height={18}
                  width={18}
                  alt="phone"
                />
                {profile?.contact?.phone}
              </li>
            )}
            {profile?.contact?.email && (
              <li>
                <Image
                  src="/img/icon-email.svg"
                  height={13}
                  width={18}
                  alt="email"
                />
                {profile?.contact?.email}
              </li>
            )}
            {profile?.contact?.line && (
              <li>
                <Image
                  src="/img/icon-line.svg"
                  height={20}
                  width={20}
                  alt="line"
                />
                {profile?.contact?.line}
              </li>
            )}
            {profile?.contact?.whatsapp && (
              <li>
                <Image
                  src="/img/icon-whatsapp2.svg"
                  height={20}
                  width={20}
                  alt="whatsapp"
                />
                {profile?.contact?.whatsapp}
              </li>
            )}
            {profile?.contact?.skype && (
              <li>
                <Image
                  src="/img/icon-skype.svg"
                  height={20}
                  width={20}
                  alt="skype"
                />
                {profile?.contact?.skype}
              </li>
            )}
            {profile?.contact?.wechat && (
              <li>
                <Image
                  src="/img/icon-wechat.svg"
                  height={20}
                  width={20}
                  alt="wechat"
                />
                {profile?.contact?.wechat}
              </li>
            )}
            {profile?.contact?.qq && (
              <li>
                <Image src="/img/icon-qq.svg" height={20} width={20} alt="qq" />
                {profile?.contact?.qq}
              </li>
            )}
            {profile?.contact?.kakao && (
              <li>
                <Image
                  src="/img/icon-kakao.svg"
                  height={20}
                  width={20}
                  alt="kakao"
                />
                {profile?.contact?.kakao}
              </li>
            )}
          </ul>
        </div>
      )}
      {editContact && (
        <div className="edit-contact">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateContact();
            }}
          >
            <div className="contact-wrapper">
              <ul>
                {/* Phone Number */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <Image
                        src="/img/icon-phone.svg"
                        height={15}
                        width={15}
                        alt="phone"
                      />
                    </div>
                    <TextField
                      name="phone-number"
                      label={t("phoneNumber")}
                      placeholder={t("phoneNumber")}
                      variant="filled"
                      color="secondary"
                      maxLength={11}
                      minLength={10}
                      value={contact?.phone}
                      onChange={(e) => {
                        const regex = /^[0-9]*$/;
                        if (
                          e.target.value.length < 12 &&
                          (regex.test(e.target.value) || e.target.value === "")
                        ) {
                          setContact({ ...contact, phone: e.target.value });
                        }
                      }}
                    />
                  </div>
                </li>
                {/* Email */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <Image
                        src="/img/icon-email.svg"
                        height={13}
                        width={18}
                        alt="email"
                      />
                    </div>
                    <TextField
                      name="email"
                      type="email"
                      label={t("email")}
                      placeholder={t("email")}
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={4}
                      value={contact?.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                    />
                  </div>
                </li>
                {/* Line */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <Image
                        src="/img/icon-line.svg"
                        height={20}
                        width={20}
                        alt="line"
                      />
                    </div>
                    <TextField
                      name="line"
                      label="Line"
                      placeholder="Line"
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={contact.line}
                      onChange={(e) =>
                        setContact({ ...contact, line: e.target.value })
                      }
                    />
                  </div>
                </li>
                {/* Whatsapp */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <Image
                        src="/img/icon-whatsapp2.svg"
                        height={20}
                        width={20}
                        alt="whatsapp"
                      />
                    </div>
                    <TextField
                      name="whatsapp"
                      label="Whatsapp"
                      placeholder="Whatsapp"
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={contact?.whatsapp}
                      onChange={(e) =>
                        setContact({ ...contact, whatsapp: e.target.value })
                      }
                    />
                  </div>
                </li>
              </ul>
              <ul>
                {/* Line */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <Image
                        src="/img/icon-skype.svg"
                        height={20}
                        width={20}
                        alt="skype"
                      />
                    </div>
                    <TextField
                      name="skype"
                      label="Skype"
                      placeholder="Skype"
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={contact?.skype}
                      onChange={(e) =>
                        setContact({ ...contact, skype: e.target.value })
                      }
                    />
                  </div>
                </li>
                {/* wechat */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <Image
                        src="/img/icon-wechat.svg"
                        height={20}
                        width={20}
                        alt="wechat"
                      />
                    </div>
                    <TextField
                      name="wechat"
                      label="WeChat"
                      placeholder="WeChat"
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={contact?.wechat}
                      onChange={(e) =>
                        setContact({ ...contact, wechat: e.target.value })
                      }
                    />
                  </div>
                </li>
                {/* qq */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <Image
                        src="/img/icon-qq.svg"
                        height={20}
                        width={20}
                        alt="qq"
                      />
                    </div>
                    <TextField
                      name="qq"
                      label="QQ"
                      placeholder="QQ"
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={contact?.qq}
                      onChange={(e) =>
                        setContact({ ...contact, qq: e.target.value })
                      }
                    />
                  </div>
                </li>
                {/* kakao */}
                <li>
                  <div className="mui-input-wrapper">
                    <div className="contact-image">
                      <Image
                        src="/img/icon-kakao.svg"
                        height={20}
                        width={20}
                        alt="kakao"
                      />
                    </div>
                    <TextField
                      name="kakao"
                      label="Kakao"
                      placeholder="Kakao"
                      variant="filled"
                      color="secondary"
                      maxLength={50}
                      minLength={2}
                      value={contact?.kakao}
                      onChange={(e) =>
                        setContact({ ...contact, kakao: e.target.value })
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
                  setEditContact(false);
                  setContact(
                    profile?.contact || {
                      email: "",
                      phone: "",
                      whatsapp: "",
                      line: "",
                      skype: "",
                      wechat: "",
                      qq: "",
                      kakao: "",
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
    </EditContactStyles>
  );
};
export default React.memo(EditContact);
