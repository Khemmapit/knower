import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TagField from "./TagField";
import Typography from "@material-ui/core/Typography";
import indexStyle from "./indexStyles";
import Proptypes from "prop-types";

const TagCard = ({ tags, setTags }) => {
  const styles = indexStyle();

  const handleTagChange = (e, index) => {
    const newTags = tags.slice(0);
    newTags[index] = e.target.value;
    setTags(newTags);
  };

  const handleAddTag = () => {
    const newTags = tags.slice(0);
    newTags.push("");
    setTags(newTags);
  };

  const handleRemoveTag = () => {
    const newTags = tags.slice(0);
    newTags.pop();
    setTags(newTags);
  };

  return (
    <Card className={styles.tagCard}>
      <Typography className={styles.tagTitle}>Catergory</Typography>
      <Typography className={styles.tagInfo}>
        * We encourage you to create detailed tag so users can easily find what
        they want
      </Typography>
      <TagField tags={tags} handleTagChange={handleTagChange} />
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Button
            className={styles.tagControlButton}
            color="primary"
            variant="contained"
            onClick={handleAddTag}
          >
            add
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={styles.tagControlButton}
            color="primary"
            variant="contained"
            onClick={handleRemoveTag}
            disabled={tags.length <= 3}
          >
            remove
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

TagCard.propTypes = {
  tags: Proptypes.array,
  setTags: Proptypes.func,
};
export default TagCard;
