import { DekitabiReviewStyles } from "./styles/DekitabiReviewStyles";
import Rating from "@mui/material/Rating";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import DekitabiReviewReply from "./DekitabiReviewReply";
import Avatar from "../../UI/Avatar";
import Link from "next/link";
const DekitabiReview = ({ profile, review, guide, user, t, activity }) => {
  const bgColors = [
    "#32de84",
    "#32de84",
    "#8cc751",
    "#800080",
    "#33006F",
    "#FEBE10",
    "#E52B50",
    "#C71585",
    "#00BFFF",
    "#00CED1",
    "#1DB954",
  ];
  const randomBg = useMemo(() => Math.floor(Math.random() * 11), []);
  return (
    <DekitabiReviewStyles className="dekitabi-review">
      {review?.name && (
        <div className="review-header flex-wrapper-ten">
          <div className="user flex-wrapper-five">
            {!review?.avatar ? (
              <div
                className="traveler-avatar"
                style={{ background: bgColors[randomBg] }}
              >
                {review?.name[0]?.toUpperCase()}
              </div>
            ) : (
              <Avatar width={50} height={50} src={review?.avatar} />
            )}
            {review?.username ? (
              <Link href={`/${review?.username}`} prefetch={false}>
                {review?.username}
              </Link>
            ) : (
              <p className="name">{review?.name}</p>
            )}
          </div>
          <Rating
            name="half-rating-read"
            defaultValue={
              guide
                ? review?.guideRating
                : activity
                ? review?.activityRating
                : review?.tourRating
            }
            precision={0.5}
            size={"small"}
            readOnly
          />
          <div className="review-date">
            {dayjs(review?.createdAt).format("MM/DD/YYYY")}
          </div>
        </div>
      )}
      {review?.message && (
        <div className="review-message">
          <p>{review?.message}</p>
          {user && (
            <DekitabiReviewReply
              t={t}
              reviewGuideId={review?.guideId}
              reviewId={review?.id}
              reviewItineraryId={review?.itineraryId}
              reviewReply={review?.reply}
              user={user}
              profile={profile}
              guide={guide}
              activity={activity}
            />
          )}
        </div>
      )}
    </DekitabiReviewStyles>
  );
};
export default React.memo(DekitabiReview);
