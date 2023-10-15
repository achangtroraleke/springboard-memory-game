const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


let clickCounter = 0
let startBtn = document.querySelector('#start-btn')
let resetBtn = document.querySelector('#reset-btn')
let score = document.querySelector('#score')
var scoreBoard


if(localStorage.getItem('score')){
  scoreBoard = JSON.parse(localStorage.getItem('score'))
}else{
  localStorage.setItem('score', JSON.stringify([]))
}


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  
  
  if(clickCounter<2){
  console.log("you just clicked", event.target);
  event.target.classList.add('active')
  let activeCard = document.querySelectorAll('.active')
  clickCounter += 1
  

  for(let i = 0; i< activeCard.length; i++){
    activeCard[i].style.pointerEvents = 'none'
    activeCard[i].style.backgroundColor = activeCard[i].classList[0]
    if(activeCard.length ===2){
      if(activeCard[0].classList[0] === activeCard[1].classList[0]){
        
        activeCard[0].classList.replace('active','match');
        activeCard[1].classList.replace('active','match');
        clickCounter=0
        score.textContent = parseFloat(score.textContent) + .5
        
      }else{
        setTimeout(function(){
          activeCard[i].style.backgroundColor = 'white'
          activeCard[i].classList.remove('active')
          clickCounter = 0
          console.log(activeCard[i])
          activeCard[i].style.pointerEvents = 'auto'
        },1000)
      }
    }
  }
  let matchedCard = document.querySelectorAll('.match')
  for(let i = 0; i< matchedCard.length; i++){
      matchedCard[i].style.backgroundColor = matchedCard[i].classList[0]
    }
  }
}

startBtn.addEventListener('click', function(){
  
  let timer = document.querySelector('#timer')
  let start = parseInt(timer.textContent);
  startBtn.remove()
  createDivsForColors(shuffledColors);
    var myInterval = setInterval(function(){
      if(start >0){
      start -=1 
      console.log(start)
      timer.textContent = start
    }else{
      
      let gameOverMsg = document.createElement('h1');
      gameOverMsg.innerHTML = `Game Over, You scored ${score.textContent}.`
      gameContainer.prepend(gameOverMsg)
      if(parseInt(score.textContent)>scoreBoard[-1]){
        scoreBoard.pop();
        scoreBoard.push(parseInt(score.textContent));
        localStorage.setItem('score', JSON.stringify(scoreBoard));
      }
      
      clearInterval(myInterval)
    }
    
  },1000)
  

  
})

resetBtn.addEventListener('click', function(){
  window.location.reload()
})



// when the DOM loads


