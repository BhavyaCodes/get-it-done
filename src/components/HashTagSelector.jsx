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
      <ColorButton>Health</ColorButton>
    </div>
  );
}

export default HashTagSelector;
