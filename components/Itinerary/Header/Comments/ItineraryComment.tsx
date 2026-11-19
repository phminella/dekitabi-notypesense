import React, { useState, useEffect, useCallback } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore/lite";
import { Skeleton } from "@mui/material";
import Post from "./Post";
import { User } from "../../../../types/user";

interface ItineraryCommentProps {
  comment: any;
  setInput: (input: string) => void;
  setReply: (reply: string) => void;
  user: User;
  t: (key: string, options?: any) => string;
  setRefreshComment: (refresh: string) => void;
  refreshComment: string;
  comments: any[];
  setComments: (comments: any[]) => void;
  commentsCounter: number;
  setCommentsCounter: (counter: number) => void;
  itineraryId: string;
  setLoading: (loading: boolean) => void;
  index: number;
}

const ItineraryComment = ({
  comment,
  setInput,
  setReply,
  user,
  t,
  setRefreshComment,
  refreshComment,
  comments,
  setComments,
  commentsCounter,
  setCommentsCounter,
  itineraryId,
  setLoading,
  index,
}: ItineraryCommentProps) => {
  const [replies, setReplies] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const getMoreReplies = async () => {
    if (replies.length === 0) return;
    setLoadingMore(true);
    const lastReply = replies[replies.length - 1];
    const queryCursor = await getDoc(
      doc(getFirestore(), "comments", lastReply.commentId)
    );
    
    const repliesQ = query(
      collection(getFirestore(), "comments"),
      where("parentId", "==", comment?.commentId),
      orderBy("createdAt", "desc"),
      startAfter(queryCursor),
      limit(6)
    );
    
    const repliesQuerySnapshot = await getDocs(repliesQ);
    let tempRepliesWithoutUsers: any[] = [];
    repliesQuerySnapshot.forEach((data) => {
      tempRepliesWithoutUsers.push(data.data());
    });
    
    if (tempRepliesWithoutUsers.length === 6) {
      setHasMore(true);
      tempRepliesWithoutUsers.pop();
    } else {
      setHasMore(false);
    }
    
    const tempReplies = await Promise.all(
      tempRepliesWithoutUsers.map(async (reply) => {
        const userRef = doc(getFirestore(), "users", reply.userId);
        const userSnap = await getDoc(userRef);
        const replyUser = userSnap.exists()
          ? {
              avatar: userSnap.data().avatar,
              username: userSnap.data().username,
            }
          : {
              avatar: "/img/avatar.png",
              username: t("guest"),
            };
        return {
          ...reply,
          user: replyUser,
        };
      })
    );
    
    setReplies([...replies, ...tempReplies]);
    setLoadingMore(false);
  };

  const getReplies = useCallback(async () => {
    let repliesLimit = 2;
    if (refreshComment === comment?.commentId) {
      repliesLimit = replies.length + 2;
      setRefreshComment("ok");
    }
    
    const repliesQ = query(
      collection(getFirestore(), "comments"),
      where("parentId", "==", comment?.commentId),
      orderBy("createdAt", "desc"),
      limit(repliesLimit)
    );
    
    const repliesQuerySnapshot = await getDocs(repliesQ);
    let tempRepliesWithoutUsers: any[] = [];
    repliesQuerySnapshot.forEach((data) => {
      tempRepliesWithoutUsers.push(data.data());
    });
    
    if (tempRepliesWithoutUsers.length === repliesLimit) {
      setHasMore(true);
      tempRepliesWithoutUsers.pop();
    } else {
      setHasMore(false);
    }
    
    const tempReplies = await Promise.all(
      tempRepliesWithoutUsers.map(async (replyItem) => {
        const userRef = doc(getFirestore(), "users", replyItem.userId);
        const userSnap = await getDoc(userRef);
        const replyUser = userSnap.exists()
          ? {
              avatar: userSnap.data().avatar,
              username: userSnap.data().username,
            }
          : {
              avatar: "/img/avatar.png",
              username: t("guest"),
            };
        return {
          ...replyItem,
          user: replyUser,
        };
      })
    );
    
    setReplies(tempReplies);
    if (index === comments?.length - 1) {
      setLoading(false);
    }
  }, [
    comment?.commentId,
    refreshComment,
    replies.length,
    setRefreshComment,
    t,
    index,
    comments?.length,
    setLoading,
  ]);

  useEffect(() => {
    if (
      !refreshComment ||
      refreshComment === comment?.commentId ||
      refreshComment === "deleted" ||
      refreshComment === "ok"
    ) {
      getReplies();
    }
  }, [refreshComment, comment?.commentId, getReplies]);

  return (
    <li>
      <Post
        user={user}
        post={comment}
        postType={"comment"}
        setInput={setInput}
        setReply={setReply}
        t={t}
        comments={comments}
        setComments={setComments}
        commentsCounter={commentsCounter}
        setCommentsCounter={setCommentsCounter}
        itineraryId={itineraryId}
        setRefreshComment={setRefreshComment}
      />
      <ul className="replies">
        {replies?.map((replyItem, i) => (
          <Post
            user={user}
            post={replyItem}
            postType={"reply"}
            setInput={setInput}
            setReply={setReply}
            t={t}
            comments={comments}
            setComments={setComments}
            commentsCounter={commentsCounter}
            setCommentsCounter={setCommentsCounter}
            itineraryId={itineraryId}
            key={replyItem.commentId || i}
            setRefreshComment={setRefreshComment}
          />
        ))}
      </ul>
      <div className="show-more-reply">
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
          <button className="show-more-button" onClick={getMoreReplies}>
            <hr />
            {t("showMore")}
          </button>
        )}
      </div>
    </li>
  );
};

export default React.memo(ItineraryComment);
