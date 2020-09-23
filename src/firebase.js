import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyCj_tyCfochj_UMaf9qkYZ_XkaTw0NwfYc",
  authDomain: "rc-platform-dev.firebaseapp.com",
  databaseURL: "https://rc-platform-dev.firebaseio.com",
  projectId: "rc-platform-dev",
  storageBucket: "rc-platform-dev.appspot.com",
  messagingSenderId: "131537710287",
  appId: "1:131537710287:web:439f0efdac9391c23d1bba"
};

app.initializeApp(firebaseConfig)

  const db = app.firestore();
  const auth = app.auth();
  const functions = app.functions()

export { db, auth, functions }
