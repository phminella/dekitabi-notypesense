import { ItineraryIncludeTransportStyles } from "./styles/ItineraryIncludeTransportStyles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ItineraryIncludeTransportProps {
  t: (key: string) => string;
  includeTransport: boolean;
  setIncludeTransport: (include: boolean) => void;
}

const ItineraryIncludeTransport = ({
  t,
  includeTransport,
  setIncludeTransport,
}: ItineraryIncludeTransportProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [infoRef]);

  return (
    <ItineraryIncludeTransportStyles className="include-transport">
      {showInfo && (
        <div className="include-transport-info" ref={infoRef}>
          <button className="close-button" onClick={() => setShowInfo(false)}>
            <Image
              height={15}
              width={15}
              src="/img/icon-close.svg"
              alt="close"
            />
          </button>
          <ul>
            <li>
              <div className="circle" />
              {t("includeTransportInfo1")}
            </li>
            <li>
              <div className="circle" />
              {t("includeTransportInfo2")}
            </li>
          </ul>
        </div>
      )}
      <FormControlLabel
        control={
          <Checkbox
            style={{
              transform: "scale(1.5)",
            }}
            checked={includeTransport}
            onChange={() => setIncludeTransport(!includeTransport)}
            sx={{
              color: "var(--pink)",
              "&.Mui-checked": {
                color: "var(--pink)",
              },
            }}
          />
        }
        label={t("includeTransport")}
      />
      <button onClick={() => setShowInfo(true)}>
        <Image
          height={20}
          width={20}
          src="/img/icon-info2.svg"
          alt="info"
        />
      </button>
    </ItineraryIncludeTransportStyles>
  );
};
export default React.memo(ItineraryIncludeTransport);
