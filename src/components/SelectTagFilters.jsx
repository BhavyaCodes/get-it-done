import FormGroup from "@material-ui/core/FormGroup";

import CheckBoxComp from "./CheckBoxComp";

function SelectTagFilters({
  selectedHastagIds,
  setSelectedHashTagIds,
  globalHashTags,
}) {
  const renderCheckboxes = () => {
    return globalHashTags.map((hashTag) => (
      <CheckBoxComp
        key={hashTag._id}
        hashTag={hashTag}
        selectedHastagIds={selectedHastagIds}
        setSelectedHashTagIds={setSelectedHashTagIds}
      />
    ));
  };

  return <FormGroup row>{renderCheckboxes()}</FormGroup>;
}

export default SelectTagFilters;
