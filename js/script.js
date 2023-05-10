// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";
import {
    getAuth,
    initializeAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import {
    getDatabase,
    query,
    ref,
    child,
    get,
    set,
    onValue,
    orderByChild,

} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPBJ9rehUVaMyFgDMbZjGF6SVtBJs_7aI",
    authDomain: "jbenefits-77137.firebaseapp.com",
    databaseURL: "https://jbenefits-77137-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jbenefits-77137",
    storageBucket: "jbenefits-77137.appspot.com",
    messagingSenderId: "175872531617",
    appId: "1:175872531617:web:da3a711c10eeca570ea4e0",
    measurementId: "G-8FVFT6V1ZC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//Reading the data in the database
const db = getDatabase();
const memberRef = query(ref(db, "members"));


$(document).ready(function () {

    getPlayerData();

    function getPlayerData() {
        //const memberRef = ref(db,"members")
        //playerRef is declared at the top using a constant 
        //get(child(db,`members`/))
        get(memberRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    try {
                        //Spawn a card with each player stats=
                        var content = "";
                        snapshot.forEach((childSnapshot) => {
                            $("#members").append(`<div class="card" style="width: 18rem;">
                            <div class="card-body">
                              <h5 class="card-title">${childSnapshot.child("userName").val()}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">${childSnapshot.child("email").val()}</h6>
                             
                            </div>
                          </div>`)
                            // loop through the data collected
                            
                        });

                    } catch (error) {
                        console.log("Error getPlayerData" + error);
                    }

                }
            });

    } //end get Player data



    const auth = getAuth();

    $("#signUp").click(function () {
       
  //CreateUser($("#email").val(), $("#email").val())
  
  CreateUser($("#name").val(),$("#email").val(),$("#password").val())

})

    /*function CreateUser(name, email, password) {
        
        console.log("Creating the user")
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user.toString();
            CreateMembers($("#name").val(),$("#email").val(),user)
            console.log("created user" + name);
            alert("Your account has been created. Please log in")
            $(location).attr('href', 'index.html')


        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ErrorCode:${errorCode} -> Message: ${errorMessage}`)
        });
    }*/

    function CreateUser(name, email, password) {
        console.log("Creating the user")
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("created user " + name);
            const user = userCredential.user.uid;
            
            CreateMembers(user, $("#name").val(), $("#email").val());
            console.log("created user ..." + user);
            console.log("User is now created");
            alert("Your account has been created. Please log in")
            $(location).attr('href', 'index.html')

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`ErrorCode:${errorCode} -> Message: ${errorMessage}`)
        });
    }

    function CreateMembers(uuid, name, email) {
        console.log()

        var currentTimestamp = new Date().getTime();
        var playerData = {
            active: true,
            createdOn: currentTimestamp,
            displayName: name,
            email: email,
            lastLoggedIn: currentTimestamp,
            updatedOn: currentTimestamp,
            userName: name,

        }
        set(ref(db, `members/${uuid}`), playerData);

    }

    function getTimeUnix(){
        DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds()
    }


    //Create a player object that saves the player display name inside the database when auth is created
    //PlayerName
    //playerEmail
    //player created on
    //new Date($.now())
    //playerlastloggedin

    $("#logIn").click(function () {
        signInUser($("#logInEmail").val(),$("#logInPassword").val())

    })
        function signInUser(email, password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user.uid;
                    console.log( user + " is now signed in");
                    //getPlayerName(user);
                    $(location).attr('href', 'home.html');
                    ;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            }

            function getPlayerName(uuid){
                get(db, memberRef)
                .then((snapshot) => {
                    if (snapshot.exists()){
                        try {
                            console.log('hellow')
                            let playerName ='';
                            snapshot.forEach((childSnapshot)=> {
                                console.log(childSnapshot)
                                if(childSnapshot == uuid){
                                    
                                    playerName = childSnapshot.child("userName").val();
                                    console.log(playerName)
                                    alert("Welcome back" + playerName)
                                }
                            })
                            alert("Welcome back" + playerName)
                           
                        } catch (error) {
                            console.log("Error getPlayerName" + error);
                        }
                    }
                })

            }



















});