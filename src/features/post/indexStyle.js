import makeStyles from "@material-ui/styles/makeStyles";
import useTheme from "../../config/theme";

const styles = makeStyles((theme) => ({
  content: {
    width: "100%",
  },
  videoSetContainer: {
    paddingBottom: 30,
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
  },
  profileContainer: {
    padding: 10,
  },
  tags: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerContainer: {
    padding: 10,
  },
  usernameLink: {
    paddingTop: 10,
  },
  actionContainer: {
    marginLeft: 10,
  },
  gotIt: {
    color: useTheme.palette.primary.main,
  },
}));

export default styles;
