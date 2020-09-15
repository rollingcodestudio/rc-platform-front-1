import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyCV4c-Veo4dAZv0DtDCnVbhnjC1pOApxtg",
    authDomain: "rolling-firebase.firebaseapp.com",
    databaseURL: "https://rolling-firebase.firebaseio.com",
    projectId: "rolling-firebase",
    storageBucket: "rolling-firebase.appspot.com",
    messagingSenderId: "212868670508",
    appId: "1:212868670508:web:6a5b60809dabbc8a81dd89"
};

app.initializeApp(firebaseConfig)

  const db = app.firestore();
  const auth = app.auth();
  const functions = app.functions()

export { db, auth, functions }
