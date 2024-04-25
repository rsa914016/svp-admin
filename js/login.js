const firebaseConfig = {
    apiKey: "AIzaSyBreCJDwBdF_HdIb2syX_rLgpkdLKUann0",
    authDomain: "contactform-f9a9b.firebaseapp.com",
    databaseURL: "https://contactform-f9a9b-default-rtdb.firebaseio.com",
    projectId: "contactform-f9a9b",
    storageBucket: "contactform-f9a9b.appspot.com",
    messagingSenderId: "601343494066",
    appId: "1:601343494066:web:0210cadcb1850b4dfdc6ab"
  };
  
firebase.initializeApp(firebaseConfig);
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.uname.value;
    const password = loginForm.password.value;
    signInUser(username, password);
});


// Function to sign in a user
function signInUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("User signed in:", user);
        localStorage.setItem('mail', user.email);
        Swal.fire({
            title: "Login Successfull!",
            text: "Welcome To UCEK Portal",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
              document.getElementById("loginForm").reset();
              window.location.href = "admin.html";
          });
        // You can perform further actions after the user has signed in successfully
      }).catch((error) => {
        var errorCode = error.code;
        // console.log(errorCode)
        if(errorCode === "auth/invalid-email"){
          var errorMessage = error.message;
        } else {
          var errorMessage = "Please Check Your UserName and Password.";
        }
          Swal.fire({
              icon: "error",
              title: "Invalid Credentials!",
              confirmButtonColor:"#0d6efd",
              text: errorMessage,
              // timer: 2000
            }).then(() => {
              document.getElementById("loginForm").reset();
            });
        console.error("Sign-in error:", errorMessage);
        // Handle sign-in errors here
      });
}

