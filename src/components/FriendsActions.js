import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FriendsSearch from "./FriendsSearch";

class FriendsActions extends Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleCheck(e) {
    this.props.onHideActiveCheck(e.target.checked);
  }
  render() {
    return (
      <div className="actions-container">
        <FriendsSearch
          onSearch={this.props.onSearch}
          filterVal={this.props.filterVal}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.showInactiveOnly}
              onChange={this.handleCheck}
            />
          }
          label="Hide active today"
          className="active-checkbox"
        />
      </div>
    );
  }
}

export default FriendsActions;
