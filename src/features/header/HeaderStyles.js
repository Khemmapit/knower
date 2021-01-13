import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "white",
    width: "100vw",
    padding: "0px 10px",
    left: "0px",
  },
  appLogo: {
    color: "#de5c8e",
    cursor: "pointer",
    marginLeft: "30px",
  },
  appLogoXS: {
    marginLeft: "0px",
  },
  rootSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    color: "#de5c8e",
    borderRadius: "30px",
    marginLeft: "70px",
  },
  rootSearchXS: {
    padding: "0px 4px",
    display: "flex",
    alignItems: "center",
    color: "#de5c8e",
    borderRadius: "30px",
    marginLeft: "0px",
    width: "60vw",
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#de5c8e",
  },
  arrowBackIconXS: {
    marginRight: "-10px",
    color: "#de5c8e",
  },

  rootSearchXSOnClick: {
    marginLeft: "-70px",
  },
  inputSearchXS: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#de5c8e",
    fontSize: "15px",
  },
  iconButtonSearch: {
    padding: 10,
  },
  iconButtonSearchXS: {
    marginLeft: "10px",
  },
  menuXS: {
    width: "300px",
  },
  menuIcon: {
    color: "#de5c8e",
    border: "1px solid lightgray",
    borderRadius: "50px",
    zIndex: "100",
  },
  menuIconXS: {
    color: "#de5c8e",
    border: "1px solid lightgray",
    borderRadius: "50px",
    zIndex: "100",
    marginLeft: "-20px",
    padding: "7px",
  },
  menuUsername: {
    fontSize: "15px",
  },
  menuItem: {
    borderBottom: "1px solid lightgray",
    "&:hover": {
      color: "#de5c8e",
    },
    padding: "10px 15px",
    width: "90%",
  },
}));

export default useStyles;
