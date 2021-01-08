import React from "react";
import Post from "../post";
//  import "./VideoSet.css";
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
import indexStyle from "./indexStyle";
import Hidden from "@material-ui/core/Hidden";

const VideoSet = ({ data }) => {
  const styles = indexStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = data.length;

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
      className={styles.videoSet}
      alignItems="center"
      zeroMinWidth={true}
    >
      <Hidden smDown>
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
      </Hidden>
      <Grid item sm={12} md={10}>
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
      <Hidden smDown>
        <Grid item md={1}>
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
      </Hidden>
    </Grid>
  );
};

VideoSet.propTypes = {
  data: PropTypes.array,
};

export default VideoSet;
