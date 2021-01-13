import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  profile: {
    padding: "10px 0px",
    width: "100vw",
    overflow: "hidden",
  },
  // profile Top of the line
  profileInfo: {
    padding: "10px 30px",
    justifyContent: "center",
    marginBottom: "10px",
  },
  profileInfoXS: {
    padding: "10px 10px",
    justifyContent: "center",
    marginBottom: "10px",
  },
  profileInfoAvatar: {
    height: "125px",
    width: "125px",
  },
  profileInfoAvatarSM: {
    height: "100px",
    width: "100px",
  },
  profileInfoAvatarXS: {
    height: "50px",
    width: "50px",
  },
  profileDetails: {
    maxWidth: "600px",
  },
  profileDetailsName: {
    fontWeight: "555",
  },
  profileDetailsNameSM: {
    fontSize: "25px",
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
  editDialog: {
    width: "100%",
  },
  profileDetailsPurpose: {
    fontSize: "15px",
    color: "#d35c8e",
    fontWeight: "600",
  },
  profileDetailsPurposeSM: {
    fontSize: "13px",
    color: "#d35c8e",
    fontWeight: "600",
  },
  profileDetailsPurposeXS: {
    fontSize: "12px",
    color: "#d35c8e",
    fontWeight: "600",
    maxWidth: "333px",
    padding: "10px 0px",
  },
  profileInfoTopDetails: {
    maxWidth: "450px",
  },
  // User network
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
  networkInfoSM: {
    border: "1px solid lightgray",
    borderRadius: "10px",
    padding: "7px",
    cursor: "pointer",
    marginRight: "20px",
    fontSize: "15px",
    "&:hover": {
      backgroundColor: "#de5c8e",
      color: "white",
    },
  },
  networkInfoXS: {
    border: "1px solid lightgray",
    borderRadius: "10px",
    padding: "5px",
    cursor: "pointer",
    fontSize: "13px",
    "&:active": {
      backgroundColor: "#de5c8e",
      color: "white",
    },
  },
  profileInfoDescription: {
    maxWidth: "500px",
  },
  profileDescriptionXS: {
    maxWidth: "333px",
    fontSize: "12px",
  },
  followUser: {
    cursor: "pointer",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "#de5c8e",
      color: "white",
      borderRadius: "20px",
    },
  },

  // profile Bottom of the line
  bottomHeadline: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  bottomHeadlineBox: {
    display: "flex",
    alignItems: "center",
    margin: "0px 10px",
  },
  bottomHeadlineBoxIcon: {
    color: "#de5c8e",
  },
  headlineText: {
    margin: "10px 5px",
    padding: "5px",
    color: "#de5c8e",
    cursor: "pointer",
    display: "flex",
    alignItem: "center",
    "&:hover": {
      borderBottom: "2px solid lightgray",
    },
  },
  headlineTextSM: {
    margin: "10px 5px",
    padding: "5px",
    color: "#de5c8e",
    cursor: "pointer",
    fontSize: "15px",
    "&:hover": {
      borderBottom: "1px solid lightgray",
    },
  },
  headlineTextOnClick: {
    borderBottom: "2px solid #de5c8e",
    "&:hover": {
      borderBottom: "2px solid #de3c8e",
    },
  },
  headlineTextSMOnClick: {
    borderBottom: "1px solid #de5c8e",
    "&:hover": {
      borderBottom: "1px solid #de3c8e",
    },
  },
  bottomBody: {
    width: "100vw",
    padding: "0px 5px",
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
  rootSearchXS: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "200px",
    color: "#de5c8e",
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#de5c8e",
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
  collection: {
    padding: "10px 30px",
    width: "90vw",
  },
  collectionXS: {
    padding: "0px",
    width: "90vw",
  },
  collectionHeader: {
    width: "100%",
    borderBottom: "1px solid lightgray",
  },
  collectionHeaderXS: {
    width: "85vw",
    borderBottom: "1px solid lightgray",
  },
  collectionName: {
    color: "#de5c8e",
    padding: "10px 20px",
  },
  collectionNameXS: {
    color: "#de5c8e",
    padding: "5px 10px",
    width: "80vw",
  },
  post: {
    margin: "100px",
  },
  bottomCollectionContainer: {
    width: "100vw",
    border: "5px solid black",
    backgroundColor: "#de5c8e",
  },
}));

export default useStyles;
