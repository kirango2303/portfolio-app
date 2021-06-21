import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
const app = firebase.initializeApp({
    apiKey: "AIzaSyC-ke6ogtS8wJ0WSe-UYunJO9Pg5mYmELc",
    authDomain: "stocksapp-72382.firebaseapp.com",
    projectId: "stocksapp-72382",
    storageBucket: "stocksapp-72382.appspot.com",
    messagingSenderId: "528266581761",
    appId: "1:528266581761:web:0c46ec5293c51597962d00"
})

export const db = app.firestore()
export const auth = app.auth()
export default app