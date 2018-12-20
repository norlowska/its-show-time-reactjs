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
const db = firebase.database();

db.user = uid => db.ref(`users/${uid}`);
db.users = () => db.ref('users');

auth.signup = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(function (success) {
      var userId = auth.currentUser.uid;
      db.ref('users/' + userId).set({
        uid: userId,
        email: email,
        movies: []
      });
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      switch (errorCode) {
        case 'auth/email-already-in-use':
          console.log('Account with given email address already exists');
          break;
        case 'auth/invalid-email':
          console.log('Invalid email address.');
          break;
        case 'auth/operation-not-allowed':
          console.log('Operation not allowed');
          break;
        case 'auth/weak-password':
          console.log('The password is too weak.');
          break;
        default:
          console.log(errorMessage);
      }
      console.log(error);
    });

}

auth.signin = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
  .then((success) => console.log(auth.currentUser))
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      switch (errorCode) {
        case 'auth/user-disabled':
          alert('Your account is disabled.');
          break;
        case 'auth/invalid-email':
          alert('Invalid email address.');
          break;
        case 'auth/user-not-found':
          alert('Account with given email address not found.');
          break;
        case 'auth/wrong-password':
          alert('Wrong password.');
          break;
        default:
          alert(errorMessage);
      }
      console.log(error);
    });
}

export { auth, db };