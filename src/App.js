import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FriendsList from "./components/FriendsList";
import firestore from "./firestore";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: []
    };
  }
  componentDidMount() {
    firestore.collection("friends").onSnapshot(snapshot => {
      let friendsData = [];
      snapshot.forEach(doc => {
        const friend = doc.data();
        friend.id = doc.id;
        friendsData.push(friend);
      });

      let friends = friendsData.map(friend => {
        let lastDate = friend.lastDay.toDateString();
        let currentDate = new Date().toDateString();
        if (lastDate != currentDate) {
          return { ...friend, activeToday: false };
        } else {
          return { ...friend, activeToday: true };
        }
      });

      this.setState({ friends: friends });
    });
  }

  render() {
    return (
      <div className="wrap">
        <header>
          <h1>My PokemonGo friends</h1>
        </header>
        <FriendsList friends={this.state.friends} />
      </div>
    );
  }
}

export default App;
