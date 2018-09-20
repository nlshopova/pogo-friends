import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Friend from "./components/Friend";
import firestore from "./firestore";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    };
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

  componentDidMount() {
    firestore.collection("friends").onSnapshot(snapshot => {
      let friends = [];
      snapshot.forEach(doc => {
        const friend = doc.data();
        friend.id = doc.id;
        friends.push(friend);
      });

      let friends2 = friends.map(friend => {
        let currentDate = new Date();
        if (friend.lastDay.getDate() !== currentDate.getDate()) {
          return { ...friend, activeToday: false };
        } else {
          return { ...friend, activeToday: true };
        }
      });

      this.setState({ friends: friends2 });
    });
  }

  render() {
    console.log(this.state.friends);
    return (
      <div className="wrap">
        {this.state.friends.map(friend => {
          return <Friend key={friend.id} friend={friend} />;
        })}
      </div>
    );
  }
}

export default App;
