import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
class FriendsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: ""
    };
    this.setSearchWord = this.setSearchWord.bind(this);
  }
  setSearchWord(event) {
    this.props.onSearch(event.target.value);
    this.setState({ searchWord: event.target.value });
  }
  render() {
    return (
      <TextField
        type="search"
        className="friends-search"
        margin="normal"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search_icon</Icon>
            </InputAdornment>
          )
        }}
        value={this.state.searchWord}
        onChange={this.setSearchWord}
      />
    );
  }
}

export default FriendsSearch;
