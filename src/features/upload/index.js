// TODO add poster UID

import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import indexStyle from "./indexStyles";
import createPost from "../../controllers/uploadController";
import Loading from "../loading";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TagCard from "./TagCard";
import FormControls from "./FormControls";
import FileSelector from "./FileSelector";
import CompleteAlert from "./CompleteAlert";

const Upload = () => {
  const styles = indexStyle();
  const [contentBlob, setContentBlob] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState(["", "", ""]);
  const [description, setDescription] = React.useState("");
  const [alert, setAlert] = React.useState("");

  const handleUpload = async () => {
    setLoading(true);
    const error = await createPost(
      title,
      description,
      tags,
      contentBlob,
      tags.join("/")
    );
    setLoading(false);
    setTitle("");
    setTags(["", "", ""]);
    setDescription("");
    setContentBlob(null);
    setAlert(error ? "an error occurred" : "posted!");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  if (loading) return <Loading />;
  return (
    <Card className={styles.uploadCard}>
      <form id="upload-form" autoComplete="off" onSubmit={handleUpload}>
        <Grid direction="column" alignItems="center" container spacing={5}>
          <Grid item>
            <Typography className={styles.uploadTitle}>
              Create your content!
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="title"
              onChange={handleTitleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              label="description"
              onChange={handleDescriptionChange}
              required
              variant="outlined"
              multiline
            />
          </Grid>
          <Grid item>
            <TagCard tags={tags} setTags={setTags} />
          </Grid>
          <Grid item>
            <FileSelector
              contentBlob={contentBlob}
              setContentBlob={setContentBlob}
            />
          </Grid>
          <Grid item>
            <FormControls handleUpload={handleUpload} />
          </Grid>
        </Grid>
      </form>
      <CompleteAlert alert={alert} setAlert={setAlert} />
    </Card>
  );
};

export default Upload;
