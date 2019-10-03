// create a automaticly update clock 
var update = function () {
    var i = moment().format('MMMM Do YYYY, h:mm:ss a');
    $(".currentTime").text(i);
}
setInterval(update, 1000);


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAw2g-6cn961_7gRFlb6dk4t-MrcMTJJlA",
    authDomain: "train-timer-d4ba0.firebaseapp.com",
    databaseURL: "https://train-timer-d4ba0.firebaseio.com",
    projectId: "train-timer-d4ba0",
    storageBucket: "",
    messagingSenderId: "367902522092",
    appId: "1:367902522092:web:8a773d0cab1db4c583c3c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//Whenver we click submit button
$("#add-train").on("click", function () {
    event.preventDefault();
    //Getting user input
    var tname = $("#name-input").val();
    var tdestination = $("#destination-input").val();
    var tfrequency = $("#frequency-input").val();
    var firstTime = $("#time-input").val();

    //converted time to a variable we can use
    var firstConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Difference between the times
    var diffTime = moment().diff(firstConverted, "minutes");
    console.log(diffTime);

    //Time Apart
    var tRemainder = diffTime % tfrequency;
    console.log(tRemainder);

    //minute away
    var minuteAway = tfrequency - tRemainder;
    console.log(minuteAway);

    //Next Train
    var nextTrain = moment().add(minuteAway, "minutes");
    var realnextTrain = moment(nextTrain).format("hh:mm A");
    console.log(realnextTrain);



    //link it to Firebase
    database.ref().push({
        name: tname,
        destination: tdestination,
        frequency: tfrequency,
        nextTrain: realnextTrain,      
        timeRemain: minuteAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// updating on a new serverlink is created
database.ref().on("child_added", function (snapshot) {
    var sv = snapshot.val();

    var newRow = $("<tr>").append(
        $("<td>").text(sv.name),
        $("<td>").text(sv.destination),
        $("<td>").text(sv.frequency),
        $("<td>").text(sv.nextTrain),
        $("<td>").text(sv.timeRemain)
    );

    $(".newRow").append(newRow);
});


