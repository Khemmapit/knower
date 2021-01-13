import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper, useMediaQuery, useTheme, IconButton } from "@material-ui/core";
import useStyles from "../ProfileStyles";
import VideoSet from "../../video/VideoSet";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

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
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Paper elavation={3}>
      <Grid
        container
        spacing={1}
        direction="column"
        className={isSmall ? styles.collectionXS : styles.collection}
      >
        <Grid item>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justify="space-between"
            className={
              isSmall ? styles.collectionHeaderXS : styles.collectionHeader
            }
          >
            <Grid item xs={1}>
              <Typography
                variant={isSmall ? (isXSmall ? "overline" : "h6") : "h5"}
                color="initial"
                className={
                  isSmall ? styles.collectionNameXS : styles.collectionName
                }
              >
                {name}
              </Typography>
            </Grid>

            <Grid
              item
              xs={1}
              className={
                isSmall ? styles.collectionNameXS : styles.collectionName
              }
            >
              <MoreHorizOutlinedIcon />
            </Grid>
          </Grid>
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
