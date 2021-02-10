const gameContainer = document.getElementById("game");
const startBtn = document.querySelector('#start');
const restartBtn = document.querySelector('#restart');
const clickMessage = document.querySelector('h3');
const clickedDivs = document.getElementsByClassName('noClick');
const bestScore = document.querySelector('span');
const tilesInput = document.querySelector('input');
const submitTiles = document.querySelector('#submit');
let clickCount = 0;
restartBtn.classList.add('hide')
gameContainer.classList.add('hide');
bestScore.innerText = `Best Score: ${localStorage.lowScore}`;

let COLORS = [];

let eventArray = [];

function pickColors() {
  for (let i = 0; i < Math.floor(tilesInput.value / 2); i++) {
    let rand1 = Math.floor(Math.random() * 255);
    let rand2 = Math.floor(Math.random() * 255);
    let rand3 = Math.floor(Math.random() * 255);
    COLORS.push(`rgb(${rand1},${rand2},${rand3})`);
    COLORS.push(`rgb(${rand1},${rand2},${rand3})`);
  }
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {

    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

function updateClickMessage() {
  clickCount++;
  clickMessage.innerText = `Click count: ${clickCount}`
}



function handleCardClick(event) {
  event.target.style.backgroundColor = event.target.className;
  eventArray.push(event.target);
  updateClickMessage();

  if (eventArray.length === 1) {
  } else if (eventArray.length === 2) {
    event.target.parentElement.classList.add('noClick');
    if (eventArray[0] == eventArray[1]) {
      clearBackground(eventArray);
      clearArray(eventArray);
    }
    if (eventArray[0].className == eventArray[1].className) {
      eventArray[0].classList.add('noClick');
      eventArray[1].classList.add('noClick');
      if (clickedDivs.length >= gameContainer.childElementCount) {
        restartBtn.classList.remove('hide');
        clickMessage.innerText = `Well done! It took you ${clickCount} clicks!`;

        if (!localStorage.lowScore) {
          localStorage.setItem('lowScore', clickCount);
        } else if (parseInt(localStorage.getItem('lowScore')) >= clickCount) {
          localStorage.setItem('lowScore', clickCount);
        }
        bestScore.innerText = `Best Score: ${localStorage.lowScore}`;
      }

      clearArray(eventArray);
    } else {
      clearBackground(eventArray);
      clearArray(eventArray);
    }
    setTimeout(function () {
      event.target.parentElement.classList.remove('noClick');
    }, 1000);
  }

}


function clearBackground(arr) {
  arr.forEach(function (ev) {
    setTimeout(function () {
      ev.style.backgroundColor = '';
    }, 1000)
  })
}


function clearArray(arr) {
  for (let i = 0; i <= arr.length; i++) {
    arr.pop();
  }
}

function restart() {

  for (let i = 0; i < gameContainer.childElementCount; i++) {
    gameContainer.children[i].style.backgroundColor = '';
    gameContainer.children[i].classList.remove('noClick');
  }
  clickCount = 0;
  clickMessage.innerText = `Click count: ${clickCount}`;

}


submitTiles.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(COLORS);
  pickColors();
  shuffledColors = shuffle(COLORS);
  console.log(COLORS);
  createDivsForColors(shuffledColors);
  gameContainer.classList.remove('hide');
  submitTiles.classList.add('hide');
})

restartBtn.addEventListener('click', restart);




// when the DOM loads

