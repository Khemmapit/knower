import React from "react";
import Post from "../post/Post";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Tooltip from "@material-ui/core/Tooltip";
import { useDispatch } from "react-redux";
import { userSearch } from "../searchResult/searchSlice";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";
import Grid from "@material-ui/core/Grid";
import indexStyles from "./indexStyles";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { useMediaQuery, useTheme } from "@material-ui/core";

const VideoSet = ({ data }) => {
  const styles = indexStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = data.length;
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (step) => {
    setActiveStep(step);
  };

  const goToSearch = (hash) => {
    dispatch(
      userSearch({
        hashtag: hash,
      })
    );
    history.replace(`/search:${hash}`);
  };

  return (
    <Grid
      container
      className={isXSmall ? styles.videoSetXS : styles.videoSet}
      alignItems="center"
      justify={isSmall && "center"}
      zeroMinWidth={true}
      direction={isSmall ? "column" : "row"}
    >
      {isSmall ? (
        <Grid item md={1}>
          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                className={styles.postControlButtonSM}
              >
                <KeyboardArrowLeftIcon fontSize="small" /> Back
              </Button>
            </Grid>
            <Grid item>{activeStep + 1 + "/" + maxSteps}</Grid>
            <Grid item>
              <Button
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                className={styles.postControlButtonSM}
              >
                Next <KeyboardArrowRightIcon fontSize="small" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item md={1}>
          <Grid container direction="column" alignItems="center">
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              className={styles.postControlButton}
            >
              <NavigateBeforeIcon fontSize="large" />
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid item xs={10} sm={8} md={10}>
        <SwipeableViews
          index={activeStep}
          ignoreNativeScroll
          enableMouseEvents
          resistance
          threshold={2}
          onChangeIndex={handleChange}
        >
          {data.map((d, index) => (
            <Post key={index} data={d} />
          ))}
        </SwipeableViews>
      </Grid>
      {isSmall ? (
        <></>
      ) : (
        <Grid item xs={1} sm={1} md={1}>
          <Grid container direction="column" alignItems="center">
            <Button
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              className={styles.postControlButton}
            >
              <NavigateNextIcon fontSize="large" />
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

VideoSet.propTypes = {
  data: PropTypes.array,
};

export default VideoSet;
