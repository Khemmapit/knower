import makeStyles from "@material-ui/styles/makeStyles";
import useTheme from "../../config/theme";

const styles = makeStyles((theme) => ({
  videoSet: {
    marginBottom: 50,
  },
  postControlButton: {
    borderRadius: "50%",
    width: 80,
    height: 80,
    background: useTheme.palette.primary.main,
    marginLeft: "auto",
    marginRight: "auto",
  },
  arrowIcon: {
    fontSize: 40,
    color: "white",
  },
}));

export default styles;
