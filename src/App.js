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
    let friends = [];
    firestore.collection("friends").onSnapshot(snapshot => {
   
      snapshot.forEach(doc => {
        const friend = doc.data();
        friend.id = doc.id;
        friends.push(friend);
      });
  
    });
    this.setState({ friends:friends });
  }

  render() {

    return (
      <div className="App">
          {
            console.log(this.state.friends)
          }
      </div>
    );
  }
}

export default App;
