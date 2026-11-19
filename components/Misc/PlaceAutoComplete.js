import { PlaceAutoCompleteStyles } from "./styles/PlaceAutoCompleteStyles";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect, useCallback } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAutocompletePredictions } from "../../lib/googlePlaceUtils";
const PlaceAutoComplete = ({
  input,
  setInput,
  t,
  inputPlaceholder,
  location,
  language,
  setPlace,
  disabled,
}) => {
  const [autocomplete, setAutocomplete] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(true);
  const [loadingAutocomplete, setLoadingAutocomplete] = useState(false);
  const generateAutocomplete = useCallback(
    async (place) => {
      try {
        const functions = getFunctions(undefined, "asia-northeast1");
        const getAutocomplete = httpsCallable(functions, "getAutocomplete");
        const response = await getAutocomplete({
          place: place ? place : input,
          language,
          location,
        });
        setAutocomplete(getAutocompletePredictions(response));
        setLoadingAutocomplete(false);
      } catch (err) {
        console.log(err);
        setLoadingAutocomplete(false);
      }
    },
    [input, language, location]
  );
  useEffect(() => {
    if (input?.length > 2) {
      setLoadingAutocomplete(true);
      const timeOutId = setTimeout(() => {
        generateAutocomplete();
      }, 700);
      return () => clearTimeout(timeOutId);
    }
  }, [generateAutocomplete, input]);
  return (
    <PlaceAutoCompleteStyles>
      <input
        type="text"
        name="attraction"
        id="attraction"
        placeholder={t(inputPlaceholder)}
        value={input}
        autoComplete="off"
        onChange={(e) => {
          setInput(e.target.value);
          if (!showAutocomplete) {
            setShowAutocomplete(true);
          }
        }}
        minLength={2}
        maxLength={30}
        disabled={disabled}
        required
      />
      {showAutocomplete &&
        autocomplete &&
        input?.length > 2 &&
        !loadingAutocomplete && (
          <div className="autocomplete">
            {autocomplete?.length < 1 ? (
              <div className="result">{t("noResults")}</div>
            ) : (
              <>
                {autocomplete?.map((item, i) => (
                  <button
                    onClick={() => {
                      if (!item?.place_id) {
                        return;
                      }
                      setInput(
                        item?.structured_formatting?.main_text ||
                          item?.description ||
                          ""
                      );
                      setShowAutocomplete(false);
                      setPlace(item.place_id, item);
                    }}
                    type="button"
                    className="result"
                    key={i}
                  >
                    <p className="result-name">
                      {item?.structured_formatting?.main_text ||
                        item?.description ||
                        t("noResults")}
                    </p>
                    <p className="result-address">
                      {item?.structured_formatting?.secondary_text || ""}
                    </p>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      {loadingAutocomplete && showAutocomplete && input?.length > 2 && (
        <div className="autocomplete">
          <div className="result" style={{ marginBottom: "5px" }}>
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "5px" }}
              width={"100%"}
              height={17}
            />
            <Skeleton variant="rounded" width={"100%"} height={10} />
          </div>
          <div className="result" style={{ marginBottom: "5px" }}>
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "5px" }}
              width={"100%"}
              height={17}
            />
            <Skeleton variant="rounded" width={"100%"} height={10} />
          </div>
          <div className="result" style={{ marginBottom: "5px" }}>
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "5px" }}
              width={"100%"}
              height={17}
            />
            <Skeleton variant="rounded" width={"100%"} height={10} />
          </div>
          <div className="result" style={{ marginBottom: "5px" }}>
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "5px" }}
              width={"100%"}
              height={17}
            />
            <Skeleton variant="rounded" width={"100%"} height={10} />
          </div>
          <div className="result">
            <Skeleton
              variant="rounded"
              style={{ marginBottom: "5px" }}
              width={"100%"}
              height={17}
            />
            <Skeleton variant="rounded" width={"100%"} height={10} />
          </div>
        </div>
      )}
    </PlaceAutoCompleteStyles>
  );
};
export default PlaceAutoComplete;
