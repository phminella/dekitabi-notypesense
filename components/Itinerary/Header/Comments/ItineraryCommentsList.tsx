import { ItineraryCommentsListStyles } from "./styles/ItineraryCommentsListStyles";
import ItineraryComment from "./ItineraryComment";
import React from "react";
import { User } from "../../../../types/user";

interface ItineraryCommentsListProps {
  setComments: (comments: any[]) => void;
  comments: any[];
  itineraryId: string;
  t: (key: string, options?: any) => string;
  user: User;
  commentsCounter: number;
  setCommentsCounter: (counter: number) => void;
  setInput: (input: string) => void;
  setReply: (reply: string) => void;
  refreshComment: string;
  setRefreshComment: (refresh: string) => void;
  setLoading: (loading: boolean) => void;
}

const ItineraryCommentsList = ({
  setComments,
  comments,
  itineraryId,
  t,
  user,
  commentsCounter,
  setCommentsCounter,
  setInput,
  setReply,
  refreshComment,
  setRefreshComment,
  setLoading,
}: ItineraryCommentsListProps) => {
  return (
    <ItineraryCommentsListStyles>
      {comments?.map((comment, i) => (
        <ItineraryComment
          comment={comment}
          t={t}
          setInput={setInput}
          setReply={setReply}
          user={user}
          key={comment.commentId || i}
          index={i}
          comments={comments}
          setComments={setComments}
          commentsCounter={commentsCounter}
          setCommentsCounter={setCommentsCounter}
          itineraryId={itineraryId}
          refreshComment={refreshComment}
          setRefreshComment={setRefreshComment}
          setLoading={setLoading}
        />
      ))}
    </ItineraryCommentsListStyles>
  );
};
export default React.memo(ItineraryCommentsList);
