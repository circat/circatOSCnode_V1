

var http = require('http');
var httpPort = 8080;
var firebase = require('firebase');
var serviceAccount = require("./geodata1.json");

const app = firebase.initializeApp({
  apiKey: "AIzaSyCuHz32HydEyjzPnTgO6Fbw4PIcsTwTlBU",
  authDomain: "geodata1-27120.appspot.com",
  databaseURL: "https://geodata1-27120.firebaseio.com",
  storageBucket: "geodata1-27120.appspot.com",
  messagingSenderId: "363965061200"
 });

//firebase.initializeApp(serviceAccount);
const database = firebase.database(app);

var ref = database.ref("location"); // SELECT DATABASE ( undefined or location,etc)

var firebaseOSC = firebase.database().ref();
//ref.on("value", gotData, errData);
var oscIO = require('./oscIO');

function errData(error) {
  console.log("Something went wrong.");
  console.log(error);
}
// http server
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

var server = http.createServer(handleRequest);

server.listen(httpPort, function(){
    //Callback triggered when server is successfully listening.
    console.log("Server listening on: http://localhost:%s", httpPort);
});

// receieve all firebase data, send to max over osc
firebaseOSC.on("value", function(snapshot) {

    var fbResponse = snapshot.val();
    console.log(snapshot.val());
    var userData = snapshot.val();

    if (typeof userData === 'object') {

          for(slider1  in userData){

          oscIO.send('/a', `/${slider1} ${userData[slider1]}`);
        }
    }
});
