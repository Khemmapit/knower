import React from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const Loading = () => {
  return (
    <Container>
      <Grid container direction="column" alignItems="center">
        <Box p={5}>
          <CircularProgress size={80} thickness={6} />
        </Box>
      </Grid>
    </Container>
  );
};

export default Loading;
