importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyBknGDde114KjDnfMDtw3u4TGx2NOmMCAI",
    authDomain: "pbox-b4a17.firebaseapp.com",
    databaseURL: "https://pbox-b4a17-default-rtdb.firebaseio.com",
    projectId: "pbox-b4a17",
    storageBucket: "pbox-b4a17.appspot.com",
    messagingSenderId: "1049009016949",
    appId: "1:1049009016949:web:f8f3dec8b1f17cd089283c",
    measurementId: "G-4CTHF77ME6"
});
const messaging = firebase.messaging();