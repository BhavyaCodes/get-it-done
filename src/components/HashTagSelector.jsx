import React from "react";
import Chip from "@material-ui/core/Chip";
import { withStyles } from '@material-ui/core/styles';

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

  const StyleChipActive = withStyles({
    root: {
      backgroundColor: '#F3CE7B',
      color: '#251A01',
      borderColor: '#B4AFA2',
      padding: '4px 16px',
      textSize: '18px',
      marginRight: '8px',
      "&&:hover": {
        backgroundColor: "#f3ce7b"
      },
      "&&:focus": {
        backgroundColor: "green"
      }
    }
  })(Chip);

  const StyleChipInactive = withStyles({
    root: {
      backgroundColor: '#FDFCFA',
      color: '#251A01',
      borderColor: '#B4AFA2',
      padding: '4px 16px',
      textSize: '18px',
      margin: '16px 8px 16px 0',
      "&&:hover": {
        backgroundColor: "#f3ce7b"
      },
      "&&:focus": {
        backgroundColor: "green"
      }
    }
  })(Chip);



  return (
    <div style={{ marginLeft: '24px'}}>
      {globalHashTags.map((hashTag) =>
        hashTags.includes(hashTag) ? (
          <StyleChipActive
            key={hashTag}
            label={hashTag}
            clickable
            onClick={() => {
              handleRemoveHashTag(hashTag);
            }}
            variant="outlined"
          />
        ) : (
          <StyleChipInactive
            key={hashTag}
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
