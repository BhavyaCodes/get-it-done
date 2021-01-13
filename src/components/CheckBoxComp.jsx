import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function CheckBoxComp({ hashTag, selectedHastagIds, setSelectedHashTagIds }) {
  const handleChange = () => {
    if (selectedHastagIds.find((_id) => _id === hashTag._id)) {
      return setSelectedHashTagIds((prevHashTagsIds) =>
        prevHashTagsIds.filter((prevHashTagId) => hashTag._id !== prevHashTagId)
      );
    }
    setSelectedHashTagIds((prevHashTags) => [...prevHashTags, hashTag._id]); //prevHashTags.push(hashTag._id));
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={
            selectedHastagIds.find((_id) => _id === hashTag._id) ? true : false
          }
          onChange={handleChange}
        />
      }
      label={hashTag.tag}
    />
  );
}

export default CheckBoxComp;
