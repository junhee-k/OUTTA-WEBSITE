// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkYCEpe-_MsdJrf6ljlptfyqTzcM8CvFs",
  authDomain: "outta-website.firebaseapp.com",
  projectId: "outta-website",
  storageBucket: "outta-website.appspot.com",
  messagingSenderId: "464541642283",
  appId: "1:464541642283:web:8b042c7bd0b35b39a0846e",
  measurementId: "G-H1MFQST9JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



signup.addEventListener('click',(e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        alert('user created!');
        // ...
      })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
    })
});
