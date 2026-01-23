// firebase-config.js – Firebase COMPAT (JS thường)

/* Firebase core */
var firebaseConfig = {
  apiKey: "AIzaSyDehc_TiOR7YkYu1vHUb97L7rrjSkJWRIc",
  authDomain: "nuocmam584-hcmc.firebaseapp.com",
  databaseURL: "https://nuocmam584-hcmc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nuocmam584-hcmc",
  storageBucket: "nuocmam584-hcmc.appspot.com",
  messagingSenderId: "605665531834",
  appId: "1:605665531834:web:3b4a331eb0db4d8763af83"
};

/* Init */
firebase.initializeApp(firebaseConfig);

/* Global DB */
window.db = firebase.database();
