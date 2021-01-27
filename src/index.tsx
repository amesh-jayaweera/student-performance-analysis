import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIhQ-dRG998Y9GoYEnoh8NwCYd4uVobVQ",
  authDomain: "student-performace-analysis.firebaseapp.com",
  projectId: "student-performace-analysis",
  storageBucket: "student-performace-analysis.appspot.com",
  messagingSenderId: "961015249579",
  appId: "1:961015249579:web:161acaa5d1c28b7d5f55ee",
  measurementId: "G-9KSZCT99W5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
