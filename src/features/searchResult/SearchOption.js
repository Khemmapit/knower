import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Avatar, useMediaQuery, useTheme, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const SearchOption = ({ text, type }) => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const profileData = {
    "Mark Zuckerberg": {
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/1200px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
      description: "Chief Executive Officer of Facebook",
    },
    "Marc Andressen": {
      photoURL:
        "https://i2.wp.com/a16z.com/wp-content/uploads/2015/08/MarcAndreessen.jpg?resize=400%2C400&ssl=1",
      description: "Silicon Valley venture capital firm Andreessen Horowitz.",
    },
  };
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justify="flex-start"
      style={{ position: "relative" }}
    >
      {type === "profile" ? (
        <>
          <Grid item>
            <Avatar src={profileData[text].photoURL} />
          </Grid>
          <Grid item>
            <Typography
              variant={isXSmall ? "subtitle2" : "h6"}
              style={{ fontWeight: "700" }}
              color="initial"
            >
              {text}
            </Typography>
            <Typography
              variant={isXSmall ? "caption" : "subtitle2"}
              color="initial"
            >
              {profileData[text].description}
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item>{text}</Grid>
          <Grid
            item
            style={{
              fontSize: "10px",
              position: "absolute",
              right: "15px",
              top: "0px",
            }}
          >
            {type}
          </Grid>
        </>
      )}
      <Grid item style={{ position: "absolute", right: "0px", top: "0px" }}>
        <CloseIcon style={{ fontSize: "15px" }} />
      </Grid>
    </Grid>
  );
};

export default SearchOption;
