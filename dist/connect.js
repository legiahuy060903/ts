import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
var firebaseConfig = {
    apiKey: "AIzaSyBLanUabdRGbibfnIPrgYvLFsfmT6XGXKc",
    authDomain: "asmts-c2a97.firebaseapp.com",
    databaseURL: "https://asmts-c2a97-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "asmts-c2a97",
    storageBucket: "asmts-c2a97.appspot.com",
    messagingSenderId: "493171324666",
    appId: "1:493171324666:web:ced89b74427ada0f7d3b43",
    measurementId: "G-JN47B0G51N"
};
var app = initializeApp(firebaseConfig);
var db = getDatabase();
var starCountRef = ref(db, '/product');
onValue(starCountRef, function (snapshot) {
    var data = snapshot.val();
    console.log(data);
});
