// Declaring all the variables

const start = document.getElementById("buttonStart");
const hit = document.getElementById("buttonHit");
const stand = document.getElementById("buttonStand");
let player, dealer;
let playerScore = document.getElementById("pScore");
const dealerScore = document.getElementById("dScore");
const playerCards = document.getElementById("playerCards");
const dealerCards = document.getElementById("dealerCards");
let message = document.getElementById("playerWin");
const bet = document.getElementById("bet");
const displayMoney = document.getElementById("bettedMoney");
let playerMoney = document.getElementById("money");
let dealerHand = [];
let playerHand = [];
let pTotal = 0;
let dTotal = 0;
hit.disabled = false;
let money = 500;
let bettedAmount = 0;

// events 
start.addEventListener("click", randomCards);
hit.addEventListener("click", hitCard);
stand.addEventListener("click", standButton);
bet.addEventListener("click", getBetMoney);
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
    
    
function getBetMoney(){
    bettedAmount = document.getElementById("inputMoney").value;
    displayMoney.innerText = bettedAmount;
    document.getElementById("inputMoney").value = "";
    money -= bettedAmount;
    playerMoney.innerText = money;

}


//Generating Random Cards

function randomCards(){
    clearContent();
    let randomNum = Math.floor(Math.random() * cards.length);
    let numTwo = Math.floor(Math.random() * cards.length);
    let numThree = Math.floor(Math.random() * cards.length);
    playerHand.push(cards[randomNum], cards[numTwo]);
    dealerHand.push(cards[numThree]);
    startGame();
}
function clearContent() { 
    playerHand = [];
    dealerHand = [];
    pTotal = 0;
    dTotal = 0;
    hit.disabled = false;
    stand.disabled = false;
} 
// start the game when start button is clicked
function startGame(){
    playerCards.innerHTML = "";
    message.innerText = " ";
    
    for( i = 0; i < playerHand.length; i++) {
        let firstCard = document.createElement("img");
        firstCard.setAttribute("src", playerHand[i].imagePath);
        playerCards.appendChild(firstCard);
    }
    dealerCards.innerHTML = "";
    for( i = 0; i < dealerHand.length; i++) {
        let backOfCard = document.createElement("img");
        backOfCard.setAttribute("src", "images/cards/blue_back.png");
        dealerCards.appendChild(backOfCard);
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
    if(pTotal === 21) {
        playerWin.innerHTML ="BlackJack";
        money = money + (bettedAmount * 2);
        playerMoney.innerText = money;
        hit.disabled = true;
        stand.disabled = true;
    }
    dTotal = 0;
    for( j = 0; j < dealerHand.length; j++){
        dTotal += dealerHand[j].score;
    }
    if(dTotal === 21) {
        playerWin.innerHTML ="Dealer BlackJack";
        money -= bettedAmount;
        playerMoney.innerText = money;
        hit.disabled = true;
        stand.disabled = true;
    }
    playerScore.innerHTML = pTotal;
    dealerScore.innerHTML = dTotal;

    console.log(pTotal);
    console.log(dTotal);
}

function hitCard(){
    let randomNum = Math.floor(Math.random() * cards.length);
    playerHand.push(cards[randomNum]);
    let newCard = document.createElement("img");
    newCard.setAttribute("src", cards[randomNum].imagePath);
    playerCards.appendChild(newCard);

    playerHand.forEach(function(card){
        if(card.value === "A") {
            if(pTotal < 21){
                card.scorec = 11;
            } else {
                card.score = 1;
            }
        }

    })
    pTotal += cards[randomNum].score;
    playerScore.innerHTML = pTotal;
    if(pTotal > 21) {
        message.innerText = "You busted";
        displayMoney.innerText = "";
        playerMoney.innerText = money;
        hit.disabled = true;
        stand.disabled = true;
    } else if(pTotal === 21) {
        message.innerText = "You Won";
        displayMoney.innerText = "";
        money = money + (bettedAmount * 2);
        playerMoney.innerText = money;
        hit.disabled = true;
    }
    console.log(playerHand);
}

// stand button clicked 
function standButton(){
    while(dTotal < 18) {
    let randomNum = Math.floor(Math.random() * cards.length);
    dealerHand.push(cards[randomNum]);
    let newCard = document.createElement("img");
    newCard.setAttribute("src", cards[randomNum].imagePath);
    dealerCards.appendChild(newCard);
    dealerHand.forEach(function(card){
        if(card.value === "A") {
            if(dTotal <= 21){
                card.scorec = 11;
            } else {
                card.score = 1;
            }
        }

    })
    dTotal += cards[randomNum].score;
    dealerScore.innerHTML = dTotal;
    }
    if(dTotal > 21) {
        message.innerText = "Dealer busted";
        displayMoney.innerText = "";

    } else if(pTotal > dTotal && pTotal <= 21){
        message.innerText = "You Won";
        displayMoney.innerText = "";
        money -= bettedAmount;
        playerMoney.innerText = money;
    } else {
        message.innerText = "Dealer Won";
        displayMoney.innerText = "";
    }
}
