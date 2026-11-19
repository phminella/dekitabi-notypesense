import React, { useState, useCallback, useEffect, useRef } from "react";
import { HeaderItineraryListStyles } from "./styles/HeaderItineraryListStyles";
import HeaderItinerary from "./HeaderItinerary";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setItineraries } from "../../../store/itinerarySlice";
import { getFirestore, doc, updateDoc } from "firebase/firestore/lite";
import useLocalStorage from "../../../lib/useLocalStorage";

const HeaderItineraryList = ({
  setShowItineraries,
  setShowDeleteModal,
  setItineraryToDelete,
  itinerariesList,
  setItinerariesList,
}) => {
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const dnd = useRef({});
  const dispatch = useDispatch();
  const { setItem, getItem } = useLocalStorage();
  const user = useSelector((state) => state.app.user, shallowEqual);

  useEffect(() => {
    let isMounted = true;
    import("@hello-pangea/dnd").then((mod) => {
      if (isMounted) {
        dnd.current = {
          DragDropContext: mod.DragDropContext,
          Droppable: mod.Droppable,
          Draggable: mod.Draggable,
        };
        setReady(true);
        if (typeof mod.resetServerContext === "function") {
          mod.resetServerContext();
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const onDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const onDragEnd = useCallback(
    async ({ source, destination }) => {
      if (!destination || source.index === destination.index) {
        setDragging(false);
        return;
      }

      const moveElement = (fromIndex, toIndex) => {
        const temp = [...itinerariesList];
        const [moved] = temp.splice(fromIndex, 1);
        temp.splice(toIndex, 0, moved);
        return temp;
      };

      const updatedList = moveElement(source.index, destination.index);
      const updatedIds = updatedList.map((itinerary) => itinerary?.id);

      setItinerariesList(updatedList);
      dispatch(setItineraries(updatedList));
      setItem("itineraries", JSON.stringify(updatedIds));

      if (user?.uid) {
        try {
          const userRef = doc(getFirestore(), "users", user.uid);
          await updateDoc(userRef, { itineraries: updatedIds });
        } catch (err) {
          console.error("Failed to update Firebase:", err);
        }
      }

      if (!getItem("dragItineraryList")) {
        setItem("dragItineraryList", true);
      }

      setDragging(false);
    },
    [itinerariesList, user, dispatch, setItem, getItem, setItinerariesList]
  );

  if (!ready) return <p>Loading itinerary drag & drop...</p>;

  const { DragDropContext, Droppable, Draggable } = dnd.current;

  return (
    <HeaderItineraryListStyles>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {itinerariesList?.map((itinerary, i) => (
                <Draggable
                  key={String(itinerary?.id)}
                  draggableId={String(itinerary?.id)}
                  index={i}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="draggable-item"
                    >
                      <HeaderItinerary
                        itinerary={itinerary}
                        setShowItineraries={setShowItineraries}
                        setShowDeleteModal={setShowDeleteModal}
                        setItineraryToDelete={setItineraryToDelete}
                        dragging={dragging}
                        itinerariesLength={itinerariesList?.length}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </HeaderItineraryListStyles>
  );
};

export default React.memo(HeaderItineraryList);
