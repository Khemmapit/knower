import {
  Avatar,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import useSWR from "swr";
import { fetchUserData } from "../../../controllers/fetcher";
import useStyles from "../ProfileStyles";

const FollowUser = ({ uid, size }) => {
  const styles = useStyles();
  const { data: userData, error } = useSWR(uid, fetchUserData);
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));

  if (error) return <h6>{error}</h6>;
  if (!userData) return <div>Waiting for ...</div>;

  console.log(userData);

  return (
    <Grid
      container
      spacing={isXSmall ? 1 : 2}
      className={styles.followUser}
      alignItems="center"
    >
      <Grid item>
        <Avatar src={userData.photoURL} />
      </Grid>

      <Grid item>
        <Typography
          variant={
            size == "small" ? (isXSmall ? "subtitle2" : "subtitle1") : "h6"
          }
          color="initial"
        >
          {userData.displayName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FollowUser;
