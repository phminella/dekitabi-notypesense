// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import { ItineraryStatsStyles } from "./styles/ItineraryStatsStyles";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import { setShowLogin } from "../../../store/appSlice";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ItineraryCreatedBy from "./ItineraryCreatedBy";
import shortNumbers from "../../../lib/shortNumbers";
import ItinerarySavePublish from "./ItinerarySavePublish";
import {
  doc,
  getDoc,
  getFirestore,
  deleteDoc,
  updateDoc,
  increment,
  setDoc,
  DocumentData,
} from "firebase/firestore/lite";
import { useDispatch } from "react-redux";
import useSendNotificationEmail from "../../../lib/useSendNotificationEmail";
import useItinerary from "../../../lib/useItinerary";
import useDate from "../../../lib/useDate";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryTime, ItineraryError } from "../../../types/itinerary";

const ShareButtons = dynamic(() => import("../../UI/ShareButtons"), { ssr: false });

interface ItineraryStatsProps {
  itinerary: Itinerary;
  itineraryUrl: string;
  itineraryId: string;
  itineraryPublished?: boolean;
  itineraryStatus: boolean;
  itineraryRatingScore?: number;
  itineraryRatingCounter?: number;
  itineraryCreator?: User;
  itineraryName?: string;
  itineraryLikesCounter?: number;
  itineraryViews?: number;
  itineraryDescription?: string;
  t: (key: string, options?: any) => string;
  itineraryCreatedBy: string;
  user: User;
  hasItinerary: (id: string) => boolean;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  setShowReviews: (show: string | boolean) => void;
  commentsCounter: number;
  creator: User | null;
  setCreator: (creator: User | null) => void;
  itineraryAttractions: Attraction[];
  language: LanguageOption;
  itineraryTime: ItineraryTime;
  errors: ItineraryError[];
  setPublished: (pub: boolean) => void;
  setUnpublished: (unpub: boolean) => void;
  setSaved: (saved: boolean) => void;
}

const ItineraryStats = ({
  itinerary,
  itineraryUrl,
  itineraryId,
  itineraryPublished,
  itineraryStatus,
  itineraryRatingScore,
  itineraryRatingCounter = 0,
  itineraryCreator,
  itineraryName = "",
  itineraryLikesCounter = 0,
  itineraryViews,
  itineraryDescription,
  t,
  itineraryCreatedBy,
  user,
  hasItinerary,
  updateItineraryHandler,
  setShowReviews,
  commentsCounter,
  creator,
  setCreator,
  itineraryAttractions,
  language,
  itineraryTime,
  errors,
  setPublished,
  setUnpublished,
  setSaved,
}: ItineraryStatsProps) => {
  const dispatch = useDispatch();
  const { send } = useSendNotificationEmail();
  const { toTime } = useDate();
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { saveItinerary } = useItinerary();
  const [likesCounter, setLikesCounter] = useState(itineraryLikesCounter);
  const shareRef = useRef<HTMLDivElement>(null);

  const isLiked = useCallback(async () => {
    if (!user?.uid) return false;
    const dbLiked = await getDoc(
      doc(getFirestore(), "itineraries_likes", `${user.uid}${itineraryId}`)
    );
    const exists = dbLiked.exists();
    setLiked(exists);
    return exists;
  }, [user?.uid, itineraryId]);

  const handleGeneratePDF = async () => {
    setPrinting(true);
    const detectLanguage = (text: string) => {
      if (!text) return undefined;
      const regexMap: Record<string, RegExp> = {
        ja: /[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\uFF66-\uFF9D\u4E00-\u9FFF]/,
        ko: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/,
        th: /[\u0E00-\u0E7F]/,
        vi: /[ăâđêôơưĂÂĐÊÔƠƯàáảãạầấẩẫậằắẳẵặèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i,
      };
      const simplifiedOnly = /[妈爱国车门书汉话听气鸟马鱼]/;
      const traditionalOnly = /[媽愛國車門書漢話聽氣鳥馬魚]/;
      for (const [lang, regex] of Object.entries(regexMap)) {
        if (regex.test(text)) return lang;
      }
      if (traditionalOnly.test(text)) return "zh-TW";
      if (simplifiedOnly.test(text)) return "zh-CN";
      if (/[\u4E00-\u9FFF]/.test(text)) return "zh-TW";
      return undefined;
    };

    function detectLanguages(text: string) {
      if (!text) return [];
      const languages: Record<string, boolean> = {};
      const regexMap: Record<string, RegExp> = {
        ja: /[\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF\uFF66-\uFF9D\u4E00-\u9FFF]/,
        ko: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/,
        th: /[\u0E00-\u0E7F]/,
        vi: /[ăâđêôơưĂÂĐÊÔƠƯàáảãạầấẩẫậằắẳẵặèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i,
      };
      const simplifiedOnly = /[妈爱国车门书汉话听气鸟马鱼]/;
      const traditionalOnly = /[媽愛國車門書漢話聽氣鳥馬魚]/;
      if (traditionalOnly.test(text)) languages["zh-TW"] = true;
      else if (simplifiedOnly.test(text)) languages["zh-CN"] = true;
      else if (/[\u4E00-\u9FFF]/.test(text)) languages["zh"] = true;
      for (const [lang, regex] of Object.entries(regexMap)) {
        if (regex.test(text)) languages[lang] = true;
      }
      return Object.keys(languages);
    }

    try {
      const { jsPDF } = await import("jspdf");
      const QRCode = (await import("qrcode")).default;
      const pdfDoc = new jsPDF();
      let font = "Poppins";
      let languages = Array.from(
        new Set([
          ...detectLanguages(itinerary?.name || ""),
          ...detectLanguages(itinerary?.notes || itinerary?.description || ""),
        ])
      );
      if (
        !languages.includes(language?.code || "") &&
        ["th", "vi", "ja", "ko", "zh-CN", "zh-TW"].includes(language?.code || "")
      ) {
        languages = Array.from(new Set([...languages, language?.code!]));
      }

      const uploadFont = async (fontLang: string) => {
        const fontUrl =
          fontLang === "ja" || fontLang === "vi"
            ? "/fonts/noto-sans-regular-ja.ttf"
            : fontLang === "ko"
            ? "/fonts/noto-sans-regular-ko.ttf"
            : fontLang === "th"
            ? "/fonts/noto-sans-regular-th.ttf"
            : fontLang === "zh-CN"
            ? "/fonts/noto-sans-regular-zh-cn.ttf"
            : "/fonts/noto-sans-regular-zh-tw.ttf";
        const fontResponse = await fetch(fontUrl);
        const fontBuffer = await fontResponse.arrayBuffer();
        const fontBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve((reader.result as string).split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(new Blob([fontBuffer]));
        });
        pdfDoc.addFileToVFS(`NotoSans-Regular-${fontLang}.ttf`, fontBase64);
        pdfDoc.addFont(
          `NotoSans-Regular-${fontLang}.ttf`,
          `Noto Sans-${fontLang}`,
          "normal"
        );
      };

      await Promise.all(languages.map((lang) => uploadFont(lang)));
      const marginTop = 15;
      const marginLeft = 15;
      const pageWidth = pdfDoc.internal.pageSize.getWidth();
      const pageHeight = pdfDoc.internal.pageSize.getHeight();
      const usableWidth = pageWidth - marginLeft * 2;

      const logoUrl = "/img/logo.png";
      pdfDoc.addImage(logoUrl, "PNG", marginLeft, marginTop, 50, 15.5);
      pdfDoc.setFontSize(20);
      const nameLang = detectLanguage(itinerary?.name || "");
      font = nameLang ? `Noto Sans-${nameLang}` : font;
      pdfDoc.setFont(font, font === "Poppins" ? "bold" : "normal");
      pdfDoc.setTextColor(32, 103, 187);
      pdfDoc.text(itinerary?.name || "", marginLeft, marginTop + 25);

      let y = marginTop + 35;
      const padding = 3;
      const infoBoxHeight = 44;
      pdfDoc.setDrawColor(200);
      pdfDoc.setLineWidth(0.5);
      pdfDoc.roundedRect(marginLeft, y, usableWidth, infoBoxHeight, 2, 2);
      font = ["th", "vi", "ja", "ko", "zh-CN", "zh-TW"].includes(language?.code || "")
        ? `Noto Sans-${language?.code}`
        : "Poppins";
      pdfDoc.setFont(font, "normal");
      pdfDoc.setFontSize(14);
      pdfDoc.setTextColor(0, 0, 0);
      let innerY = y + padding + 7;
      const lineHeight = 7;
      pdfDoc.text(`${t("date")}: ${itinerary?.date}`, marginLeft + padding, innerY);
      innerY += lineHeight;
      pdfDoc.text(`${t("startTime")}: ${itinerary?.startTime}`, marginLeft + padding, innerY);
      innerY += lineHeight;
      pdfDoc.text(
        `${t("meetingPlace")}: ${
          (typeof itinerary?.meetingPlace === 'object' && itinerary.meetingPlace)
            ? ((itinerary.meetingPlace.translatedName as Record<string, string>)?.[language.code || "en"] ?? itinerary.meetingPlace.name)
            : ((itineraryAttractions[0]?.translatedName as Record<string, string>)?.[language?.code || "en"] ?? itineraryAttractions[0]?.name)
        }`,
        marginLeft + padding,
        innerY
      );
      innerY += lineHeight;
      pdfDoc.text(
        `${t("endPlace")}: ${
          (typeof itinerary?.endPlace === 'object' && itinerary.endPlace)
            ? ((itinerary.endPlace.translatedName as Record<string, string>)?.[language.code || "en"] ?? itinerary.endPlace.name)
            : ((itineraryAttractions[itineraryAttractions?.length - 1]?.translatedName as Record<string, string>)?.[language?.code || "en"] ?? itineraryAttractions[itineraryAttractions?.length - 1]?.name)
        }`,
        marginLeft + padding,
        innerY
      );
      if (itinerary?.guideData && typeof itinerary.guideData === 'object' && itinerary.guideData.firstname) {
        innerY += lineHeight;
        const guideName = `${itinerary.guideData.firstname} ${
          itinerary.guideData.lastname ?? ""
        }`;
        pdfDoc.text(`${t("guide")}: ${guideName}`, marginLeft + padding, innerY);
      }

      y += infoBoxHeight + 10;
      if (font === "Poppins") pdfDoc.setFont(font, "bold");
      pdfDoc.setFontSize(15);
      pdfDoc.text(t("itinerary"), marginLeft, y);
      y += 5;

      pdfDoc.setFillColor(240, 240, 240);
      pdfDoc.rect(marginLeft, y, usableWidth, 8, "F");
      pdfDoc.text("Attraction", marginLeft + 3, y + 6);
      pdfDoc.text("Time", pageWidth - 50, y + 6);
      y += 10;

      pdfDoc.setFont(font, "normal");
      itineraryAttractions.forEach((attraction, i) => {
        if (i === 0 && (itinerary?.meetingPlace as Attraction)?.name) {
          const name =
            ((itinerary?.meetingPlace as Attraction)?.translatedName as Record<string, string>)?.[language.code || "en"] ??
            (itinerary?.meetingPlace as Attraction)?.name;
          pdfDoc.setFillColor(255, 255, 255);
          pdfDoc.rect(marginLeft, y, usableWidth, 8, "F");
          pdfDoc.text(name, marginLeft + 3, y + 6);
          pdfDoc.text(itinerary?.startTime || "", pageWidth - 50, y + 6);
          y += 10;
        }
        const name = (attraction.translatedName as Record<string, string>)?.[language?.code || "en"] ?? attraction.name;
        const arrival = toTime(itineraryTime?.arrivalDepartureTime[i]?.arrival);
        const departure = toTime(itineraryTime?.arrivalDepartureTime[i]?.departure);
        const timeRange = `${arrival} - ${departure}`;
        pdfDoc.setFillColor(255, 255, 255);
        pdfDoc.rect(marginLeft, y, usableWidth, 8, "F");
        pdfDoc.text(
          `${name} (${
            (itineraryTime?.arrivalDepartureTime?.[i]?.departure || 0) -
            (itineraryTime?.arrivalDepartureTime?.[i]?.arrival || 0)
          }${t("min")})`,
          marginLeft + 3,
          y + 6
        );
        pdfDoc.text(timeRange, pageWidth - 50, y + 6);
        y += 10;

        let lunchIndex = (itinerary?.meetingPlace as Attraction)?._geoloc ? i + 1 : i;
        if (itinerary?.lunch === lunchIndex) {
          const arrivalLunch = toTime(itineraryTime?.arrivalDepartureTime?.[i]?.departure || 0);
          const departureLunch = toTime((itineraryTime?.arrivalDepartureTime?.[i]?.departure || 0) + 60);
          pdfDoc.setFillColor(255, 255, 255);
          pdfDoc.rect(marginLeft, y, usableWidth, 8, "F");
          pdfDoc.text(`${t("lunchBreak")} (60${t("min")})`, marginLeft + 3, y + 6);
          pdfDoc.text(`${arrivalLunch} - ${departureLunch}`, pageWidth - 50, y + 6);
          y += 10;
        }

        if (i === itineraryAttractions?.length - 1 && typeof itinerary?.endPlace === 'object' && itinerary.endPlace?.name) {
          const endName =
            ((itinerary?.endPlace as Attraction)?.translatedName as Record<string, string>)?.[language.code || "en"] ??
            (itinerary?.endPlace as Attraction)?.name;
          pdfDoc.setFillColor(255, 255, 255);
          pdfDoc.rect(marginLeft, y, usableWidth, 8, "F");
          pdfDoc.text(endName, marginLeft + 3, y + 6);
          pdfDoc.text(
            toTime(itineraryTime?.arrivalDepartureTime[i + 1]?.arrival),
            pageWidth - 50,
            y + 6
          );
          y += 10;
        }
      });

      y += 10;
      const notes = itinerary?.notes || itinerary?.description;
      if (notes && notes.length > 0) {
        const notesLang = detectLanguage(notes);
        font = notesLang ? `Noto Sans-${notesLang}` : "Poppins";
        pdfDoc.setFont(font, "normal");
        pdfDoc.setFontSize(13);
        const splitNotes = pdfDoc.splitTextToSize(`${notes}`, usableWidth - 6);
        const lineHeightNotes = 7;
        const notesHeight = splitNotes.length * lineHeightNotes;
        if (y + notesHeight + 60 > pageHeight) {
          pdfDoc.addPage();
          y = marginTop;
        }
        if (font === "Poppins") pdfDoc.setFont(font, "bold");
        pdfDoc.setFontSize(15);
        pdfDoc.text(t("notes"), marginLeft, y);
        y += 5;
        pdfDoc.setDrawColor(200);
        pdfDoc.roundedRect(marginLeft, y, usableWidth, notesHeight + 10, 2, 2);
        pdfDoc.setFont(font, "normal");
        pdfDoc.setFontSize(13);
        pdfDoc.text(splitNotes, marginLeft + 3, y + 7);
        y += notesHeight + 15;
      }

      const qrDataUrl = await QRCode.toDataURL(
        `https://www.dekitabi.com/itinerary/${itinerary?.url || itinerary?.id}`
      );
      if (y + 40 > pageHeight) {
        pdfDoc.addPage();
        y = marginTop;
      }
      pdfDoc.addImage(qrDataUrl, "PNG", pageWidth - 60, y, 40, 40);
      const fileName = `${(itinerary.name || "itinerary").replace(/[\\/:*?"<>|]/g, "")}-${Math.random().toString(36).substring(2, 6).toUpperCase()}.pdf`;
      pdfDoc.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setPrinting(false);
    }
  };

  const likeItinerary = async () => {
    if (user?.uid) {
      const alreadyLiked = await isLiked();
      if (!alreadyLiked) {
        await setDoc(
          doc(getFirestore(), "itineraries_likes", `${user.uid}${itineraryId}`),
          {
            userId: user.uid,
            itineraryId: itineraryId,
            createdBy: itineraryCreatedBy,
            createdAt: new Date().getTime(),
          }
        );
        const itRef = doc(getFirestore(), "itineraries", itineraryId);
        await updateDoc(itRef, { likesCounter: increment(1) });
        const userRef = doc(getFirestore(), "users", itineraryCreatedBy);
        await updateDoc(userRef, { likesCounter: increment(1) });
        if (itineraryPublished) {
          const tourRef = doc(getFirestore(), "tours", itineraryId);
          await updateDoc(tourRef, { likesCounter: increment(1) });
        }
        if ((itineraryCreator as any)?.notificationsSettings?.itineraryLike && itineraryCreator?.uid && user.uid !== itineraryCreator.uid) {
          send(
            "itineraryLike",
            itineraryCreator,
            { avatar: (user as User).avatar, username: (user as User).username },
            itineraryUrl || itineraryId,
            itineraryName
          );
        }
        setLikesCounter((prev) => prev + 1);
        setLiked(true);
      } else {
        await deleteDoc(doc(getFirestore(), "itineraries_likes", `${user.uid}${itineraryId}`));
        await updateDoc(doc(getFirestore(), "itineraries", itineraryId), { likesCounter: increment(-1) });
        await updateDoc(doc(getFirestore(), "users", itineraryCreatedBy), { likesCounter: increment(-1) });
        setLikesCounter((prev) => prev - 1);
        setLiked(false);
      }
    } else {
      dispatch(setShowLogin(true));
    }
  };

  useEffect(() => {
    if (user) {
      isLiked().then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, isLiked]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
        setShowShare(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shareRef]);

  useEffect(() => {
    setLikesCounter(itineraryLikesCounter);
  }, [itineraryId, itineraryLikesCounter]);

  useEffect(() => {
    if (saving && user?.uid) {
      saveItinerary(itinerary)
        .then(() => setSaving(false))
        .catch((err) => {
          console.error(err);
          setSaving(false);
        });
    }
  }, [saving, user?.uid, saveItinerary, itinerary]);

  return (
    <ItineraryStatsStyles>
      {loading && <Skeleton variant="rounded" width={"100%"} height={71} />}
      <div className={`itinerary-stats-wrapper ${loading ? "hide" : ""}`}>
        {itineraryCreatedBy !== "8WbH8h0PapfvEki8HX0YU3eTDmF3" && (
          <ItineraryCreatedBy
            t={t}
            itineraryCreatedBy={itineraryCreatedBy}
            user={user}
            hasItinerary={hasItinerary}
            itineraryId={itineraryId}
            updateItineraryHandler={updateItineraryHandler}
            setLoading={setLoading}
            creator={creator}
            setCreator={setCreator}
          />
        )}
        <div className="itinerary-stats">
          {!itineraryStatus && (
            <>
              <div className="stats">
                <Image className="stats-icon" height={23} width={23} src="/img/icon-stats.svg" alt="views" />
                {itineraryViews || 0}
              </div>
              {itineraryRatingCounter > 0 && (
                <button className="stats-button" onClick={() => setShowReviews("reviews")}>
                  <Image height={31} width={31} src="/img/icon-star2.svg" alt="star" className="star-icon" />
                  {itineraryRatingScore ? Number(itineraryRatingScore).toFixed(1) : ""}
                </button>
              )}
              <button className="stats-button" onClick={likeItinerary}>
                <Image
                  className="heart-icon"
                  height={31}
                  width={31}
                  src={liked ? "/img/icon-heart-filled.svg" : "/img/icon-heart.svg"}
                  alt="heart"
                />
                {shortNumbers(likesCounter)}
              </button>
              <button disabled={printing} className="stats-button" onClick={handleGeneratePDF}>
                <Image
                  className="printer-icon"
                  height={31}
                  width={31}
                  src={printing ? "/img/icon-spinner.svg" : "/img/icon-printer.svg"}
                  alt="printer"
                />
              </button>
              <button className="stats-button" onClick={() => setShowShare(true)}>
                <Image className="share-icon" height={36} width={36} src="/img/icon-share3.svg" alt="share" />
              </button>
              {showShare && (
                <div className="share-itinerary" ref={shareRef}>
                  <ShareButtons url={`https://www.dekitabi.com/itinerary/${itineraryUrl || itineraryId}`} />
                </div>
              )}
            </>
          )}
          <ItinerarySavePublish
            itinerary={itinerary}
            itineraryId={itineraryId}
            user={user}
            itineraryTime={itineraryTime}
            t={t}
            itineraryAttractions={itineraryAttractions}
            updateItineraryHandler={updateItineraryHandler}
            errors={errors}
            setPublished={setPublished}
            setUnpublished={setUnpublished}
            setSaved={setSaved}
          />
          {itineraryCreatedBy !== user?.uid && (
            <button
              className="stats-button"
              disabled={saving}
              onClick={() => {
                if (user?.uid) {
                  saveItinerary(itinerary)
                    .then(() => setSaving(false))
                    .catch((err) => console.error(err));
                } else {
                  setSaving(true);
                  dispatch(setShowLogin(true));
                }
              }}
            >
              <Image className="save-icon" height={34} width={34} src="/img/icon-save2.svg" alt="save" />
            </button>
          )}
        </div>
      </div>
    </ItineraryStatsStyles>
  );
};

export default React.memo(ItineraryStats);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
