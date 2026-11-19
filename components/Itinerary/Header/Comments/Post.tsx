import { PostStyles } from "./styles/PostStyles";
import React, { useState, useEffect, useCallback } from "react";
import Avatar from "../../../UI/Avatar";
import moment from "moment/moment";
import Image from "next/image";
import {
  getFirestore,
  doc,
  updateDoc,
  increment,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore/lite";
import Link from "next/link";
import { getFunctions, httpsCallable } from "firebase/functions";
import DOMPurify from "isomorphic-dompurify";
import { useDispatch } from "react-redux";
import { setShowLogin } from "../../../../store/appSlice";
import { User } from "../../../../types/user";

interface PostProps {
  t: (key: string, options?: any) => string;
  postType: "comment" | "reply";
  post: any;
  user: User;
  setReply: (reply: string) => void;
  setInput: (input: string) => void;
  comments: any[];
  setComments: (comments: any[]) => void;
  commentsCounter: number;
  setCommentsCounter: (counter: number) => void;
  itineraryId: string;
  setRefreshComment: (refresh: string) => void;
}

const Post = ({
  t,
  postType,
  post,
  user,
  setReply,
  setInput,
  comments,
  setComments,
  commentsCounter,
  setCommentsCounter,
  itineraryId,
  setRefreshComment,
}: PostProps) => {
  const dispatch = useDispatch();
  const functions = getFunctions(undefined, "asia-northeast1");
  const sendEmail = httpsCallable(functions, "sendEmail");

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(
    post?.likesCounter ? post?.likesCounter : 0
  );
  const [reported, setReported] = useState(false);

  const isLiked = useCallback(async () => {
    if (!user?.uid) return false;
    const dbLiked = await getDoc(
      doc(
        getFirestore(),
        "comments_likes",
        `${user.uid}${post?.commentId}`
      )
    );
    const likedFromDb = dbLiked.exists();
    setLiked(likedFromDb);
    return likedFromDb;
  }, [post?.commentId, user?.uid]);

  const likeComment = async () => {
    if (user?.uid) {
      const alreadyLiked = await isLiked();
      if (!alreadyLiked) {
        await setDoc(
          doc(
            getFirestore(),
            "comments_likes",
            `${user.uid}${post?.commentId}`
          ),
          {
            itineraryId: itineraryId,
            commentId: post?.commentId,
            likeId: `${user.uid}${post?.commentId}`,
            createdAt: new Date().getTime(),
          }
        );
        await updateDoc(doc(getFirestore(), "comments", `${post?.commentId}`), {
          likesCounter: increment(1),
        });
        setLikes(likes + 1);
        setLiked(true);
      } else {
        await deleteDoc(
          doc(
            getFirestore(),
            "comments_likes",
            `${user.uid}${post?.commentId}`
          )
        );
        await updateDoc(doc(getFirestore(), "comments", post?.commentId), {
          likesCounter: increment(-1),
        });
        setLikes(likes - 1);
        setLiked(false);
      }
    } else {
      dispatch(setShowLogin(true));
    }
  };

  const flagPost = async (commentId: string) => {
    setReported(true);
    setTimeout(() => {
      const el = document.getElementById("flagged");
      if (el) el.style.display = "none";
    }, 2000);
    
    sendEmail({
      to: "contact@dekitabi.com",
      sender: "contact@dekitabi.com",
      subject: `dekitabi | Comment Reported`,
      body: `userId: ${user?.uid}, itineraryId: ${itineraryId}, commentId: ${commentId}`,
    });
  };

  useEffect(() => {
    if (user) {
      isLiked();
    }
  }, [user, isLiked]);

  const deletePost = async (commentId: string) => {
    try {
      await deleteDoc(doc(getFirestore(), "comments", commentId));
      let tempCommentsCounter = commentsCounter;
      
      const repliesQ = query(
        collection(getFirestore(), "comments"),
        where("parentId", "==", commentId)
      );
      const repliesQuerySnapshot = await getDocs(repliesQ);
      
      const deletePromises: Promise<void>[] = [];
      repliesQuerySnapshot.forEach((snap) => {
        const replyData = snap.data();
        deletePromises.push(deleteDoc(doc(getFirestore(), "comments", replyData.commentId)));
        
        const itRef = doc(getFirestore(), "itineraries", itineraryId);
        deletePromises.push(updateDoc(itRef, { commentsCounter: increment(-1) }));
        
        tempCommentsCounter--;
        
        const likesQ = query(
          collection(getFirestore(), "comments_likes"),
          where("commentId", "==", replyData.commentId)
        );
        deletePromises.push(
          getDocs(likesQ).then((likesSnap) => {
            likesSnap.forEach((likeSnap) => {
              deleteDoc(doc(getFirestore(), "comments_likes", likeSnap.data().likeId));
            });
          })
        );
      });
      
      await Promise.all(deletePromises);
      
      const parentLikesQ = query(
        collection(getFirestore(), "comments_likes"),
        where("commentId", "==", commentId)
      );
      const parentLikesSnap = await getDocs(parentLikesQ);
      parentLikesSnap.forEach((ls) => {
        deleteDoc(doc(getFirestore(), "comments_likes", ls.data().likeId));
      });
      
      let tempComments = [...comments];
      if (postType === "reply") {
        setRefreshComment(post?.parentId);
      } else {
        setRefreshComment("deleted");
        const idx = comments.findIndex((c) => c.commentId === commentId);
        if (idx > -1) tempComments.splice(idx, 1);
      }
      
      setCommentsCounter(tempCommentsCounter - 1);
      setComments(tempComments);
      await updateDoc(doc(getFirestore(), "itineraries", itineraryId), {
        commentsCounter: increment(-1),
      });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleReply = () => {
    setInput(`@${post.user.username} `);
    setReply(postType === "comment" ? post?.commentId : post?.parentId);
    const inputEl = document.getElementById("comment-input");
    if (inputEl) inputEl.focus();
  };

  return (
    <PostStyles className={postType === "comment" ? "comment" : ""}>
      <Avatar width={35} height={35} src={post?.user?.avatar} />
      <button
        className="like-button"
        onClick={likeComment}
      >
        <Image
          className="heart-icon"
          height={20}
          width={20}
          src={liked ? "/img/icon-heart-filled.svg" : "/img/icon-heart.svg"}
          alt="heart"
        />
      </button>
      {user?.uid !== post?.userId && (
        <>
          {reported ? (
            <div className="flag-button like-button checked" id="flagged">
              <Image
                height={20}
                width={20}
                src="/img/icon-check.svg"
                alt="comment-flagged"
              />
              {t("reported")}
            </div>
          ) : (
            <button
              className="flag-button like-button"
              onClick={() => flagPost(post?.commentId)}
            >
              <Image
                height={20}
                width={20}
                src="/img/icon-flag.svg"
                alt="flag-comment"
              />
            </button>
          )}
        </>
      )}
      <div className="comment-content">
        <Link
          href={`/${post?.user?.username}`}
          target="_blank"
          prefetch={false}
        >
          <b>{post?.user?.username}</b>
        </Link>{" "}
        <span
          className="post-message"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              post?.message?.replace(
                /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,
                `<i></i>`
              ) || "",
              {
                USE_PROFILES: { html: true },
              }
            ),
          }}
        />{" "}
        {user?.uid === post?.userId && (
          <button
            className="delete"
            onClick={() => deletePost(post?.commentId)}
          >
            <Image
              height={13}
              width={13}
              src="/img/icon-delete.svg"
              alt="delete-comment"
            />
          </button>
        )}
        <div className="comment-details">
          <p>{moment(post?.createdAt).fromNow()}</p>
          <p>{t("likes", { counter: likes })}</p>
          <button
            className="reply-btn"
            onClick={handleReply}
          >
            {t("reply")}
          </button>
        </div>
      </div>
    </PostStyles>
  );
};

export default React.memo(Post);
