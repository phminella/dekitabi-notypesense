import { ShopEditAccessStyles } from "./styles/ShopEditAccessStyles";
import { ShopEditStringStyles } from "./styles/ShopEditStringStyles";
import { ShopOpeningHoursStyles } from "../Details/styles/ShopOpeningHoursStyles";
import NoInformation from "../../Activities/NoInformation";
import EditInformationButton from "../../Activities/EditInformationButton";
import { useState } from "react";
import Image from "next/image";
const ShopEditCancellationPolicy = ({
  field,
  shopProfile,
  updateProfile,
  t,
  maxChar = 3,
  showModal,
}) => {
  const [edit, setEdit] = useState(showModal === field ? true : false);
  const [input, setInput] = useState(shopProfile?.cancellationPolicy);
  const dayOptions = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const feeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfile(
      field,
      input.sort(function (a, b) {
        return a.days - b.days;
      })
    ).then(() => {
      setEdit(false);
    });
  };
  return (
    <ShopEditStringStyles>
      <ShopEditAccessStyles>
        <p className="profile-field">
          {t(`cancelationPolicy`)}
          {!edit && shopProfile[field]?.length > 0 && (
            <EditInformationButton setShowModal={setEdit} field={field} />
          )}
        </p>
        <p className="subtitle">{t("shops:cancelationPolicyMsg")}</p>
        {!edit && shopProfile[field]?.length > 0 && (
          <div className="access cancellation-policy">
            <ShopOpeningHoursStyles>
              <ul className="opening-hours-wrapper">
                {shopProfile["cancellationPolicy"]?.map((policy, i) => (
                  <li className="opening-hours" key={i}>
                    <div className="days">
                      {t("shops:cancellationPolicyDays", {
                        days:
                          i === 0 && policy?.days > 0
                            ? `0 ~ ${policy?.days}`
                            : i > 0 &&
                              shopProfile?.cancellationPolicy[i - 1]?.days +
                                1 !==
                                policy?.days
                            ? `${
                                shopProfile?.cancellationPolicy[i - 1]?.days + 1
                              } ~ ${policy?.days}`
                            : policy?.days,
                      })}
                    </div>
                    <div className="fee">{policy?.fee}%</div>
                  </li>
                ))}
                <li className="opening-hours">
                  <div className="days">
                    {t("shops:cancellationPolicyDaysOrMore", {
                      days:
                        shopProfile["cancellationPolicy"][
                          shopProfile["cancellationPolicy"]?.length - 1
                        ]?.days + 1,
                    })}
                  </div>
                  <div className="fee">0%</div>
                </li>
              </ul>
            </ShopOpeningHoursStyles>
          </div>
        )}
        {!edit && shopProfile[field]?.length === 0 && (
          <NoInformation
            text={t(
              `shops:no${
                String(field).charAt(0).toUpperCase() + String(field).slice(1)
              }`
            )}
            add={setEdit}
            t={t}
          />
        )}
        {edit && (
          <div className="edit-access edit-cancellation-policy">
            <form onSubmit={handleSubmit}>
              {input?.map((data, i) => (
                <div className="mui-input-wrapper" key={i}>
                  <div className="days-select">
                    <select
                      name={`${field}day${i}`}
                      required
                      placeholder={t(`shops:days`)}
                      value={input[i]?.days}
                      id={`${field}day${i}`}
                      autoFocus
                      onChange={(e) => {
                        let tempInput = [...input];
                        tempInput[i] = {
                          ...tempInput[i],
                          days: Number(e.target.value),
                        };
                        setInput(tempInput);
                      }}
                    >
                      {dayOptions.map((option, i) => (
                        <option value={option} key={i}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <p>{t("days")}</p>
                  </div>
                  <div className="days-select">
                    <select
                      name={`${field}fee${i}`}
                      required
                      placeholder={t(`shops:fee`)}
                      value={input[i]?.fee}
                      id={`${field}fee${i}`}
                      onChange={(e) => {
                        let tempInput = [...input];
                        tempInput[i] = {
                          ...tempInput[i],
                          fee: Number(e.target.value),
                        };
                        setInput(tempInput);
                      }}
                    >
                      {feeOptions.map((option, i) => (
                        <option value={option} key={i}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <p>%</p>
                  </div>
                  <button
                    type="button"
                    className="access-button"
                    onClick={() => {
                      let tempInput = [...input];
                      tempInput.splice(i, 1);
                      setInput(tempInput);
                    }}
                  >
                    <Image
                      src={`/img/icon-close.svg`}
                      height={15}
                      width={15}
                      alt={"remove-access"}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </button>{" "}
                </div>
              ))}
              <button
                type="button"
                className="access-button"
                onClick={() => {
                  let tempInput = [...input];
                  tempInput?.push({ days: 0, fee: 100 });
                  setInput(tempInput);
                }}
              >
                <Image
                  src={`/img/icon-plus.svg`}
                  height={15}
                  width={15}
                  alt={"add-access"}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {t("shops:addMore")}
              </button>
              <div className="edit-buttons">
                <button
                  type="button"
                  className="link"
                  onClick={() => {
                    setInput([...shopProfile?.cancellationPolicy]);
                    setEdit(false);
                  }}
                >
                  {t("cancel")}
                </button>{" "}
                <button type="submit" className="normal-button">
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        )}
      </ShopEditAccessStyles>
    </ShopEditStringStyles>
  );
};
export default ShopEditCancellationPolicy;
