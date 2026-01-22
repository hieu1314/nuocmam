// ===== Cấu hình Firebase =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { 
  getDatabase,
  ref,
  push
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDehc_TiOR7YkYu1vHUb97L7rrjSkJWRIc",
  authDomain: "nuocmam584-hcmc.firebaseapp.com",
  databaseURL: "https://nuocmam584-hcmc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nuocmam584-hcmc",
  storageBucket: "nuocmam584-hcmc.appspot.com",
  messagingSenderId: "605665531834",
  appId: "1:605665531834:web:3b4a331eb0db4d8763af83",
  measurementId: "G-B9JCP8Q23F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Gắn db ra window để chat-web.js dùng
window.db = db;

// 👇 THÊM
window.firebaseRef = ref;
window.firebasePush = push;