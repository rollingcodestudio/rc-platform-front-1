import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyAQg5D7WciYfTHbjWuDmnLyrBkfW-ic1-A",
  authDomain: "rc-platform-cd66d.firebaseapp.com",
  databaseURL: "https://rc-platform-cd66d.firebaseio.com",
  projectId: "rc-platform-cd66d",
  storageBucket: "rc-platform-cd66d.appspot.com",
  messagingSenderId: "782097918156",
  appId: "1:782097918156:web:28c3262f6be931131dba69"
};

app.initializeApp(firebaseConfig)

  const db = app.firestore();
  const auth = app.auth();
  const functions = app.functions()

export { db, auth, functions }
