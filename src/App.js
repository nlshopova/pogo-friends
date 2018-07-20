import React, { Component } from 'react';

import './App.css';

import firebase from 'firebase/app';
import 'firebase/database';
import { DB_CONFIG } from './config';

class App extends Component {
  constructor(props) {
    super(props);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref('friends');

    this.state = {
      friends: [],
    };
  }

  componentWillMount() {
   
    this.database.on('value', snapshot => {
      this.setState({
        friends: snapshot.val()
        });
      });
  }

  render() {
    const friends = this.state.friends;

    return (
      <div className="App">

     {friends.map(item => (
             <p key={item.id}>
              {item.nickname}
           </p>
         ))}
      </div>
    );
  }
}

export default App;
