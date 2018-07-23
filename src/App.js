import React, { Component } from 'react';
import firestore from "./firestore";
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
    };
  }

  componentWillMount() {

    firestore.collection("friends").onSnapshot(snapshot => {
      let friends = [];
      snapshot.forEach(doc => {
        const friend = doc.data();
        friend.id = doc.id;
        friends.push(friend);
      });
      this.setState({ friends:friends });
    });

  }

  render() {
    return (
      <div className="App">
         {
            this.state.friends.map((friend) => {
              return (
               <p key={friend.id}>{friend.nickname}</p>
              )
            })
          }
      </div>
    );
  }
}

export default App;
