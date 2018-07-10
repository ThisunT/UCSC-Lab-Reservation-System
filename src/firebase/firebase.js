// import React from 'react';
import * as firebase from 'firebase';

// Initialize Firebase

const config = {
    apiKey: "AIzaSyCD4-hE_WGiyvCAxiEoYYicEYSPMRAWMKc",
    authDomain: "lab-reservation-system-fa7f7.firebaseapp.com",
    databaseURL: "https://lab-reservation-system-fa7f7.firebaseio.com",
    projectId: "lab-reservation-system-fa7f7",
    storageBucket: "",
    messagingSenderId: "324097860747"
};


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export {
    auth,
    database
};