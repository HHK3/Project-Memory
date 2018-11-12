//Kaart array houdt alle kaarten
let kaart = document.getElementsByClassName("kaart");
let cards = [...kaart]
console.log(cards);

//Deck van alle kaarten in het spel
const deck = document.getElementById("kaart-deck");

//Bewegingsvariabele aangeven
let stappen = 0;
let counter = document.querySelector(".stappen");

//Achtergrondmuziek Volume Button
var AchtergrondMuziek = document.getElementById('achtergrond');

// Sterrenicons aangeven
const sterren = document.querySelectorAll(".fa-star");

// DezelfdeKaarten aangeven
let dezelfdeKaarten = document.getElementsByClassName("match");

 // sterren list
 let sterrenLijst = document.querySelectorAll(".sterren li");



 // Modaal aangeven
 let modaal = document.getElementById("popup1")

 // Array voor geopende Kaarten
var geopendeKaarten = [];

//Schudden van kaarten
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

// Schudt kaarten wanneer spel opnieuw start bij paginaverversing
document.body.onload = startGame();

// Function om een nieuw spel te staren
function startGame(){
    // Schudt kaarten
    cards = shuffle(cards);
    // Haalt alle klasses weg voor elke kaart
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // resets stappen
    stappen = 0;
    counter.innerHTML = stappen;
    // resets beoordeling
    for (var i= 0; i < sterren.length; i++){
        sterren[i].style.color = "#FFD700";
        sterren[i].style.visibility = "visible";
    }
    //resets timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 min. 0 sec.";
    clearInterval(interval);
}


// Schakelt open en toont de klasse om kaarten weer te geven
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// Voeg geopende kaarten toe aan geopendeKaarten-lijst en controleer of kaarten overeenkomen of niet
function cardOpen() {
    geopendeKaarten.push(this);
    var muziek5 = new Audio("media/flip.wav");
    muziek5.play();
    var len = geopendeKaarten.length;
    if(len === 2){
        moveCounter();
        if(geopendeKaarten[0].dataset.value === geopendeKaarten[1].dataset.value){

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


// Wanneer kaarten overeenkomen
function matched(){

    geopendeKaarten[0].classList.add("match", "disabled");
    geopendeKaarten[1].classList.add("match", "disabled");
    geopendeKaarten[0].classList.remove("show", "open", "no-event");
    geopendeKaarten[1].classList.remove("show", "open", "no-event");
    geopendeKaarten = [];
}


// Wanneer kaarten niet overeenkomen
function unmatched(){
    geopendeKaarten[0].classList.add("unmatched");
    geopendeKaarten[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        geopendeKaarten[0].classList.remove("show", "open", "no-event","unmatched");
        geopendeKaarten[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        geopendeKaarten = [];
    },1100);
}


// Kaarten tijdelijk uitschakelen
function disable(){
    Array.prototype.filter.call(cards, function(kaart){
        kaart.classList.add('disabled');
    });
}


// Schakel kaarten in en schakel overeenkomende kaarten uit
function enable(){
    Array.prototype.filter.call(cards, function(kaart){
        kaart.classList.remove('disabled');
        for(var i = 0; i < dezelfdeKaarten.length; i++){
            dezelfdeKaarten[i].classList.add("disabled");
        }

  });}

// Tellen van de speler's stappen
function moveCounter(){
    stappen++;
    counter.innerHTML = stappen;
    //Start timer bij eerste klik
    if(stappen == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // Het beoordeling bij het aantal stappen
    if (stappen > 20 && stappen < 29){
        for( i= 0; i < 3; i++){
            if(i > 1){
                sterren[i].style.visibility = "collapse";
            }
        }
    }
    else if (stappen > 30){
        for( i= 0; i < 3; i++){
            if(i > 0){
                sterren[i].style.visibility = "collapse";
            }
        }
    }
}


// Game Timer
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


// Felicitatie modaal met totaal gezette stappen, timer en beoordeling
function congratulations(){
    if (dezelfdeKaarten.length == 16){
        clearInterval(interval);
        totaleTijd = timer.innerHTML;

        // Laat felicitatiem modaal zien
        modaal.classList.add("show");
        var muziek = new Audio();
        muziek.src = "media/victory.mp3";
        muziek.play();
        // Aangeven van de beoordeling
        var starRating = document.querySelector(".sterren").innerHTML;

        //Laat stappen, timer en beoordeling zien op modaal
        document.getElementById("laatsteStap").innerHTML = stappen;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totaleTijd").innerHTML = totaleTijd;


    };}





// Als speler opnieuw wilt gaan spelen
function opnieuwSpelen(){
    modaal.classList.remove("show");
    startGame();
    muziek2 = new Audio("media/opnieuw.wav");
    muziek2.play();
}


// Loop om Event Listeners toe te voegen bij elke kaart
for (var i = 0; i < cards.length; i++){
    kaart = cards[i];
    kaart.addEventListener("click", displayCard);
    kaart.addEventListener("click", cardOpen);
    kaart.addEventListener("click",congratulations);
};
