import {
  IconButton,
  InputBase,
  Paper,
  useMediaQuery,
  Typography,
  Grid,
  Box,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./HeaderStyles";
import { useHistory } from "react-router-dom";
import { selectSearch, userSearch } from "../searchResult/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchOption from "./components/SearchOption";

const HeaderSearch = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const [input, setInput] = useState("");
  const isSmall = useMediaQuery("(max-width:960px)");
  const isXSmall = useMediaQuery("(max-width:600px)");
  const [searchOnFocus, setSeearchOnFocus] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    if (input) {
      dispatch(
        userSearch({
          hashtag: input,
        })
      );
      history.replace(`/search:${input}`);
    }
  };

  const handleSearchOnFocus = () => {
    console.log("search on focus");
    if (searchOnFocus) {
      setSeearchOnFocus(false);
    } else {
      setSeearchOnFocus(true);
    }
  };

  // <Paper component="div" className={ isXSmall ?styles.rootSearchXS :  styles.rootSearch} onClick={handleSearchOnFocus}>
  // </Paper>

  {
    /* <Grid container direction="column"  justify="stretch">
        <Grid item>
            <InputBase
                className={ isXSmall ? styles.inputSearchXS : styles.inputSearch}
                placeholder={`${isSmall ? "Search" : "Search on Knower"}`}
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <IconButton
                type="submit"
                className={styles.iconButtonSeach}
                aria-label="search"
                onClick={handleSearch}
            >
                <SearchIcon />
            </IconButton>
        </Grid>
        </Grid> */
  }

  return (
    <Autocomplete
      freeSolo={true}
      style={{ flex: "1" }}
      id="search-input-header"
      disableClearable
      size={isSmall ? "small" : "medium"}
      inputValue={input}
      onChange={(event) => setInput(event.target.value)}
      options={last10Search}
      getOptionLabel={(option) => option.text}
      getOptionSelected={(option) => option.text}
      renderOption={(option) => (
        <SearchOption text={option.text} type={option.type} />
      )}
      renderInput={(params) => {
        console.log(params);
        return (
          <Box
            component="form"
            className={styles.searchBox}
            alignItems="center"
          >
            <TextField
              {...params}
              label="Search"
              margin="normal"
              variant="outlined"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              fullWidth
              InputProps={{ ...params.InputProps, type: "search" }}
            />
            {!isXSmall && (
              <IconButton>
                <SearchIcon fontSize={isSmall ? "small" : "medium"} />
              </IconButton>
            )}
          </Box>
        );
      }}
    />
  );
};

export default HeaderSearch;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const last10Search = [
  { text: "React", type: "content" },
  { text: "React native", type: "content" },
  { text: "#Javascript", type: "hashtag" },
  { text: "#Typescript", type: "hashtag" },
  { text: "Mark Zuckerberg", type: "profile" },
  { text: "Marc Andressen", type: "profile" },
];
