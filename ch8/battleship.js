let view = {
  displayMessage: function(msg) {
    let messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },
  displayMiss: function(location) {
    let position = document.getElementById(location);
    position.setAttribute('class', 'miss');
  },
  displayHit: function(location) {
    let position = document.getElementById(location);
    position.setAttribute('class','hit');
  },
}

let model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [{ locations: ['10', '20', '30'], hits: ['', '', ''] },
          { locations: ['32', '33', '34'], hits: ['', '', ''] },
          { locations: ['63', '64', '65'], hits: ['', '', 'hit'] }],
  fire: function(guess) {
    for (let i = 0; i < this.numShips; i += 1) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('HIT!');
        if (this.isSunk(ship)) {
          view.displayMessage('You sank my battleship!');
          this.shipsSunk += 1;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage('You missed!');
    return false;
  },
  isSunk: function(ship) {
    for (let i = 0; i < this.shipLength; i += 1) {
     if (ship.hits[i] !== 'hit') {
      return false;
     } 
     return true;
    }
  },
}

let controller = {
  guesses: 0,
  processGuess: function (guess) {
    let location = this.parseGuess(guess);

    if (location) {
      this.guesses += 1;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(`You sank all my battleships, in ${this.guesses} guesses.`);
      }
    }
  },
  parseGuess: function (guess) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    if (guess === null || guess.length !== 2) {
      alert('Please enter a letter and a number on the board.');
    } else {
      let firstChar = guess[0];
      let row = letters.indexOf(firstChar);
      let column = guess[1];

      if (isNaN(row) || isNaN(column)) {
        alert('That coordinate is not on the board.');
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert('That coordinate is off the board.');
      } else {
        return row + column;
      }
    }
    return null;

  },

}


function init() {
  let fireButton = document.getElementById('fireButton');
  fireButton.onclick = handleFireButton;

  let guessInput = document.getElementById('guessInput');
  guessInput.onkeypress = handleKeyPress;
}

function handleFireButton() {
  let guessInput = document.getElementById('guessInput');
  let guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}

function handleKeyPress(e) {
  let fireButton = document.getElementById('fireButton');
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;
