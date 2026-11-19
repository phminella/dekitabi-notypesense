import { ItineraryCreatedByStyles } from "./styles/ItineraryCreatedByStyles";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import React, { useEffect, useCallback } from "react";
import isMobile from "../../../lib/isMobile";
import { User } from "../../../types/user";

interface ItineraryCreatedByProps {
  itineraryCreatedBy: string;
  itineraryId: string;
  t: (key: string) => string;
  user: User;
  hasItinerary: (id: string) => boolean;
  updateItineraryHandler: (data: any) => Promise<any>;
  creator: any;
  setCreator: (creator: any) => void;
  setLoading: (loading: boolean) => void;
}

const ItineraryCreatedBy = ({
  itineraryCreatedBy,
  itineraryId,
  t,
  user,
  hasItinerary,
  updateItineraryHandler,
  creator,
  setCreator,
}: ItineraryCreatedByProps) => {
  const db = getFirestore();

  const getCreator = useCallback(async () => {
    if (!itineraryCreatedBy || itineraryCreatedBy === "Guest") {
      setCreator("guest");
      return;
    }
    const docRef = doc(db, "users", itineraryCreatedBy);
    const docSnap = await getDoc(docRef);
    if (docSnap?.exists()) {
      const creatorData = docSnap?.data();
      setCreator({
        firstname: creatorData?.firstname,
        lastname: creatorData?.lastname,
        avatar: creatorData?.avatar,
        photos: creatorData?.photos,
        username: creatorData?.username,
        guide: creatorData?.guide,
        notificationsSettings: creatorData?.notificationsSettings,
        uid: creatorData?.uid,
        email: creatorData?.email,
        language: creatorData?.language,
      });
    } else {
      setCreator("guest");
    }
  }, [db, itineraryCreatedBy, setCreator]);

  useEffect(() => {
    if (itineraryCreatedBy) {
      if (typeof navigator !== "undefined") {
        if (!navigator.cookieEnabled) {
          return;
        }
      }
      if (
        (user?.uid !== itineraryCreatedBy && !hasItinerary(itineraryId)) ||
        !user?.uid
      ) {
        getCreator();
      } else {
        if (user?.uid !== itineraryCreatedBy) {
          updateItineraryHandler({ createdBy: user?.uid });
        }
        setCreator({
          firstname: (user as any)?.firstname,
          lastname: (user as any)?.lastname,
          avatar: (user as any)?.avatar,
          photos: (user as any)?.photos,
          username: (user as any)?.username,
          guide: user?.guide,
        });
      }
    }
  }, [
    itineraryCreatedBy,
    user,
    hasItinerary,
    itineraryId,
    getCreator,
    updateItineraryHandler,
    setCreator,
  ]);

  if (!creator) return null;

  return (
    <ItineraryCreatedByStyles>
      <div className="itinerary-user">
        {itineraryCreatedBy !== "Guest" && creator !== "guest" && (
          <Link
            prefetch={false}
            href={`/${creator?.username}`}
            target={isMobile() ? "_self" : "_blank"}
            rel="noreferrer"
          >
            <Avatar
              sx={{
                width: 50,
                height: 50,
              }}
              alt="avatar"
              src={
                creator?.avatar !== "/img/avatar.png"
                  ? creator?.avatar
                  : (creator?.photos?.length ?? 0) > 0
                  ? creator?.photos[0]
                  : "/img/avatar.png"
              }
            />
            <div className="user-info">
              {creator?.firstname ? (
                <span>
                  {creator?.firstname} {creator?.lastname}
                </span>
              ) : (
                <span>{creator?.username}</span>
              )}
              <br />
              <span className="normal-button">{t("viewProfile")}</span>
            </div>
          </Link>
        )}
        {(itineraryCreatedBy === "Guest" || creator === "guest") && (
          <div className="username-guest">
            <Avatar
              sx={{
                width: 50,
                height: 50,
              }}
              alt="avatar"
            />
            <div className="guest-text">{t("guest")}</div>
          </div>
        )}
      </div>
    </ItineraryCreatedByStyles>
  );
};
export default React.memo(ItineraryCreatedBy);
