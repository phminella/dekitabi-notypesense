import { useState } from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
const AffiliateFAQQuestion: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="wrapper">
      <div
        className={`question ${show ? "showed" : ""}`}
        onClick={() => setShow(!show)}
      >
        <Image
          height={15}
          width={15}
          src="/img/icon-arrow-down.svg"
          alt="show-question"
        ></Image>
        {question}
      </div>
      <div
        className={`answer ${show ? "show" : ""}`}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(answer, {
            USE_PROFILES: { html: true },
          }),
        }}
      ></div>
    </div>
  );
};
export default AffiliateFAQQuestion;
