import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDYylkbmpB6ECD-itrpUUWSSnSmeCQoQ7w",
  authDomain: "rc-platform-staging.firebaseapp.com",
  databaseURL: "https://rc-platform-staging.firebaseio.com",
  projectId: "rc-platform-staging",
  storageBucket: "rc-platform-staging.appspot.com",
  messagingSenderId: "289235972677",
  appId: "1:289235972677:web:cfb149a5cc635b1b07292c"
};

app.initializeApp(firebaseConfig)

  const db = app.firestore();
  const auth = app.auth();
  const functions = app.functions()

export { db, auth, functions }
