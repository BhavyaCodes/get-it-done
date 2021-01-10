import React from "react";
import Chip from "@material-ui/core/Chip";

function HashTagSelector({ hashTags, setHashTags, globalHashTags }) {
  const handleAddHashTag = (hashTag) => {
    console.log(hashTag);
    setHashTags((prevHashTags) => [...prevHashTags, hashTag]);
  };
  const handleRemoveHashTag = (hashTag) => {
    setHashTags((prevHashTags) => {
      return prevHashTags.filter((prevHashTag) => hashTag !== prevHashTag);
    });
  };

  return (
    <div>
      {globalHashTags.map((hashTag) =>
        hashTags.includes(hashTag) ? (
          <Chip
            key={hashTag}
            color="secondary"
            label={hashTag}
            clickable
            onClick={() => {
              handleRemoveHashTag(hashTag);
            }}
          />
        ) : (
          <Chip
            key={hashTag}
            color="secondary"
            label={hashTag}
            clickable
            onClick={() => {
              handleAddHashTag(hashTag);
            }}
            variant="outlined"
          />
        )
      )}
    </div>
  );
}

export default HashTagSelector;
