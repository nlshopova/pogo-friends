import React, { Component } from "react";
import FriendsSearch from "./FriendsSearch";

class FriendsActions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="actions-container">
        <FriendsSearch
          onSearch={this.props.onSearch}
          filterVal={this.props.filterVal}
        />
      </div>
    );
  }
}

export default FriendsActions;
