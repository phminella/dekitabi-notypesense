import { ActivityEditStyles } from "./styles/ActivityEditStyles";
import BasicModal from "../../../UI/BasicModal";
import ActivityEditString from "./ActivityEditString";
import ActivityEditPersons from "./ActivityEditPersons";
import ActivityEditPrice from "./ActivityEditPrice";
import ActivityEditActivityHours from "./ActivityEditActivityHours";
import ActivityEditAvailability from "./ActivityEditAvailability";
import DeleteActivityButton from "../DeleteActivityButton";
import ActivityEditIncluded from "./ActivityEditIncluded";
import { useEffect, useRef } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore/lite";
import { useRouter } from "next/router";
const ActivityEdit = ({
  setShowModal,
  showModal,
  t,
  setActivity,
  activity,
  setShowDelete,
}) => {
  const router = useRouter();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const activityAddressRef = useRef();
  const priceRef = useRef();
  const durationRef = useRef();
  const personsRef = useRef();
  const includedRef = useRef();
  const websiteRef = useRef();
  const activityHoursRef = useRef();
  const availabilityRef = useRef();
  const updateProfile = async (field, value) => {
    setActivity({
      ...activity,
      [field]: value,
      ...((field === "duration" || field === "activityHours") && {
        availability: {},
      }),
    });
    const updatedDoc = await updateDoc(
      doc(getFirestore(), "activities", activity?.id),
      {
        [field]: value,
        ...(field === "name" && {
          url: value
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s\s+/g, " ")
            .toLowerCase()
            .trim()
            .split(" ")
            .join("-"),
        }),
        ...((field === "duration" || field === "activityHours") && {
          availability: {},
        }),
      }
    ).then(() => {
      if (field === "name") {
        router
          .push({
            query: {
              id: value
                .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s\s+/g, " ")
                .toLowerCase()
                .trim()
                .split(" ")
                .join("-"),
            },
          })
          .then(() => {
            router.reload();
          });
      }
    });
    return true;
  };
  useEffect(() => {
    setTimeout(() => {
      if (showModal === "name") {
        nameRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "availability") {
        availabilityRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "activityAddress") {
        activityAddressRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "description") {
        descriptionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "website") {
        websiteRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "included") {
        includedRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "duration") {
        durationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "activityHours") {
        activityHoursRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "persons") {
        personsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
      if (showModal === "price") {
        priceRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }, 100);
  }, []);
  return (
    <ActivityEditStyles>
      <BasicModal setShowModal={setShowModal} showModal={showModal} t={t}>
        <p className="profile-title">{t("shops:editActivity")}</p>
        {activity?.withAvailability && activity?.duration && (
          <div ref={availabilityRef}>
            <ActivityEditAvailability
              activity={activity}
              t={t}
              updateProfile={updateProfile}
              showModal={showModal}
            />
          </div>
        )}
        <div ref={nameRef}>
          <ActivityEditString
            field={"name"}
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
            maxChar={150}
          />
        </div>
        <div ref={descriptionRef}>
          <ActivityEditString
            field={"description"}
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
          />
        </div>
        <div ref={priceRef}>
          <ActivityEditPrice
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
          />
        </div>
        <div ref={includedRef}>
          <ActivityEditIncluded
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
            setActivity={setActivity}
          />
        </div>
        <div ref={durationRef}>
          <ActivityEditString
            field={"duration"}
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
            example={t("shops:durationEx")}
            maxChar={3}
          />
        </div>
        <div ref={personsRef}>
          <ActivityEditPersons
            field={"persons"}
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
          />
        </div>
        <div ref={activityAddressRef}>
          <ActivityEditString
            field={"activityAddress"}
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
            maxChar={200}
          />
        </div>
        <div ref={websiteRef}>
          <ActivityEditString
            field={"activityPage"}
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
            example={"https://www.dekitabi.com"}
            maxChar={200}
          />
        </div>
        <div ref={activityHoursRef}>
          <ActivityEditActivityHours
            updateProfile={updateProfile}
            t={t}
            activity={activity}
            showModal={showModal}
            field={"activityHours"}
          />
        </div>
        <DeleteActivityButton
          t={t}
          text={"deleteActivity"}
          setShowDelete={setShowDelete}
          activity={activity}
        />
      </BasicModal>
    </ActivityEditStyles>
  );
};
export default ActivityEdit;
