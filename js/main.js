// Declaring all the variables

const start = document.getElementById("buttonStart");
const hit = document.getElementById("buttonHit");
const stand = document.getElementById("buttonStand");
let player, dealer;
let playerScore = document.getElementById("pScore");
const dealerScore = document.getElementById("dScore");
const playerCards = document.getElementById("playerCards");
const dealerCards = document.getElementById("dealerCards");
let playerPoint = 0;
let dealerHand = [];
let playerHand = [];
let pTotal = 0;
let dTotal = 0;


// events 
start.addEventListener("click", randomCards);

hit.addEventListener("click", hitCard);
stand.addEventListener("click", stand);

// Generate Rondam cards
const suits = ["S", "D", "C", "H"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let score = 0;

cards = [];
suits.forEach(function(suit){                              // Going through suit which are S, D, C, H.
    values.forEach(function(value){                        // Another function which is going through values.
       const comCards = `${value}${suit}`; 
       if(value === "A" && (pTotal < 15 || dTotal < 15)){
           score = 11;
       } else if (value === "A" && (pTotal > 15 || dTotal > 15)) {
           score = 1;
       } else if (value === "J" || value === "Q" || value === "K") {
           score = 10;
       } else {
           score = parseInt(value);
       }
                                                           // Concatenates value and suit.
       const card = {                                      // Creating an object for each cards.
           imagePath: `images/cards/${comCards}.png`,   // Connecting image path to actual image.
           value: value,
           suit: suit,
           score: score
       }
       cards.push(card);                                    // Creating card object to cards array.
    })
})

//Generating Random Cards

function randomCards(){
    clearcontent();
    let randomNum = Math.floor(Math.random() * cards.length);
    let numTwo = Math.floor(Math.random() * cards.length);
    let numThree = Math.floor(Math.random() * cards.length);
    playerHand.push(cards[randomNum], cards[numTwo]);
    dealerHand.push(cards[numThree]);
    console.log(playerHand);
    startGame();
}
function clearcontent() { 
    playerHand = [];
    dealerHand = [];
    console.log(playerHand);
} 
// start the game when start button is clicked
function startGame(){
    playerCards.innerHTML = "";
    for( i = 0; i < playerHand.length; i++) {
        let firstCard = document.createElement("img");
        firstCard.setAttribute("src", playerHand[i].imagePath);
        playerCards.appendChild(firstCard);
    }
    dealerCards.innerHTML = "";

    for( i = 0; i < dealerHand.length; i++) {
        let backOfCard = document.createElement("img");
        backOfCard.setAttribute("src", "images/cards/blue_back.png");
        playerCards.appendChild(backOfCard);
        let secondCard = document.createElement("img");
        secondCard.setAttribute("src", dealerHand[i].imagePath);
        dealerCards.appendChild(secondCard);
    }
    checkScore();
    console.log(playerHand);
}

// update both scores

function checkScore(){
    pTotal = 0;
    for( i = 0; i < playerHand.length; i++){
        pTotal += playerHand[i].score;
    }
    dTotal = 0;
    for( j = 0; j < dealerHand.length; j++){
        dTotal += dealerHand[j].score;
    }
    playerScore.innerHTML = pTotal;
    dealerScore.innerHTML = dTotal;

    console.log(pTotal);
    console.log(dTotal);
    // pleyerScore.innerHTML = pTotal;
}
// hit card funtion 

function hitCard(){
    let randomNum = Math.floor(Math.random() * cards.length);
    playerHand.push(cards[randomNum]);
    let newCard = document.createElement("img");
    newCard.setAttribute("src", cards[randomNum].imagePath);
    playerCards.appendChild(newCard);
    pTotal += cards[randomNum].score;
    playerScore.innerHTML = pTotal;
}