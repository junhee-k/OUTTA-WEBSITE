import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";

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

console.log(window.location.href)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if(window.location.href == 'http://127.0.0.1:5500/signin.html'){
    console.log("22222222");
    signin.addEventListener('click',(e) => {

        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
    
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('Sign in successful!')
            console.log(user);
            window.location = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            alert(errorMessage);
        });
    });
}

if(window.location.href == 'http://127.0.0.1:5500/signup.html'){
    signup.addEventListener('click',(e) => {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              alert('user created!');
              window.location = 'signin.html';
              // ...
            })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
      
              alert(errorMessage);
          })
    });
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    document.getElementById('login_div').style.display = 'none';
    document.getElementById('loggedin').style.display = 'block';
    document.getElementById('welcome').innerHTML = user.email;
    console.log("111111111");
  } else {
    // User is signed out
    // ...
    document.getElementById('login_div').style.display = 'block';
    document.getElementById('loggedin').style.display = 'none';
  }
});

logout.addEventListener('click',(e) => {
    auth.signOut();
    alert("User logged out");
});

if(window.location.href == 'http://127.0.0.1:5500/blog.html'){
    const db = getFirestore();
    const colRef = collection(db, 'posts');
    var files = [];

    var fileInput = document.getElementById('file');

    fileInput.onchange = e => {
      files = e.target.files;
      console.log(files);
    };

    const storage = getStorage();

    post.addEventListener('click',(e) => {
        var title = document.getElementById('title').value;
        var body = document.getElementById('body').value;
        var download;

        const storageRef = ref(storage, "jaryo/"+files[0].name);

        console.log(title);
        console.log(body);
        console.log(files[0]);

        // uploadBytes(storageRef, files[0]).then((snapshot) => {
        //   console.log('Uploaded a blob or file!');
        // });
        const uploadTask = uploadBytesResumable(storageRef, files[0]);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            console.log(downloadURL);
            download = downloadURL;
          });
        }
        );

        console.log(download);

        addDoc(colRef, {
          title: title,
          body: body,
          //file: download
        });
        alert("Post done");
    });

    // getDoc(colRef, (snapshot) => {
    //   let posts = [];
    //   snapshot.docs.forEach((doc) => {
    //     posts.push({...doc.data(), id: doc.id})
    //   });
    //   console.log(posts);
    // });

    onSnapshot(colRef, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({...doc.data(), id: doc.id})
      });
      console.log(posts);
    });
}