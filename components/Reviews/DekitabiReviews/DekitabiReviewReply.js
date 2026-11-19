import { DekitabiReviewReplyStyles } from "./styles/DekitabiReviewReplyStyles";
import React, { useState, useRef, useEffect } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  deleteField,
} from "firebase/firestore/lite";
import Image from "next/image";
import Avatar from "../../UI/Avatar";
import dayjs from "dayjs";
const DekitabiReviewReply = ({
  t,
  guide,
  reviewGuideId,
  reviewItineraryId,
  reviewId,
  reviewReply,
  user,
  activity,
  profile,
}) => {
  const replyRef = useRef();
  const [reply, setReply] = useState("");
  const [replyMsg, setReplyMsg] = useState(reviewReply ? reviewReply : "");
  const [showReply, setShowReply] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guideData, setGuideData] = useState();
  const getGuide = async () => {
    if (guide) {
      const guideRef = doc(getFirestore(), "users", reviewGuideId);
      const guideSnap = await getDoc(guideRef);
      setGuideData(guideSnap.data());
    } else {
      const itineraryRef = doc(
        getFirestore(),
        "itineraries",
        reviewItineraryId
      );
      const itinerarySnap = await getDoc(itineraryRef);
      const itineraryData = itinerarySnap.data();
      const guideRef = doc(getFirestore(), "users", itineraryData?.createdBy);
      const guideSnap = await getDoc(guideRef);
      setGuideData(guideSnap.data());
    }
  };
  useEffect(() => {
    if (!activity) {
      getGuide();
    } else {
      setGuideData({ ...profile });
    }
  }, []);
  const sendReply = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    if (reply?.length < 1) {
      setError(true);
      setLoading(false);
    } else {
      const reviewRef = doc(
        getFirestore(),
        activity ? "activityReviews" : "reviews",
        reviewId
      );
      setReplyMsg({
        message: reply,
        createdAt: new Date().getTime(),
      });
      updateDoc(reviewRef, {
        reply: {
          message: reply,
          createdAt: new Date().getTime(),
        },
      })
        .then(() => {
          setReply("");
          setShowReply(false);
          setError(false);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  };
  const removeReply = () => {
    const reviewRef = doc(
      getFirestore(),
      activity ? "activityReviews" : "reviews",
      reviewId
    );
    setReplyMsg("");
    updateDoc(reviewRef, {
      reply: deleteField(),
    })
      .then(() => {
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <DekitabiReviewReplyStyles>
      {!replyMsg ? (
        <>
          {user?.uid &&
            ((!activity && guideData?.uid === user?.uid) ||
              (activity && guideData?.shopId === user?.uid)) && (
              <>
                {!showReply ? (
                  <button
                    className="normal-button"
                    onClick={() => {
                      replyRef.current.focus();
                      setShowReply(true);
                    }}
                  >
                    <Image
                      height={20}
                      width={20}
                      src="/img/icon-reply.svg"
                      alt="reply"
                    ></Image>
                    {t("reply")}
                  </button>
                ) : (
                  <button
                    className="normal-button"
                    onClick={() => {
                      setError(false);
                      setReply("");
                      setLoading(false);
                      setShowReply(false);
                    }}
                  >
                    {t("hide")}
                  </button>
                )}
                <div className={`${showReply ? "show" : ""} reply`}>
                  <form>
                    <textarea
                      ref={replyRef}
                      value={reply}
                      placeholder={t("typeYourMessage")}
                      onChange={(e) => setReply(e.target.value)}
                      maxLength={1000}
                    ></textarea>
                    <p className="review-counter">
                      {1000 - reply?.length} {t("charRemaining")}
                    </p>
                    <div className="submit-button">
                      {loading ? (
                        <div className="normal-button submit-spinner">
                          <Image
                            src="/img/icon-spinner.svg"
                            height={40}
                            width={40}
                            alt="icon-spinner"
                          />
                        </div>
                      ) : (
                        <button
                          className="normal-button"
                          onClick={(e) => sendReply(e)}
                        >
                          {t("send")}
                        </button>
                      )}
                      {error && (
                        <p className="error-message">
                          <Image
                            height={20}
                            width={20}
                            src="/img/icon-alert.svg"
                            alt="alert"
                          ></Image>
                          {t("errorMsg")}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </>
            )}
        </>
      ) : (
        <div className="reply-message">
          <div className="reply-message-header">
            <div className="reply-header-name">
              <Avatar
                width={30}
                height={30}
                src={
                  guideData?.avatar
                    ? guideData?.avatar
                    : guideData?.photos?.length > 0
                    ? guideData?.photos[0]
                    : "/img/avatar.png"
                }
              />
              <p className="reply-name">
                {guideData?.firstname ? (
                  <>
                    {guideData?.firstname} {guideData?.lastname}
                  </>
                ) : (
                  <>
                    {guideData?.shopId ? guideData?.name : guideData?.username}
                  </>
                )}
              </p>
            </div>
            <div className="reply-header-details">
              <p className="reply-message-header-createdAt">
                {dayjs(replyMsg.createdAt).format("MM/DD/YYYY")}
              </p>
              {user?.uid &&
                ((!activity && guideData?.uid === user?.uid) ||
                  (activity && guideData?.shopId === user?.uid)) && (
                  <button
                    type="button"
                    onClick={() => removeReply()}
                    className="reply-message-header-createdAt remove"
                  >
                    {t("remove")}
                  </button>
                )}
            </div>
          </div>
          {replyMsg.message}
        </div>
      )}
    </DekitabiReviewReplyStyles>
  );
};
export default React.memo(DekitabiReviewReply);
