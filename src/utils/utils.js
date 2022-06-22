import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { configureStore } from '@reduxjs/toolkit';
import { firebaseConfig } from "../firebase";
import { rootReducer } from "../store/reducer/rootReducer";

export const store = configureStore({
   reducer: rootReducer
 });

export const signIn = (userEmail, password) => {
    firebase.initializeApp(firebaseConfig);
    return firebase.auth().signInWithEmailAndPassword(userEmail, password);
};

export const signUp = (userEmail, verificationPassword) => {
    firebase.initializeApp(firebaseConfig);
    return firebase.auth().createUserWithEmailAndPassword(userEmail, verificationPassword);
};

export const generateID = () => Number(String(Date.now()).split("").splice(-3, 3).join(""));

