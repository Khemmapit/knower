import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profile: {
    padding: "10px",
    width: "100vw",
  },
  // profile Top of the line
  profileInfo: {
    padding: "10px 30px",
    justifyContent: "center",
    marginBottom: "10px",
  },
  profileInfoAvatar: {
    height: "125px",
    width: "125px",
  },
  profileDetails: {
    maxWidth: "600px",
  },
  profileDetailsName: {
    fontWeight: "555",
  },
  editIcon: {
    border: "1px solid #de5c8e",
    color: "#d35c8e",
    margin: "0px 10px",
    "&:hover": {
      backgroundColor: "#de5c8e",
      color: "white",
    },
  },
  profileDetailsPurpose: {
    fontSize: "15px",
    color: "#d35c8e",
    fontWeight: "600",
  },
  networkContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
  },
  networkInfo: {
    border: "1px solid lightgray",
    borderRadius: "10px",
    padding: "10px",
    cursor: "pointer",
    marginRight: "30px",
    "&:hover": {
      backgroundColor: "#de5c8e",
      color: "white",
    },
  },

  // profile Bottom of the line
  bottomHeadline: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  headlinetText: {
    margin: "10px 5px",
    padding: "5px",
    color: "#de5c8e",
    cursor: "pointer",
    "&:hover": {
      borderBottom: "2px solid lightgray",
    },
  },
  headlinetTextOnClick: {
    borderBottom: "2px solid lightgray",
  },
  // Content

  // Collection
  rootSearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    color: "#de5c8e",
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#de5c8e",
  },
  iconButtonSearch: {
    padding: 10,
  },
  collection: {
    padding: "10px 30px",
  },
  collectionName: {
    color: "#de5c8e",
    padding: "10px 20px",
  },
  postContainer: {},
  post: {
    margin: "100px",
  },
}));

export default useStyles;
