import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import firestore from "../firestore";
import Friend from "./Friend";

class FriendsList extends Component {
  constructor(props) {
    super(props);
  }

  filterFriends(query) {
    return this.props.friends.filter(
      el => el.nickname.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }
  render() {
    // let friends = this.props.friends.sort(
    //   (a, b) =>
    //     a.activeToday - b.activeToday || a.nickname.localeCompare(b.nickname)
    // );
    // let friends = this.props.friends.filter(a => a.activeToday != true);
    // let friends2 = this.props.friends.sort(
    //   (a, b) => a.level - b.level || a.nickname.localeCompare(b.nickname)
    // );
    let friends2 = this.filterFriends(this.props.filterVal);

    return (
      <div className="friends-container">
        <div className="friends-list">
          {friends2.map(friend => {
            return <Friend key={friend.id} friend={friend} />;
          })}
        </div>
      </div>
    );
  }
}

export default FriendsList;
