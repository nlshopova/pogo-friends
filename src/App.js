import React, { Component } from "react";
import FriendsList from "./components/FriendsList";
import FriendsSearch from "./components/FriendsSearch";
import firestore from "./firestore";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      searchVal: ""
    };
    this.onSearch = this.onSearch.bind(this);
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
  onSearch(val) {
    this.setState({
      searchVal: val
    });
  }

  render() {
    return (
      <div className="wrap">
        <header>
          <h1>My PokemonGo friends</h1>
        </header>
        <div className="actions-container">
          <FriendsSearch onSearch={this.onSearch} />
        </div>
        <FriendsList
          friends={this.state.friends}
          filterVal={this.state.searchVal}
        />
      </div>
    );
  }
}

export default App;
