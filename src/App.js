import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
      // <div className="App">
      //   {this.state.friends.map(friend => {
      //     return (
      //       <p key={friend.id}>
      //         {friend.nickname}{" "} level {friend.level}
      //         <button onClick={evt => this.markActive(friend.id)} disabled={friend.activeToday}>
      //           Activity
      //         </button>
      //       </p>
      //     );
      //   })}
      // </div>
      <div className="wrap">
      <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nickname</TableCell>
            <TableCell numeric>Level</TableCell>
            <TableCell>Active today</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.friends.map(friend => {
            return (
              <TableRow key={friend.id}>
                <TableCell component="th" scope="row">
                  {friend.nickname}
                </TableCell>
                <TableCell numeric>{friend.level}</TableCell>
                <TableCell><button onClick={evt => this.markActive(friend.id)} disabled={friend.activeToday}>Yes</button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    </div>
    );
  }
}

export default App;
