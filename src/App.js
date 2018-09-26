import React, { Component } from "react";
import FriendsList from "./components/FriendsList";
import FriendsActions from "./components/FriendsActions";
import firestore from "./firestore";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      searchVal: "",
      showInactiveOnly: false
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
          <FriendsActions
            onSearch={this.onSearch}
            filterVal={this.state.searchVal}
          />
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
