var config = {
    apiKey: "AIzaSyANBhr-MarmPOZocqD1sAlg0xkD4HYABYQ",
    authDomain: "ullrtheglorioushw.firebaseapp.com",
    databaseURL: "https://ullrtheglorioushw.firebaseio.com",
    projectId: "ullrtheglorioushw",
    storageBucket: "ullrtheglorioushw.appspot.com",
    messagingSenderId: "1010214756377"
};
firebase.initializeApp(config);

var database = firebase.database();

var player1 = null;
var player2 = null;

var player1Name = "";
var player2Name = "";

var yourPlayerName = "";

var player1Choice = "";
var player2Choice = "";

var turn = 1;

database.ref('players').on("value", function (snapshot) {




    if (snapshot.child("player1").exists) {
        player1 = snapshot.val().player1;
        player1Name = player1.name;
        $("#playerName1").text(player1.name);
        $("#nameData").val("")
        $(".p1Stats").html("Win: " + player1.wins + "<br>" + "Loss: " + player1.losses + "<br>" + "Tie: " + player1.ties);

    } if (snapshot.child("player2").exists) {
        player2 = snapshot.val().player2;
        player1Name = player2.name;
        $("#playerName2").text(player2.name);
        $("#nameData").val("")
        $(".p2Stats").html("Win: " + player2.wins + "<br>" + "Loss: " + player2.losses + "<br>" + "Tie: " + player2.ties);

    }



});









$("#nameSubmit").on("click", function () {

    event.preventDefault();
    humanName = $("#nameData").val().trim();
    console.log(humanName);
    if (($('#nameData').val().trim() !== "") && !(player1 && player2)) {

        if (player1 === null) {
            humanName = $("#nameData").val().trim();
            console.log("adding player 1");
            player1 = {
                name: humanName,
                wins: 0,
                losses: 0,
                ties: 0,
                choice: "",
                turn: 1
            };
            
            database.ref('players/player1').set(player1);
            database.ref('players/player1').onDisconnect().remove();

        } else if ((player1 !== null) && (player2 === null)) {
            console.log('Adding Player 2');

            turn = 1;

            humanName = $("#nameData").val().trim();

            player2 = {
                name: humanName,
                wins: 0,
                losses: 0,
                ties: 0,
                choice: "",
                turn: 2
            };
            $("#playerName2").text(player2.name);
            database.ref('players/player1').update({ 'turn': turn });
            database.ref('players/player2').set(player2);
            database.ref('turn').onDisconnect().remove();
            database.ref('players/player2').onDisconnect().remove();
            
        }
    }
    
    $("#player1").show("fast");
    $("#player2").show("fast");
    $(".jumbotron").slideUp("fast");
});

// player one selections // 
$(".p1Selection").on("click", function () {
    event.preventDefault();
    if (player1 && player2 && (player1Name === player1.name) && (turn === 1)) {
        var choice = $(this).text().trim();
        console.log(choice);
    }


})















// $("#p1rock").on("click", function () {
//     event.preventDefault();
//     console.log("Player one chooses rock");
// });
// $("#p1scissors").on("click", function () {
//     event.preventDefault();
//     console.log("Player one chooses scissors");
// });
// $("#p1paper").on("click", function () {
//     event.preventDefault();
//     console.log("Player one chooses Paper");
// });
// $("#p2rock").on("click", function () {
//     event.preventDefault();
//     console.log("Player two chooses rock");
// });
// $("#p2scissors").on("click", function () {
//     event.preventDefault();
//     console.log("Player two chooses scissors");
// });
// $("#p2paper").on("click", function () {
//     event.preventDefault();
//     console.log("Player two chooses Paper");
// });

