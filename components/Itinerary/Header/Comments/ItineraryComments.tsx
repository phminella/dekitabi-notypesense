import { ItineraryCommentsStyles } from "./styles/ItineraryCommentsStyles";
import dynamic from "next/dynamic";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import BasicModal from "../../../UI/BasicModal";
import React, { useCallback, useEffect, useState } from "react";
import ItineraryCommentsList from "./ItineraryCommentsList";
import DOMPurify from "isomorphic-dompurify";
import {
  setDoc,
  getFirestore,
  doc,
  updateDoc,
  increment,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore/lite";
import Spinner from "../../../UI/Spinner";
import { ItineraryReviewsStyles } from "./styles/ItineraryReviewsStyles";
import useSendNotificationEmail from "../../../../lib/useSendNotificationEmail";
import { User } from "../../../../types/user";

const DekitabiReviews = dynamic(() =>
  import("../../../Reviews/DekitabiReviews/DekitabiReviews")
);

interface ItineraryCommentsProps {
  t: (key: string, options?: any) => string;
  reviewsLength: number;
  itineraryId: string;
  itineraryName?: string;
  itineraryCreator?: any;
  itineraryUrl?: string;
  user: User;
  showReviews: string | boolean;
  setShowReviews: (show: string | boolean) => void;
  setCommentsCounter: (counter: number) => void;
  commentsCounter: number;
  itineraryPublished?: boolean;
}

const ItineraryComments = ({
  t,
  reviewsLength,
  itineraryId,
  itineraryName,
  itineraryCreator,
  itineraryUrl,
  user,
  showReviews,
  setShowReviews,
  setCommentsCounter,
  commentsCounter,
  itineraryPublished,
}: ItineraryCommentsProps) => {
  const [input, setInput] = useState("");
  const [tab, setTab] = useState(showReviews);
  const [hasMore, setHasMore] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [reply, setReply] = useState("");
  const [refreshComment, setRefreshComment] = useState("");
  const { send } = useSendNotificationEmail();

  useEffect(() => {
    if (tab === "comments") {
      const inputEl = document.getElementById("comment-input");
      if (inputEl) inputEl.focus();
    }
  }, [tab]);

  const getMoreComments = async () => {
    if (comments.length === 0) return;
    setLoadingMore(true);
    const lastComment = comments[comments.length - 1];
    const queryCursor = await getDoc(
      doc(getFirestore(), "comments", lastComment.commentId)
    );
    
    const q = query(
      collection(getFirestore(), "comments"),
      where("itineraryId", "==", itineraryId),
      where("reply", "==", false),
      orderBy("createdAt", "desc"),
      limit(6),
      startAfter(queryCursor)
    );
    
    const querySnapshot = await getDocs(q);
    let tempCommentsWithoutUsers: any[] = [];
    querySnapshot.forEach((data) => {
      tempCommentsWithoutUsers.push(data.data());
    });
    
    if (tempCommentsWithoutUsers.length === 6) {
      setHasMore(true);
      tempCommentsWithoutUsers.pop();
    } else {
      setHasMore(false);
    }
    
    const tempComments = await Promise.all(
      tempCommentsWithoutUsers.map(async (comment) => {
        const userRef = doc(getFirestore(), "users", comment.userId);
        const userSnap = await getDoc(userRef);
        const commentUser = userSnap.exists()
          ? {
              avatar: userSnap.data().avatar,
              username: userSnap.data().username,
            }
          : {
              avatar: "/img/avatar.png",
              username: t("guest"),
            };
        return {
          ...comment,
          user: commentUser,
        };
      })
    );
    
    setComments([...comments, ...tempComments]);
    setTimeout(() => {
      setLoadingMore(false);
    }, 500);
  };

  const getComments = useCallback(async () => {
    const q = query(
      collection(getFirestore(), "comments"),
      where("itineraryId", "==", itineraryId),
      where("reply", "==", false),
      orderBy("createdAt", "desc"),
      limit(6)
    );
    
    const querySnapshot = await getDocs(q);
    let tempCommentsWithoutUsers: any[] = [];
    querySnapshot.forEach((data) => {
      tempCommentsWithoutUsers.push(data.data());
    });
    
    if (tempCommentsWithoutUsers.length === 6) {
      setHasMore(true);
      tempCommentsWithoutUsers.pop();
    } else {
      setHasMore(false);
    }
    
    const tempComments = await Promise.all(
      tempCommentsWithoutUsers.map(async (comment) => {
        const userRef = doc(getFirestore(), "users", comment.userId);
        const userSnap = await getDoc(userRef);
        const commentUser = userSnap.exists()
          ? {
              avatar: userSnap.data().avatar,
              username: userSnap.data().username,
            }
          : {
              avatar: "/img/avatar.png",
              username: t("guest"),
            };
        return {
          ...comment,
          user: commentUser,
        };
      })
    );
    
    if (tempComments.length === 0) {
      setLoading(false);
    }
    setComments(tempComments);
  }, [itineraryId, t]);

  useEffect(() => {
    if (tab === "reviews") {
      setLoading(false);
    } else {
      getComments();
    }
  }, [itineraryId, tab, getComments]);

  const sendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setCommenting(true);
    let message = input;
    const commentId = `${itineraryId}${new Date().getTime()}`;
    
    const isReply = input.startsWith("@");
    
    await setDoc(doc(getFirestore(), "comments", commentId), {
      ...(isReply && { parentId: reply }),
      commentId,
      itineraryId,
      userId: user?.uid || "guest",
      message: input,
      createdAt: new Date().getTime(),
      likes: 0,
      reply: isReply,
    });
    
    await updateDoc(doc(getFirestore(), "itineraries", itineraryId), {
      commentsCounter: increment(1),
    });
    
    if (itineraryPublished) {
      await updateDoc(doc(getFirestore(), "tours", itineraryId), {
        commentsCounter: increment(1),
      });
    }
    
    if (
      itineraryCreator?.notificationsSettings?.itineraryComment &&
      user?.uid !== itineraryCreator?.uid
    ) {
      send(
        "itineraryComment",
        itineraryCreator,
        user?.uid
          ? { avatar: (user as any).avatar, username: (user as any).username }
          : "guest",
        itineraryUrl || itineraryId,
        itineraryName,
        message
      );
    }
    
    if (!isReply) {
      const newComment = {
        commentId,
        itineraryId,
        userId: user?.uid || "guest",
        message: input,
        createdAt: new Date().getTime(),
        likes: 0,
        user: {
          avatar: (user as any)?.avatar || "/img/avatar.png",
          username: (user as any)?.username || t("guest"),
        },
      };
      setComments([newComment, ...comments]);
    } else {
      setRefreshComment(reply);
    }
    
    setCommentsCounter(commentsCounter + 1);
    setInput("");
    setReply("");
    setCommenting(false);
  };

  return (
    <ItineraryCommentsStyles>
      <BasicModal showModal={!!showReviews} setShowModal={setShowReviews}>
        <div className="title-p">{t("comments")}</div>
        <div className="modal-content">
          {reviewsLength > 0 && (
            <div className="comments-tab">
              <button
                onClick={() => {
                  setTab("comments");
                  setLoading(true);
                }}
                disabled={tab === "comments"}
                className={tab === "comments" ? "active" : ""}
              >
                {t("comments")}
              </button>
              <button
                onClick={() => {
                  setTab("reviews");
                  setLoading(true);
                }}
                disabled={tab === "reviews"}
                className={tab === "reviews" ? "active" : ""}
              >
                {t("reviewsTitle")}
              </button>
            </div>
          )}
          <div
            className={`comments-wrapper ${
              tab === "reviews" ? "reviews-wrapper" : ""
            }`}
          >
            {(tab === "reviews" && !reviewsLength) ||
            (tab === "comments" && comments.length === 0) ? (
              <div className="no-reviews">
                <div>
                  <div className="title-p">
                    {t(tab === "comments" ? "noComments" : "noReviews")}
                  </div>
                  <Image
                    height={120}
                    width={230}
                    src="/img/pageNotFound.webp"
                    alt="not found"
                    className="no-reviews-img"
                  />
                </div>
              </div>
            ) : (
              <>
                {tab === "reviews" ? (
                  <ItineraryReviewsStyles>
                    <DekitabiReviews
                      {...{
                        user: user,
                        reviewsLength: reviewsLength,
                        id: itineraryId,
                        t: t
                      } as any}
                    />
                  </ItineraryReviewsStyles>
                ) : (
                  <ItineraryCommentsList
                    {...{
                      itineraryId: itineraryId,
                      setComments: setComments,
                      comments: comments,
                      setCommentsCounter: setCommentsCounter,
                      commentsCounter: commentsCounter,
                      setInput: setInput,
                      setReply: setReply,
                      refreshComment: refreshComment,
                      setRefreshComment: setRefreshComment,
                      hasMore: hasMore,
                      t: t,
                      user: user,
                      setLoading: setLoading
                    } as any}
                  />
                )}
              </>
            )}
            {loadingMore && (
              <Skeleton
                style={{
                  marginTop: "10px",
                }}
                variant="rounded"
                width={"100%"}
                height={20}
              />
            )}
            {hasMore && !loadingMore && (
              <button className="show-more" onClick={getMoreComments}>
                <hr />
                {t("showMore")}
              </button>
            )}
            {loading && <Spinner />}
          </div>
        </div>
        {tab === "comments" && (
          <>
            <form className="input-wrapper" onSubmit={sendComment}>
              <input
                id="comment-input"
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                disabled={commenting}
                maxLength={500}
                minLength={2}
              />
              <button disabled={commenting} type="submit">
                <Image
                  height={20}
                  width={20}
                  src="/img/icon-send.svg"
                  alt="send-comment"
                />
              </button>
            </form>
            <div
              className="comments-guidelines"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("communityGuidelinesMsg"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            />
          </>
        )}
      </BasicModal>
    </ItineraryCommentsStyles>
  );
};

export default React.memo(ItineraryComments);
