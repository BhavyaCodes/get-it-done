import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function CheckBoxComp({ hashTag, selectedHastagIds, setSelectedHashTagIds }) {
  const handleChange = () => {
    if (selectedHastagIds[hashTag._id]) {
      // return setSelectedHashTagIds((prevHashTagsIds) =>
      //   prevHashTagsIds.filter((prevHashTagId) => hashTag._id !== prevHashTagId)
      // );
      return setSelectedHashTagIds((prevHashTagIds) => {
        delete prevHashTagIds[hashTag._id];
        return { ...prevHashTagIds };
      });
    }
    setSelectedHashTagIds((prevHashTags) => {
      return { ...prevHashTags, [hashTag._id]: true };
    });
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedHastagIds[hashTag._id] ? true : false}
          onChange={handleChange}
        />
      }
      label={hashTag.tag}
    />
  );
}

export default CheckBoxComp;
