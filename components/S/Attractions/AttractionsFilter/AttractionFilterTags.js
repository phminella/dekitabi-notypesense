import { AttractionFilterTagsStyles } from "./styles/AttractionFilterTagsStyles";
import React, { useState } from "react";
import Image from "next/legacy/image";
import ScrollContainer from "react-indiana-drag-scroll";
import ScrollContainerArrows from "../../../UI/ScrollContainerArrows";
import { useRef } from "react";
const TagButton = ({ tag, tags, tagsHandler, t }) => {
  return (
    <div>
      <button
        onClick={() => tagsHandler(tag)}
        className={`tag-button tag-button-wrapper ${
          tags?.includes(tag) ? "active" : ""
        }`}
      >
        <Image
          src={`/img/tags/icon-${tag}.svg`}
          height={25}
          width={25}
          alt={tag}
        />
        <p>{t(tag)}</p>
      </button>
    </div>
  );
};
const AttractionFilterTags = ({ tags, setTags, t, topRef }) => {
  const [tagButtons, setTagButtons] = useState([
    "outdoor",
    "indoor",
    "free",
    "paid",
    "24h",
    "daytime",
    "nighttime",
    "traditional",
    "temple",
    "museums",
    "nature",
    "food",
    "shops",
    "cafes",
    "parks",
    "theme-park",
    // "classes",
    // "festivals"
  ]);
  const tagsHandler = (tag) => {
    for (let i = 0; i < tags?.length; i++) {
      if (tags[i] === tag) {
        let temp = [...tags];
        temp?.splice(i, 1);
        setTags(temp);
        return;
      }
    }
    setTags([...tags, tag]);
  };
  const containerRef = useRef();
  return (
    <AttractionFilterTagsStyles className="tags" ref={topRef}>
      <ScrollContainerArrows
        containerRef={containerRef}
        itemWidth={75}
        tags={tags}
      />
      <ScrollContainer className="scroll-container" innerRef={containerRef}>
        {tagButtons?.map((tag, i) => (
          <TagButton
            key={i}
            tag={tag}
            tags={tags}
            t={t}
            tagsHandler={tagsHandler}
          />
        ))}
      </ScrollContainer>
    </AttractionFilterTagsStyles>
  );
};
export default React.memo(AttractionFilterTags);
