import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
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
  deepOrange,
} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function HashTagSelector({ hashTags, setHashTags, globalHashTags }) {
  const classes = useStyles();

  const handleAddHashTag = (hashTag) => {
    setHashTags((prevHashTags) => {
      return { ...prevHashTags, [hashTag._id]: hashTag };
    });
  };
  const handleRemoveHashTag = (hashTag) => {
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
    deepOrange,
  };

  return (
    <div>
      {globalHashTags.map((globalHashTag) => {
        if (hashTags[globalHashTag._id]) {
          const ColorButton = withStyles((theme) => ({
            root: {
              color: theme.palette.getContrastText(
                colors[globalHashTag.color][500]
              ),
              backgroundColor: colors[globalHashTag.color][500],
              "&:hover": {
                backgroundColor: colors[globalHashTag.color][700],
              },
            },
          }))(Button);

          return (
            <ColorButton
              className={classes.button}
              size="small"
              key={globalHashTag._id}
              onClick={() => {
                handleRemoveHashTag(globalHashTag);
              }}
              variant="outlined"
            >
              {globalHashTag.tag}
            </ColorButton>
          );
        } else {
          const ColorButton = withStyles((theme) => ({
            root: {
              color: colors[globalHashTag.color][500],
              backgroundColor: "rgba(0,0,0,0)",
              borderColor: colors[globalHashTag.color][500],
              "&:hover": {
                backgroundColor: colors[globalHashTag.color][700],
                color: theme.palette.getContrastText(
                  colors[globalHashTag.color][500]
                ),
                borderColor: colors[globalHashTag.color][700],
              },
            },
          }))(Button);

          return (
            <ColorButton
              className={classes.button}
              size="small"
              key={globalHashTag._id}
              onClick={() => {
                handleAddHashTag(globalHashTag);
              }}
              variant="outlined"
            >
              {globalHashTag.tag}
            </ColorButton>
          );
        }
      })}
    </div>
  );
}

export default HashTagSelector;
