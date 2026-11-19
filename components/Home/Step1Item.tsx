import Link from "next/link";
import HomeStep1Bg from "./HomeStep1Bg";
import { Prefecture } from "../../types/home";
import { Language } from "../../types/home";
import { TFunction } from "next-i18next";

interface Step1ItemProps {
  prefecture: Prefecture;
  t: TFunction;
  language: Language;
}

const Step1Item = ({ prefecture, t }: Step1ItemProps): JSX.Element => {
  return (
    <div className="step1-item">
      <Link prefetch={false} href={`/s/${prefecture?.url}`}>
        <HomeStep1Bg prefecture={prefecture.city.toLowerCase()} />
        {String(t(prefecture?.translatedCity["en"]))}
      </Link>
    </div>
  );
};

export default Step1Item;
