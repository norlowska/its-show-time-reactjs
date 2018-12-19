import firebase from 'firebase';

var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);

  const auth = firebase.auth();

  auth.signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  auth.signin = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const db = firebase.database();

  db.user = uid => db.ref(`users/${uid}`);
  db.users = () => db.ref('users');

  export { auth, db };