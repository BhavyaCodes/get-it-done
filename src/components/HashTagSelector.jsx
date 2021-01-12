import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  red,
  pink,
  green,
  purple,
  blue,
  teal,
  lime,
  yellow,
  grey,
} from "@material-ui/core/colors";

function HashTagSelector({ hashTags, setHashTags, globalHashTags }) {
  const handleAddHashTag = (hashTag) => {
    alert("adding");
    console.log(hashTag);
    setHashTags((prevHashTags) => {
      return { ...prevHashTags, [hashTag._id]: hashTag };
    });
  };
  const handleRemoveHashTag = (hashTag) => {
    alert("removing");
    setHashTags((prevHashTags) => {
      delete prevHashTags[hashTag._id];
      return { ...prevHashTags };
    });
  };

  const colors = {
    red,
    pink,
    green,
    purple,
    blue,
    teal,
    lime,
    yellow,
    grey,
  };

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(colors.yellow[500]),
      backgroundColor: colors.yellow[500],
      "&:hover": {
        backgroundColor: colors.yellow[700],
      },
    },
  }))(Button);

  return (
    <div>
      {globalHashTags.map((globalHashTag) =>
        hashTags[globalHashTag._id] ? (
          <ColorButton
            size="small"
            key={globalHashTag._id}
            onClick={() => {
              handleRemoveHashTag(globalHashTag);
            }}
            variant="outlined"
          >
            {globalHashTag.tag}
          </ColorButton>
        ) : (
          <ColorButton
            size="small"
            key={globalHashTag._id}
            onClick={() => {
              handleAddHashTag(globalHashTag);
            }}
            variant="outlined"
          >
            {globalHashTag.tag}
          </ColorButton>
        )
      )}
    </div>
  );
}

export default HashTagSelector;
