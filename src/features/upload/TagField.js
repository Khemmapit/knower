import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Proptypes from "prop-types";

const TagField = ({ tags, handleTagChange }) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      {tags.map((tag, index) => (
        <Grid item key={index}>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <TextField
                label={"tag " + (index + 1)}
                required
                onChange={(e) => handleTagChange(e, index)}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <ExpandMore />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

TagField.propTypes = {
  tags: Proptypes.array,
  handleTagChange: Proptypes.func,
};

export default TagField;
