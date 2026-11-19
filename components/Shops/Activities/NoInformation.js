import { NoInformationStyles } from "./styles/NoInformationStyles";
import Image from "next/image";
const NoInformation = ({ text, example, add, t }) => {
  return (
    <NoInformationStyles>
      {example && (
        <p className="example">
          {t("ex")} {example}
        </p>
      )}
      <div className="message">
        <Image
          src="/img/icon-info2.svg"
          height={20}
          width={20}
          alt="edit-shop"
        />
        <p>
          {text}{" "}
          {add && (
            <button className="link" onClick={() => add(true)}>
              <p>{t("add")}</p>
            </button>
          )}
        </p>
      </div>
    </NoInformationStyles>
  );
};
export default NoInformation;
