import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import firestore from "../firestore";

class Friend extends Component {
  constructor(props) {
    super(props);
  }
  async markActive(id) {
    let currentDate = new Date();
    let currentLevel = 0;
    await firestore
      .collection("friends")
      .doc(id)
      .get()
      .then(function(doc) {
        currentLevel = doc.data().level;
      });
    currentLevel += 1;
    await firestore
      .collection("friends")
      .doc(id)
      .set(
        {
          lastDay: currentDate,
          level: currentLevel
        },
        { merge: true }
      );
  }

  render() {
    let friend = this.props.friend;
    return (
      <Paper className="fr-li" elevation={1}>
        <span className="nick">{friend.nickname}</span>
        <span className="level"> {friend.level}</span>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          disabled={friend.activeToday}
          className="activity-btn"
          onClick={evt => this.markActive(friend.id)}
        >
          Activity
          <Icon>done_icon</Icon>
        </Button>
      </Paper>
    );
  }
}

export default Friend;
