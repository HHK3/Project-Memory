// cards array holds all cards
let kaart = document.getElementsByClassName("kaart");
let cards = [...kaart]
console.log(cards);

// deck of all cards in game
const deck = document.getElementById("kaart-deck");

// declaring move variable
let stappen = 0;
let counter = document.querySelector(".stappen");

//Achtergrondmuziek volume button
var AchtergrondMuziek = document.getElementById('achtergrond');
AchtergrondMuziek.volume = 0.7;
// declare variables for star icons
const sterren = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // sterren list
 let sterrenLijst = document.querySelectorAll(".sterren li");

 // close icon in modaal
 let closeicon = document.querySelector(".sluit");

 // declare modaal
 let modaal = document.getElementById("popup1")

 // array for opened cards
var openedCards = [];

// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

//AchtergrondMuziek uitzetten en aanzetten
document.getElementById('mute').addEventListener('click', function (e){
  e=e || window.event;
  AchtergrondMuziek.muted = !AchtergrondMuziek.muted;
  e.preventDefault();
}, false);

//Veranderen volume knop
// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();


// @description function to start a new play
function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each kaart
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset stappen
    stappen = 0;
    counter.innerHTML = stappen;
    // reset rating
    for (var i= 0; i < sterren.length; i++){
        sterren[i].style.color = "#FFD700";
        sterren[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 min. 0 sec.";
    clearInterval(interval);
}


// @description toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var muziek5 = new Audio("media/flip.wav");
    muziek5.play();
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].dataset.value === openedCards[1].dataset.value){

          var muziek1 = new Audio("media/goed.wav");
          muziek1.play();

            matched();
        } else {

          var muziek4 = new Audio("media/fout.wav");
          muziek4.play();
            unmatched();
        }
    }
};


// @description when cards match
function matched(){

    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// description when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(kaart){
        kaart.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(kaart){
        kaart.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }

  });
}


// @description count player's stappen
function moveCounter(){
    stappen++;
    counter.innerHTML = stappen;
    //start timer on first click
    if(stappen == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on stappen
    if (stappen > 15 && stappen < 21){
        for( i= 0; i < 3; i++){
            if(i > 1){
                sterren[i].style.visibility = "collapse";
            }
        }
    }
    else if (stappen > 22){
        for( i= 0; i < 3; i++){
            if(i > 0){
                sterren[i].style.visibility = "collapse";
            }
        }
    }
}


// @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" min. "+second+" sec.";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// @description congratulations when all cards match, show modaal and stappen, time and rating
function congratulations(){
    if (matchedCard.length == 12){
        clearInterval(interval);
        totaleTijd = timer.innerHTML;

        // show congratulations modaal
        modaal.classList.add("show");
        var muziek = new Audio();
        muziek.src = "media/victory.mp3";
        muziek.play();
        // declare star rating variable
        var starRating = document.querySelector(".sterren").innerHTML;

        //showing move, rating, time on modaal
        document.getElementById("laatsteStap").innerHTML = stappen;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totaleTijd").innerHTML = totaleTijd;


    };}


// @desciption for user to play Again
function opnieuwSpelen(){
    muziek2 = new Audio("media/opnieuw.wav");
    muziek2.play();
    modaal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each kaart
for (var i = 0; i < cards.length; i++){
    kaart = cards[i];
    kaart.addEventListener("click", displayCard);
    kaart.addEventListener("click", cardOpen);
    kaart.addEventListener("click",congratulations);
};
