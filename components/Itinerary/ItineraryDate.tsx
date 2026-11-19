import { ItineraryDateStyles } from "./styles/ItineraryDateStyles";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Itinerary } from "../../types/itinerary";

const SingleDatePicker = dynamic<any>(
  () => import("react-dates").then((mod) => mod.SingleDatePicker),
  { ssr: false }
);
import "react-dates/initialize";
import moment from "moment";
import { useSelector, shallowEqual } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import DOMPurify from "isomorphic-dompurify";
dayjs.extend(utc);
dayjs.extend(timezone);
import { RootState } from "../../store/store";
import { User } from "../../types/user";
import { Attraction } from "../../types/attraction";

interface ItineraryDateProps {
  updateItineraryHandler: (data: Partial<Itinerary>) => void;
  itineraryMainDate: string;
  itineraryStartTime?: string;
  itineraryStatus: boolean;
  user: User;
  t: (key: string, options?: any) => string;
  fromGuides?: boolean;
  itineraryAttractions?: Attraction[];
  id?: string;
  searchFilters?: any;
  includeTransport?: boolean;
}

const ItineraryDate = ({
  updateItineraryHandler,
  itineraryMainDate,
  itineraryStartTime,
  itineraryStatus,
  user,
  t,
  fromGuides,
  itineraryAttractions,
  id,
  searchFilters,
  includeTransport,
}: ItineraryDateProps) => {
  const language = useSelector((state: RootState) => state.app.language, shallowEqual);
  const [itineraryTime, setItineraryTime] = useState<string>(itineraryStartTime || "09:00");
  const [itineraryDate, setItineraryDate] = useState<moment.Moment>(
    moment(itineraryMainDate || new Date(), "MM/DD/YYYY")
  );
  // const [attractionStates, setAttractionStates] = useState([]);
  const [dateInputFocus, setDateInputFocus] = useState(false);
  // const availableDates = useRef();
  const itineraryTimeRange = [
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];
  // const links = {
  //   東京都tokyo: `/s/Tokyo`,
  //   京都府kyoto: `/s/Kyoto-City`,
  //   大阪府osaka: `/s/Osaka-city`,
  //   奈良県nara: `/s/Nara-City`,
  //   愛知県aichi: `/s/Nagoya-city`,
  //   秋田県akita: `s/Akita-City`,
  //   青森県aomori: `/s/Aomori-City`,
  //   千葉県chiba: `/s/Chiba-City`,
  //   愛媛県ehime: `/s/Matsuyama-City`,
  //   福井県fukui: `/s/Fukui-City`,
  //   福岡県fukuoka: `/s/Fukuoka-City`,
  //   福島県fukushima: `/s/Fukushima-City`,
  //   岐阜県gifu: `/s/Takayama-City`,
  //   群馬県gunma: `/s/Maebashi-City`,
  //   広島県hiroshima: `/s/Hiroshima-city`,
  //   北海道hokkaido: `/s/Sapporo`,
  //   兵庫県hyogo: `/s/Himeji-City`,
  //   茨城県ibaraki: `/s/Mito-City`,
  //   石川県ishikawa: `/s/Kanazawa-City`,
  //   岩手県iwate: `/s/Morioka-City`,
  //   香川県kagawa: `/s/Takamatsu-City`,
  //   鹿児島県kagoshima: `/s/Kagoshima-City`,
  //   神奈川県kanagawa: `/s/Yokohama`,
  //   高知県kochi: `/s/Kochi-City`,
  //   熊本県kumamoto: `/s/Kumamoto-City`,
  //   三重県mie: `/s/Ise-City`,
  //   宮城県miyagi: `/s/Sendai-city`,
  //   宮崎県miyazaki: `/s/Miyazaki-City`,
  //   長野県nagano: `/s/Nagano-city`,
  //   長崎県nagasaki: `/s/Nagasaki-city`,
  //   新潟県niigata: `/s/Niigata-City`,
  //   大分県ota: `/s/Ota-City`,
  //   岡山県okayama: `/s/Okayama-City`,
  //   沖縄県okinawa: `/s/Naha-city`,
  //   佐賀県saga: `/s/Saga-City`,
  //   埼玉県saitama: `/s/Kawagoe-City`,
  //   滋賀県shiga: `/s/Otsu-City`,
  //   島根県shimane: `/s/Matsue-City`,
  //   静岡県shizuoka: `/s/Shizuoka-City`,
  //   栃木県tochigi: `/s/Nikko-City`,
  //   徳島県tokushima: `/s/Tokushima-City`,
  //   鳥取県tottori: `/s/Tottori-City`,
  //   富山県toyama: `/s/Toyama-City`,
  //   和歌山県wakayama: `/s/Wakayama-City`,
  //   山形県yamagata: `/s/Yamagata-City`,
  //   山口県yamaguchi: `/s/Yamaguchi-City`,
  //   山梨県yamanashi: `/s/Fujikawaguchiko-Town`,
  // };

  useEffect(() => {
    if (itineraryStartTime) {
      setItineraryTime(itineraryStartTime);
    }
    if (itineraryMainDate) {
      setItineraryDate(moment(itineraryMainDate, "MM/DD/YYYY"));
    }
  }, [itineraryStartTime, itineraryMainDate]);
  // useEffect(() => {
  //   if (attractionStates?.length > 0) {
  //     getMonthAvailability(
  //       dayjs(itineraryMainDate).month(),
  //       dayjs(itineraryMainDate).year()
  //     );
  //   }
  // }, [attractionStates]);
  // useEffect(() => {
  //   availableDates.current = {};
  //   getItineraryStates();
  // }, [id, itineraryAttractions]);
  // useEffect(() => {
  //   if (attractionStates?.length > 0 && dateInputFocus) {
  //     getMonthAvailability(
  //       dayjs(itineraryMainDate).month() === 11
  //         ? 0
  //         : dayjs(itineraryMainDate).month() + 1,
  //       dayjs(itineraryMainDate).month() === 11
  //         ? dayjs(itineraryMainDate).year() + 1
  //         : dayjs(itineraryMainDate).year()
  //     );
  //     getMonthAvailability(
  //       dayjs(itineraryMainDate).month() === 0
  //         ? 11
  //         : dayjs(itineraryMainDate).month() - 1,
  //       dayjs(itineraryMainDate).month() === 0
  //         ? dayjs(itineraryMainDate).year() - 1
  //         : dayjs(itineraryMainDate).year()
  //     );
  //   }
  // }, [dateInputFocus]);
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const daySize =
    typeof window === "undefined"
      ? 50
      : window.innerWidth <= 300
      ? 35
      : window.innerWidth <= 400
      ? 40
      : 50;
  return (
    <ItineraryDateStyles className="itinerary-date">
      <h2
        className={`${
          user?.guide === "true" ? "guide-title" : ""
        } itinerary-titles`}
      >
        {t("startTime")}
      </h2>
      {user && user?.guide !== "true" && !itineraryStatus && !fromGuides && (
        <div className="date-labels">
          <p>{t("date")}</p>
          <p>{t("startTime")}</p>
        </div>
      )}
      {!itineraryStatus ? (
        <form className={user?.guide === "true" ? "guide-time" : ""}>
          {(!user?.uid || user?.guide === "false") && (
            <div className="input-date-wrapper">
                <>
                <SingleDatePicker
                  withPortal={true}
                  numberOfMonths={1}
                  date={itineraryDate?.locale(language?.code)}
                  onDateChange={(date: moment.Moment | null) => {
                    setItineraryDate(date || moment());
                    updateItineraryHandler({
                      date: date?.format("MM/DD/YYYY"),
                    });
                  }}
                  focused={dateInputFocus}
                  onFocusChange={({ focused }: { focused: boolean }) => {
                    setDateInputFocus(focused);
                  }}
                  readOnly
                  isDayBlocked={(date: moment.Moment) => {
                    if (
                      dayjs(date.toDate())?.format("MM/DD/YYYY") ===
                      dayjs(new Date())?.format("MM/DD/YYYY")
                    ) {
                      return true;
                    }
                  }}
                  daySize={daySize}
                  id="itinerary-date"
                />
                </>
            </div>
          )}
          <div className="input-time-wrapper">
            <select
              name="itinerary-time"
              value={itineraryTime}
              onChange={(e) => {
                setItineraryTime(e.target.value);
                updateItineraryHandler({
                  startTime: e.target.value,
                });
              }}
            >
              {itineraryTimeRange?.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </form>
      ) : (
        <div className="booked-date">
          <p className="flex-wrapper-five">
            <Image
              height={17}
              width={17}
              src="/img/icon-calendar.svg"
              alt="login"
            />
            <b>{itineraryMainDate}</b>
          </p>
          <p className="flex-wrapper-five">
            <Image
              height={17}
              width={17}
              src="/img/icon-clock.svg"
              alt="login"
            />
            <b>{itineraryStartTime}</b>
          </p>
        </div>
      )}
    </ItineraryDateStyles>
  );
};
export default React.memo(ItineraryDate);
