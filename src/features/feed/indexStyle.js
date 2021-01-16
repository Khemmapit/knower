import makeStyles from "@material-ui/styles/makeStyles";

const styles = makeStyles((theme) => ({
  feedPageContainer: {
    padding: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default styles;
