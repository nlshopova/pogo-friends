import firebase from "@firebase/app";
import "@firebase/firestore";

const config = {
    apiKey: "AIzaSyCgXhDZQ0p-PzorcdvnyfJujXotfD1b2ZA",
    authDomain: "pogo-friends-ca25f.firebaseapp.com",
    databaseURL: "https://pogo-friends-ca25f.firebaseio.com",
    projectId: "pogo-friends-ca25f",
    storageBucket: "pogo-friends-ca25f.appspot.com",
    messagingSenderId: "638756163358"  
};

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);
const settings = {timestampsInSnapshots: false};
firestore.settings(settings);


export default firestore;