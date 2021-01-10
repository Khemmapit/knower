import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import useStyles from "./ProfileStyles";
import VideoSet from "../video/VideoSet";

const postData = [
  [
    {
      username: "Khemmapit Payana",
      profilePhoto:
        "https://lh3.googleusercontent.com/a-/AOh14GhaDTtt5xYEqQ3sTYVdcPrlzLTUR91pu6HrK_4hbQ=s96-c",
      mediaURL: "test.mp4",
      type: "video",
      description: "first post ever",
      email: "gognumb2000@gmail.com",
      hashtag: ["math", "calculus", "limit"],
    },
    {
      username: "Khemmapit Payana",
      profilePhoto:
        "https://lh3.googleusercontent.com/a-/AOh14GhaDTtt5xYEqQ3sTYVdcPrlzLTUR91pu6HrK_4hbQ=s96-c",
      mediaURL: "test.mp4",
      type: "video",
      description: "second post ever",
      email: "gognumb2000@gmail.com",
      hashtag: ["math", "calculus", "limit"],
    },
    {
      username: "Khemmapit Payana",
      profilePhoto:
        "https://lh3.googleusercontent.com/a-/AOh14GhaDTtt5xYEqQ3sTYVdcPrlzLTUR91pu6HrK_4hbQ=s96-c",
      mediaURL: "test.mp4",
      type: "video",
      description: "third post ever",
      email: "gognumb2000@gmail.com",
      hashtag: ["math", "calculus", "limit"],
    },
  ],
];

const Collection = ({ name, postID }) => {
  const styles = useStyles();

  return (
    <Paper elavation={3}>
      <Grid
        container
        spacing={1}
        direction="column"
        className={styles.collection}
      >
        <Grid item>
          <Typography
            variant="h5"
            color="initial"
            className={styles.collectionName}
          >
            {name}
          </Typography>
        </Grid>

        <Grid item>
          {postData.map((data, index) => (
            <VideoSet key={index} data={data} />
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Collection;
